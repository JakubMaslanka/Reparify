import { Types } from "mongoose";
import { IRepair, IUpdateRepairInput } from "../interfaces/repair";
import Vehicle from "../MongoDB/models/Vehicle";

const dataAccess = {
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

export default dataAccess;