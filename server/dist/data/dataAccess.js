"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("stream/promises");
const mongoose_1 = require("mongoose");
const auth_1 = require("./auth");
const helpers_1 = require("./helpers");
const Vehicle_1 = __importDefault(require("../MongoDB/models/Vehicle"));
const User_1 = __importDefault(require("../MongoDB/models/User"));
const AuthActions = {
    signUpUser: async function ({ input }, context) {
        const { email, password, firstName, lastName } = input;
        const isUserExist = await User_1.default.findOne({ email }).exec();
        if (!!isUserExist) {
            throw new Error("User with this email already exist!");
        }
        if (password && password.length < 6) {
            throw new Error("The password is too weak!");
        }
        const newUser = new User_1.default({
            email,
            password: (0, auth_1.hashPassword)(password),
            firstName,
            lastName,
            provider: null,
            isAdmin: false,
            isWorkshop: false,
            createdAt: new Date().toDateString(),
            avatar: (0, helpers_1.generateAvater)(firstName, lastName)
        });
        newUser.save((err) => {
            if (err)
                throw new Error(err);
        });
        await context.login(newUser);
        return newUser;
    },
    logInUser: async function (email, password, context) {
        const { user } = await context.authenticate("graphql-local", {
            email,
            password
        });
        await context.login(user);
        return user;
    }
};
const VehicleCURD = {
    createVehicle: async function (input, ownerId) {
        const { mark, model, vin, techReviewExpDate, insuranceExpDate, fuelType, mileage, power, productionYear, bodyType, transmission, photos } = input;
        const newVehicle = new Vehicle_1.default({
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
        await newVehicle.save((err) => {
            if (err)
                throw Error("Something went wrong with db connection. Please try again later.");
        });
        return newVehicle;
    },
    updateVehicle: async function (id, input, ownerId) {
        const vehicle = await Vehicle_1.default.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.");
        }
        const newVehicle = { vehicle, ...input };
        const updateResponse = await vehicle.updateOne(newVehicle, { upsert: true, new: true });
        if (updateResponse.modifiedCount === 0) {
            throw Error("Update failed. No value change.");
        }
        return await Vehicle_1.default.findOne({ _id: id }).exec();
    },
    deleteVehicle: async function (id, ownerId) {
        const vehicle = await Vehicle_1.default.deleteOne({ _id: id, owner: ownerId });
        if (vehicle.deletedCount === 0) {
            throw Error("We couldn't delete your vehicle. Please try again later.");
        }
    }
};
const RepairEntryCURD = {
    createRepairEntry: async function (vehicleId, userId, newRepairPayload) {
        const vehicle = await Vehicle_1.default.findOne({ _id: vehicleId, owner: userId }).exec();
        if (!vehicle) {
            throw new Error("The vehicle wasn't found in the database. Please try again later.");
        }
        else if (vehicle.repairList.length > 0 &&
            vehicle.repairList[vehicle.repairList.length - 1].mileage >= newRepairPayload.mileage) {
            throw new Error("The mileage of the vehicle is lower than the at last entry. Correct it!");
        }
        ;
        vehicle.mileage = newRepairPayload.mileage;
        vehicle.repairList.push({
            ...newRepairPayload,
            _id: new mongoose_1.Types.ObjectId().toString()
        });
        await vehicle.save();
        return vehicle;
    },
    updateRepairEntry: async function (vehicleId, userId, repairPayload, repairEntryId) {
        const vehicle = await Vehicle_1.default.findOne({ _id: vehicleId, owner: userId }).exec();
        if (!vehicle) {
            throw new Error("The vehicle wasn't found in the database. Please try again later.");
        }
        const repairEntryIdx = vehicle.repairList.findIndex((entry) => entry._id === repairEntryId);
        if (repairEntryIdx < 0) {
            throw Error(`Couldn't find entry by id ${repairEntryId}`);
        }
        const existRepairEntry = vehicle.repairList[repairEntryIdx];
        delete repairPayload.mileage;
        delete repairPayload.workshop;
        const newRepairEntry = {
            updatedAt: new Date(Date.now()).toDateString(),
            ...repairPayload
        };
        vehicle.repairList[repairEntryIdx] = Object.assign(existRepairEntry, newRepairEntry);
        await vehicle.save();
        return vehicle;
    },
    deleteRepairEntry: async function (vehicleId, userId, repairEntryId) {
        const vehicle = await Vehicle_1.default.findOne({ _id: vehicleId, owner: userId }).exec();
        if (!vehicle) {
            throw new Error("The vehicle wasn't found in the database. Please try again later.");
        }
        const repairEntryIdx = vehicle.repairList.findIndex((entry) => entry._id === repairEntryId);
        if (repairEntryIdx < 0) {
            throw Error(`Couldn't find entry by id ${repairEntryId}`);
        }
        vehicle.repairList = vehicle.repairList.filter((entry) => entry._id !== repairEntryId);
        await vehicle.save();
        return vehicle;
    }
};
const OtherActions = {
    archiveVehicle: async function (id, ownerId) {
        const vehicle = await Vehicle_1.default.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.");
        }
        else if (vehicle.isMarkedForSale) {
            throw Error("You can't archive a vehicle that is marked for sale. You have to first give up the sale to complete the action.");
        }
        vehicle.isArchived = !vehicle.isArchived;
        await vehicle.save();
        return vehicle;
    },
    markVehicleForSale: async function (id, price, ownerId) {
        const vehicle = await Vehicle_1.default.findOne({ _id: id, owner: ownerId }).exec();
        if (!vehicle) {
            throw Error("The vehicle wasn't found in the database. Please try again later.");
        }
        else if (vehicle.isArchived) {
            throw Error("You can't bring up for sale a vehicle that is archived. To complete this action, you have to first unarchive the vehicle and update its details.");
        }
        else if (typeof price === 'string' || price < 0) {
            throw Error("Invalid price provided. Please correct it.");
        }
        vehicle.price = !vehicle.price ? price : undefined;
        vehicle.isMarkedForSale = !vehicle.isMarkedForSale;
        await vehicle.save();
        return vehicle;
    },
    uploadImages: async function (id, file) {
        if (file.length > 5) {
            throw Error("The maximum number of photos you can upload is 5.");
        }
        if (!id) {
            throw Error("Incorrect id.");
        }
        const directoryPath = path_1.default.join(__dirname, `../../${process.env.NODE_ENV !== "production" ? 'src' : 'dist'}/public/${id}`);
        if (!fs_1.default.existsSync(directoryPath)) {
            fs_1.default.mkdirSync(directoryPath, { recursive: true });
        }
        let urls = [];
        for (let i = 0; i < file.length; i++) {
            const { createReadStream, filename } = await file[i];
            const { ext } = path_1.default.parse(filename);
            const generateFilename = Date.now().toString() + (0, helpers_1.generateRandomString)() + ext;
            const stream = createReadStream();
            const filePath = path_1.default.join(directoryPath, `/${generateFilename}`);
            const out = fs_1.default.createWriteStream(filePath);
            stream.pipe(out);
            await (0, promises_1.finished)(out);
            const generateUrl = `http://localhost:4000/vehicle_pictures/${id}/${generateFilename}`;
            urls.push({ url: generateUrl });
        }
        return urls;
    }
};
const dataAccess = {
    ...AuthActions,
    ...VehicleCURD,
    ...RepairEntryCURD,
    ...OtherActions
};
exports.default = dataAccess;
