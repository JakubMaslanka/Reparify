"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Vehicle_1 = __importDefault(require("../../MongoDB/models/Vehicle"));
const Workshop_1 = __importDefault(require("../../MongoDB/models/Workshop"));
const Query = {
    vehicles: async () => {
        try {
            return await Vehicle_1.default.find({});
        }
        catch (e) {
            throw new Error(e);
        }
    },
    vehicle: async (_rootValue, { id }, _context) => {
        try {
            return await Vehicle_1.default.findById(id);
        }
        catch (e) {
            throw new Error(e);
        }
    },
    workshops: async () => {
        try {
            return await Workshop_1.default.find({});
        }
        catch (e) {
            throw new Error(e);
        }
    },
    workshop: async (_rootValue, { id }, _context) => {
        try {
            return await Workshop_1.default.findById(id);
        }
        catch (e) {
            throw new Error(e);
        }
    },
    currentUserVehicles: async (_rootValue, _arg, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            const { _id } = context.getUser();
            return await Vehicle_1.default.find({ owner: _id.toString() });
        }
        catch (e) {
            throw new Error(e);
        }
    },
    vehicleForSale: async (_rootValue, _arg, context) => {
        try {
            (0, _1.requireAuthorizedUser)(context.getUser());
            return await Vehicle_1.default.find({ isMarkedForSale: true });
        }
        catch (e) {
            throw new Error(e);
        }
    },
    currentUser: (_rootValue, _arg, context) => context.getUser()
};
exports.default = Query;
