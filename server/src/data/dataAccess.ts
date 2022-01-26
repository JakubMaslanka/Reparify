import path from "path";
import fs from "fs";
import { finished } from "stream/promises";
import { Types } from "mongoose";
import { hashPassword } from "./auth";
import { generateRandomString, generateAvater } from "./helpers";
import { IRepair, IUpdateRepairInput } from "../interfaces/repair";
import { IUpdateVehicleInput, IVehicle } from "../interfaces/vehicle";

import Vehicle from "../MongoDB/models/Vehicle";
import User from "../MongoDB/models/User";
import { ISignupCredentials } from "../interfaces/credentials";

const AuthActions = {
    signUpUser: async function({ input }: ISignupCredentials, context: any) {
        const { email, password, firstName, lastName } = input;
        const isUserExist = await User.findOne({email}).exec();
        if (!!isUserExist) {
            throw new Error("User with this email already exist!")
        }
        if (password && password.length < 6) {
            throw new Error("The password is too weak!")
        }
        const newUser = new User({
            email,
            password: hashPassword(password),
            firstName,
            lastName,
            provider: null,
            isAdmin: false,
            isWorkshop: false,
            createdAt: new Date().toDateString(),
            avatar: generateAvater(firstName, lastName)
        });
        newUser.save((err: unknown) => {
            if (err) throw new Error(err as string);
        })
        await context.login(newUser);

        return newUser;
    },
    logInUser: async function(email: string, password: string, context: any) {
        const { user } = await context.authenticate("graphql-local", {
            email,
            password
        });
        await context.login(user);

        return user;
    }
};

const VehicleCURD = {
    createVehicle: async function(input: IVehicle, ownerId: string) {
        const {
            mark,
            model,
            vin,
            techReviewExpDate,
            insuranceExpDate,
            fuelType,
            mileage,
            power,
            productionYear,
            bodyType,
            transmission,
            photos
        } = input;
        const newVehicle = new Vehicle({
            mark,
            model,
            vin,
            techReviewExpDate,
            insuranceExpDate,
            fuelType,
            mileage,
            power,
            productionYear,
            bodyType,
            transmission,
            owner: ownerId,
            repairList: [],
            photos,
            createdAt: new Date().toDateString()
        });
        await newVehicle.save((err: unknown) => {
            if (err) throw Error("Something went wrong with db connection. Please try again later.");
        })
        return newVehicle;
    },
    updateVehicle: async function(id: string, input: IUpdateVehicleInput, ownerId: string) {
        const vehicle = await Vehicle.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.")
        } 
        
        const newVehicle = {vehicle, ...input};
        const updateResponse = await vehicle.updateOne(newVehicle, { upsert: true, new: true });
        
        if (updateResponse.modifiedCount === 0) {
            throw Error("Update failed. No value change.")
        }

        return await Vehicle.findOne({ _id: id}).exec();
    },
    deleteVehicle: async function(id: string, ownerId: string) {
        const vehicle = await Vehicle.deleteOne({ _id: id, owner: ownerId });
        if (vehicle.deletedCount === 0) {
            throw Error("We couldn't delete your vehicle. Please try again later.")
        }
    }
};

const RepairEntryCURD = {
    createRepairEntry: async function(vehicleId: string, userId: string, newRepairPayload: IRepair) {
        const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: userId }).exec();
            if (!vehicle) {
                throw new Error("The vehicle wasn't found in the database. Please try again later.");
            } else if (
                vehicle.repairList.length > 0 && 
                vehicle.repairList[vehicle.repairList.length - 1].mileage >= newRepairPayload.mileage
            ) {
                throw new Error("The mileage of the vehicle is lower than the at last entry. Correct it!");
            };
            vehicle.mileage = newRepairPayload.mileage;
            vehicle.repairList.push({
                ...newRepairPayload,
                _id: new Types.ObjectId().toString()
            });
            await vehicle.save();
        return vehicle;
    },
    updateRepairEntry: async function(vehicleId: string, userId: string, repairPayload: IUpdateRepairInput, repairEntryId: string) {
        const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: userId }).exec();
            if (!vehicle) {
                throw new Error("The vehicle wasn't found in the database. Please try again later.")
            } 

            const repairEntryIdx: number = vehicle.repairList.findIndex((entry: IRepair) => entry._id === repairEntryId);
            if (repairEntryIdx < 0) {
                throw Error(`Couldn't find entry by id ${repairEntryId}`);
            }
            const existRepairEntry = vehicle.repairList[repairEntryIdx];
            
            delete repairPayload.mileage
            delete repairPayload.workshop
            const newRepairEntry = {
                updatedAt: new Date(Date.now()).toDateString(),
                ...repairPayload
            }

            vehicle.repairList[repairEntryIdx] = Object.assign(existRepairEntry, newRepairEntry);
            
            await vehicle.save()
        return vehicle;
    },
    deleteRepairEntry: async function(vehicleId: string, userId: string, repairEntryId: string) {
        const vehicle = await Vehicle.findOne({ _id: vehicleId, owner: userId }).exec();
            if (!vehicle) {
                throw new Error("The vehicle wasn't found in the database. Please try again later.");
            } 

            const repairEntryIdx = vehicle.repairList.findIndex((entry: IRepair) => entry._id === repairEntryId);
            if (repairEntryIdx < 0) {
                throw Error(`Couldn't find entry by id ${repairEntryId}`);
            }
            vehicle.repairList = vehicle.repairList.filter((entry: IRepair) => entry._id !== repairEntryId);
            
            await vehicle.save();
        return vehicle;
    }
};

const OtherActions = {
    archiveVehicle: async function(id: string, ownerId: string) {
        const vehicle = await Vehicle.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.")
        } else if (vehicle.isMarkedForSale) {
            throw Error("You can't archive a vehicle that is marked for sale. You have to first give up the sale to complete the action.")
        } 

        vehicle.isArchived = !vehicle.isArchived;
        await vehicle.save();
        
        return vehicle;
    },
    markVehicleForSale: async function(id: string, price: number, ownerId: string) {
        const vehicle = await Vehicle.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.")
        } else if (vehicle.isArchived) {
            throw Error("You can't bring up for sale a vehicle that is archived. To complete this action, you have to first unarchive the vehicle and update its details.")
        } else if (typeof price === 'string' || price < 0) {
            throw Error("Invalid price provided. Please correct it.")
        }
        
        vehicle.price = !vehicle.price ? price : undefined;
        vehicle.isMarkedForSale = !vehicle.isMarkedForSale;
        await vehicle.save();

        return vehicle;
    },
    uploadImages: async function(id: string, file: any) {
        if (file.length > 5) {
            throw Error("The maximum number of photos you can upload is 5.")
        }
        if (!id) {
            throw Error("Incorrect id.")
        }
        const directoryPath = path.join(__dirname, `../../${process.env.NODE_ENV !== "production" ? 'src' : 'dist'}/public/${id}`);

        if (!fs.existsSync(directoryPath)){
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        let urls = [];
        for (let i = 0; i < file.length; i++) {
            const { createReadStream, filename } = await file[i];
            
            const { ext } = path.parse(filename);
            const generateFilename = Date.now().toString() + generateRandomString() + ext;

            const stream = createReadStream();
            const filePath = path.join(directoryPath, `/${generateFilename}`);
            
            const out = fs.createWriteStream(filePath);
            stream.pipe(out);
            await finished(out);
            const generateUrl = `http://localhost:4000/vehicle_pictures/${id}/${generateFilename}`;
            urls.push({ url: generateUrl });
        }
        return urls;
    }
}

const dataAccess = {
    ...AuthActions,
    ...VehicleCURD,
    ...RepairEntryCURD,
    ...OtherActions
};

export default dataAccess;