import Query from "./Query";
import Mutation from "./Mutation";
import User from "../../MongoDB/models/User";
import { IUser } from "../../interfaces/user";

export function requireAuthorizedUser(currentUser: IUser | null) {
  if (!currentUser) {
      throw new Error("Unauthorized access. Please log in.")
  }
};

const resolvers = {
  Query,
  Mutation,
  Vehicle: {
    owner: async (vehicle: any, _arg: any, _context: any) => {
      try {
          return await User.findById(vehicle.owner);
      } catch (e: unknown) {
          throw new Error(e as string);
      }
    }
  },
};

export default resolvers;