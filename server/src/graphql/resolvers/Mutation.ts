import { requireAuthorizedUser } from ".";
import { ILoginCredentials, ISignupCredentials } from "../../interfaces/credentials";
import { IRepair, IUpdateRepairInput } from "../../interfaces/repair";
import { IUpdateVehicleInput, IVehicle } from "../../interfaces/vehicle";

import dataAccess from "../../data/dataAccess";

const Mutation = {
  login: (_rootValue: unknown, { input: { email, password } }: ILoginCredentials, context: any) => {
    try {
      return {
        success: true,
        message: "You've successfully logged in.",
        currentUser: dataAccess.logInUser(email, password, context)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  signup: (_rootValue: unknown, { input }: ISignupCredentials, context: any) => {
    try {
      return {
        success: true,
        message: "You've successfully created an account.",
        currentUser: dataAccess.signUpUser({ input }, context)
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
  addVehicle: (
    _rootValue: unknown, 
    { input }: { input: IVehicle }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully created an vehicle.",
        vehicle: dataAccess.createVehicle(input, context.getUser().id)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  editVehicle: (
    _rootValue: unknown, 
    { id, input }: { id: string, input: IUpdateVehicleInput }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully updated a vehicle.",
        vehicle: dataAccess.updateVehicle(id, input, context.getUser().id)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  removeVehicle: (
    _rootValue: unknown, 
    { id }: { id: string }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      dataAccess.deleteVehicle(id, context.getUser().id);
      return {
        success: true,
        message: "You've successfully removed a vehicle.",
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
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
  },
  archiveVehicle: (
    _rootValue: unknown, 
    { id }: { id: string }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully (un-)archived the vehicle.",
        vehicle: dataAccess.archiveVehicle(id, context.getUser().id)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  markVehicleForSale: async (
    _rootValue: unknown, 
    { id, price }: { id: string, price: number }, 
    context: any
  ) => {
    try {
      requireAuthorizedUser(context.getUser());      
      return {
        success: true,
        message: "You've successfully (un-)marked your vehicle for sale.",
        vehicle: dataAccess.markVehicleForSale(id, price, context.getUser().id)
      }
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      }
    }
  },
  fileUpload: async (_parent: any, { file }: { id: string, file: any }, context: any) => {
    try {
      requireAuthorizedUser(context.getUser());
      return {
        success: true,
        message: "You've successfully uploaded an picture(-s).",
        uploadFileList: dataAccess.uploadImages(context.getUser().id, file)
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