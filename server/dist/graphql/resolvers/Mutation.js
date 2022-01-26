"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const dataAccess_1 = __importDefault(require("../../data/dataAccess"));
const Mutation = {
    login: (_rootValue, { input: { email, password } }, context) => {
        try {
            return {
                success: true,
                message: "You've successfully logged in.",
                currentUser: dataAccess_1.default.logInUser(email, password, context)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    signup: (_rootValue, { input }, context) => {
        try {
            return {
                success: true,
                message: "You've successfully created an account.",
                currentUser: dataAccess_1.default.signUpUser({ input }, context)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    logout: (_rootValue, _arg, context) => context.logout(),
    addVehicle: (_rootValue, { input }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully created an vehicle.",
                vehicle: dataAccess_1.default.createVehicle(input, context.getUser().id)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    editVehicle: (_rootValue, { id, input }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully updated a vehicle.",
                vehicle: dataAccess_1.default.updateVehicle(id, input, context.getUser().id)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    removeVehicle: (_rootValue, { id }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            dataAccess_1.default.deleteVehicle(id, context.getUser().id);
            return {
                success: true,
                message: "You've successfully removed a vehicle.",
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    addRepair: (_rootValue, { id, input }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully created a repair entry.",
                vehicle: dataAccess_1.default.createRepairEntry(id, context.getUser().id, input)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    editRepair: (_rootValue, { id, input, repairId }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully updated a repair entry.",
                vehicle: dataAccess_1.default.updateRepairEntry(id, context.getUser().id, input, repairId)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    removeRepair: (_rootValue, { id, repairId }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully deleted a repair entry.",
                vehicle: dataAccess_1.default.deleteRepairEntry(id, context.getUser().id, repairId)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    archiveVehicle: (_rootValue, { id }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully (un-)archived the vehicle.",
                vehicle: dataAccess_1.default.archiveVehicle(id, context.getUser().id)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    markVehicleForSale: async (_rootValue, { id, price }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully (un-)marked your vehicle for sale.",
                vehicle: dataAccess_1.default.markVehicleForSale(id, price, context.getUser().id)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    },
    fileUpload: async (_parent, { file }, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return {
                success: true,
                message: "You've successfully uploaded an picture(-s).",
                uploadFileList: dataAccess_1.default.uploadImages(context.getUser().id, file)
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
};
exports.default = Mutation;
