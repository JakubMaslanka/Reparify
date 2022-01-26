"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthorizedUser = void 0;
const Query_1 = __importDefault(require("./Query"));
const Mutation_1 = __importDefault(require("./Mutation"));
const User_1 = __importDefault(require("../../MongoDB/models/User"));
const graphql_upload_1 = require("graphql-upload");
function requireAuthorizedUser(currentUser) {
    if (!currentUser) {
        throw new Error("Unauthorized access. Please log in.");
    }
}
exports.requireAuthorizedUser = requireAuthorizedUser;
;
const resolvers = {
    Query: Query_1.default,
    Mutation: Mutation_1.default,
    Upload: graphql_upload_1.GraphQLUpload,
    Vehicle: {
        owner: async (vehicle) => {
            try {
                return await User_1.default.findById(vehicle.owner);
            }
            catch (e) {
                throw new Error(e);
            }
        }
    },
    Workshop: {
        reviewScore: (workshop) => {
            const { comments } = workshop;
            if (comments.length <= 0)
                return 0;
            const rating = comments.reduce((previousValue, { rating }) => previousValue + (+rating), 0) / comments.length;
            if (rating > 5)
                return 5;
            return Math.floor(rating);
        }
    },
    Comment: {
        author: async (comment) => {
            try {
                return await User_1.default.findById(comment.author);
            }
            catch (e) {
                throw new Error(e);
            }
        }
    }
};
exports.default = resolvers;
