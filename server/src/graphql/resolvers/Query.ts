import { requireAuthorizedUser } from ".";
import { IUser } from "../../interfaces/user";
import Vehicle from "../../MongoDB/models/Vehicle"
import Workshop from "../../MongoDB/models/Workshop";

const Query = {
    vehicles: async () => {
        try {
            return await Vehicle.find({});
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    vehicle: async (_rootValue: unknown, {id}: {id: string}, _context: any) => {
        try {
            return await Vehicle.findById(id);
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    workshops: async () => {
        try {
            return await Workshop.find({});
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    workshop: async (_rootValue: unknown, {id}: {id: string}, _context: any) => {
        try {
            return await Workshop.findById(id);
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    currentUserVehicles: async (_rootValue: unknown, _arg: unknown, context: any) => {
        try {
            requireAuthorizedUser(context.getUser());
            const { _id }: IUser = context.getUser();
            return await Vehicle.find({ owner: _id.toString() });
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    vehicleForSale: async (_rootValue: unknown, _arg: unknown, context: any) => {
        try {
            requireAuthorizedUser(context.getUser());
            return await Vehicle.find({ isMarkedForSale: true });
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    currentUser: (_rootValue: unknown, _arg: unknown, context: any) => context.getUser()
};

export default Query;