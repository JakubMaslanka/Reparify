"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    companyName: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        required: false
    },
    facebookId: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    isAdmin: Boolean,
    isWorkshop: Boolean,
    password: String,
    email: String,
    createdAt: String,
    avatar: String
});
UserSchema.methods.comparePassword = async function (passwordToCompare) {
    return bcrypt_1.default.compare(passwordToCompare, this.password);
};
const User = (0, mongoose_1.model)('users', UserSchema);
exports.default = User;
