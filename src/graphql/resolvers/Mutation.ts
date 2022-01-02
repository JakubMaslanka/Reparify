import { requireAuthorizedUser } from ".";
import { hashPassword } from "../../data/auth";
import { generateAvater } from "../../data/helpers";
import { ILoginCredentials, ISignupCredentials } from "../../interfaces/credentials";
import { IRepair, IUpdateRepairInput } from "../../interfaces/repair";

import User from "../../MongoDB/models/User"
import dataAccess from "../../data/dataAccess";

const Mutation = {
  login: async (_rootValue: unknown, { input: { email, password } }: ILoginCredentials, context: any) => {
    try {
      const { user } = await context.authenticate("graphql-local", {
          email,
          password
      });
        await context.login(user);
      return {
        success: true,
        message: "You've successfully logged in.",
        currentUser: user
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  signup: async (_rootValue: unknown, { input: { email, password, firstName, lastName } }: ISignupCredentials, context: any) => {
    try {
      const isUserExist = await User.findOne({email}).exec();
        if (!!isUserExist) {
            throw new Error("User with this email already exist!")
        }
        if (password && password.length < 8) {
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
      return {
        success: true,
        message: "You've successfully created an account.",
        currentUser: newUser
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  logout: (
    _rootValue: unknown, 
    _arg: unknown, 
    context: any
  ) => context.logout(),
  addRepair: (
    _rootValue: unknown, 
    { id, input }: { id: string, input: IRepair }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully created a repair entry.",
        vehicle: dataAccess.createRepairEntry(id, context.getUser().id, input)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  editRepair: (
    _rootValue: unknown, 
    { id, input, repairId }: { id: string, input: IUpdateRepairInput, repairId: string }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully updated a repair entry.",
        vehicle: dataAccess.updateRepairEntry(id, context.getUser().id, input, repairId)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  removeRepair: (
    _rootValue: unknown, 
    { id, repairId }: { id: string, repairId: string }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully deleted a repair entry.",
        vehicle: dataAccess.deleteRepairEntry(id, context.getUser().id, repairId)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  }
};

export default Mutation;