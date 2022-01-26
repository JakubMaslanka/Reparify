"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workshopSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    address1: String,
    address2: String,
    openingHours: String,
    openingDays: String,
    email: String,
    photo: String,
    phoneNumber: Number,
    createdAt: {
        type: String,
        inmutable: true,
        default: () => new Date(Date.now()).toDateString(),
        required: true
    },
    comments: [
        {
            _id: {
                type: String,
                inmutable: true,
                required: true
            },
            author: {
                type: String,
                inmutable: true,
                required: true
            },
            createdAt: {
                type: String,
                inmutable: true,
                default: () => new Date(Date.now()).getTime(),
                required: true
            },
            content: {
                type: String
            },
            rating: {
                type: Number,
                min: 0,
                max: 5
            }
        }
    ]
});
const Workshop = (0, mongoose_1.model)('workshops', workshopSchema);
exports.default = Workshop;
