import Query from "./Query";
import Mutation from "./Mutation";
import User from "../../MongoDB/models/User";
import { IUser } from "../../interfaces/user";
import { GraphQLUpload } from "graphql-upload";
import { IWorkshop, IComment } from "../../interfaces/workshop";
import { IVehicle } from "../../interfaces/vehicle";

export function requireAuthorizedUser(currentUser: IUser | null) {
  if (!currentUser) {
      throw new Error("Unauthorized access. Please log in.")
  }
};

const resolvers = {
  Query,
  Mutation,
  Upload: GraphQLUpload,
  Vehicle: {
    owner: async (vehicle: IVehicle) => {
      try {
          return await User.findById(vehicle.owner);
      } catch (e: unknown) {
          throw new Error(e as string);
      }
    }
  },
  Workshop: {
    reviewScore: (workshop: IWorkshop) => {
      const { comments } = workshop;
      if (comments.length <= 0) return 0;
      const rating = comments.reduce((previousValue, { rating }) => previousValue + (+rating), 0) / comments.length;
      if (rating > 5) return 5;
      return Math.floor(rating);
    }
  },
  Comment: {
    author: async (comment: IComment) => {
      try {
          return await User.findById(comment.author);
      } catch (e: unknown) {
          throw new Error(e as string);
      }
    }
  }
};

export default resolvers;