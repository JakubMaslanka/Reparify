"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const Facebook = __importStar(require("passport-facebook"));
const Google = __importStar(require("passport-google-oauth20"));
const graphql_passport_1 = require("graphql-passport");
const User_1 = __importDefault(require("../MongoDB/models/User"));
const hashPassword = (password) => {
    const salt = bcrypt_1.default.genSaltSync(13);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
function initializeAuth({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET }) {
    if (!GOOGLE_CLIENT_ID ||
        !GOOGLE_CLIENT_SECRET ||
        !FACEBOOK_APP_ID ||
        !FACEBOOK_APP_SECRET) {
        throw new Error("Something gone with env values");
    }
    const facebookCallback = async (_accessToken, _refreshToken, profile, done) => {
        await User_1.default.findOne({ facebookId: profile.id }, (err, user) => {
            if (err)
                done(err);
            if (!user) {
                user = new User_1.default({
                    facebookId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    provider: 'facebook',
                    createdAt: new Date().toISOString(),
                    isAdmin: false,
                    isWorkshop: false,
                });
                user.save((err) => {
                    if (err)
                        throw new Error(err);
                    return done(err, user);
                });
            }
            else {
                return done(err, user);
            }
        }).clone().catch((err) => console.log(err));
    };
    const googleCallback = async (_request, _accessToken, _refreshToken, profile, done) => {
        await User_1.default.findOne({ googleId: profile.id }, (err, user) => {
            if (err)
                done(err);
            if (!user) {
                user = new User_1.default({
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName ? profile.name.familyName : "| Reparify.com",
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    provider: profile.provider,
                    createdAt: new Date().toISOString(),
                    isAdmin: false,
                    isWorkshop: false,
                });
                user.save((err) => {
                    if (err)
                        throw new Error(err);
                    return done(err, user);
                });
            }
            else {
                return done(err, user);
            }
        }).clone().catch((err) => console.log(err));
    };
    passport_1.default.use(new graphql_passport_1.GraphQLLocalStrategy(async (email, password, done) => {
        await User_1.default.findOne({ email }, async (err, user) => {
            if (user && !err) {
                const isPasswordCorrect = await user.comparePassword(password);
                if (!isPasswordCorrect) {
                    done(new Error("The password is incorrect"));
                    return;
                }
                else {
                    done(null, user);
                }
            }
            else {
                done(new Error("We can't find a user matching this email"));
                return;
            }
        }).clone().catch((err) => console.log(err));
    }));
    passport_1.default.use(new Google.Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback'
    }, googleCallback));
    passport_1.default.use(new Facebook.Strategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:4000/auth/facebook/callback',
        profileFields: ['id', 'email', 'first_name', 'last_name', 'picture'],
    }, facebookCallback));
    passport_1.default.serializeUser((user, done) => done(null, user._id.toString()));
    passport_1.default.deserializeUser(async (userId, done) => {
        await User_1.default.findById(userId, (err, user) => {
            if (user && !err) {
                done(null, user);
            }
            else {
                done(new Error("User not found"));
            }
        }).clone().catch((err) => console.log(err));
    });
}
exports.default = initializeAuth;
