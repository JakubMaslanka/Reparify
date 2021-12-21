import bcrypt from "bcrypt";
import passport from "passport";
import * as Facebook from 'passport-facebook';
import * as Google from 'passport-google-oauth20';
import { GraphQLLocalStrategy } from "graphql-passport";

import User from "../MongoDB/models/User";
import { IUser } from "../MongoDB/interfaces/user";
import { NativeError } from "mongoose";
import { processEnvValues } from "../MongoDB/interfaces/root";

export const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(password, salt);
}

function initializeAuth({GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET}: processEnvValues) {
    if (!GOOGLE_CLIENT_ID || 
        !GOOGLE_CLIENT_SECRET || 
        !FACEBOOK_APP_ID || 
        !FACEBOOK_APP_SECRET
    ) {
        throw new Error("Something gone with env values")
    }

    const facebookCallback = async (_accessToken: unknown, _refreshToken: unknown, profile: any, done: any) => {
        await User.findOne({ facebookId: profile.id }, (err: NativeError, user: IUser) => {
            if (err) done(err);
            if (!user) {
                user = new User({
                    facebookId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    provider: 'facebook',
                    createdAt: new Date().toISOString(),
                    isAdmin: false,
                    isWorkshop: false,
                })
                user.save((err: unknown) => {
                    if (err) throw new Error(err as string);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        }).clone().catch((err) => console.log(err));
    };
    
    const googleCallback = async (_request: unknown, _accessToken: unknown, _refreshToken: unknown, profile: any, done: any) => {
        await User.findOne({ googleId: profile.id }, (err: NativeError, user: IUser) => {
            if (err) done(err);
            if (!user) {
                user = new User({
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
                user.save((err: unknown) => {
                    if (err) throw new Error(err as string);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        }).clone().catch((err) => console.log(err));
    };
    
    passport.use(
        new GraphQLLocalStrategy(async (email: any, password: any, done) => {
            await User.findOne({email}, async (err: NativeError, user: IUser) => {
                if (user && !err) {
                    const isPasswordCorrect = await user.comparePassword(password);
                    if (!isPasswordCorrect) {
                        done(new Error("The password is incorrect"));
                        return;
                    } else {
                        done(null, user);
                    }
                } else {
                    done(new Error("We can't find a user matching this email"));
                    return;
                }
            }).clone().catch((err) => console.log(err));
        })
    );
    
    passport.use(
        new Google.Strategy({
            clientID: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/google/callback'
            },
            googleCallback
        )
    );

    passport.use(
        new Facebook.Strategy({
                clientID: FACEBOOK_APP_ID!,
                clientSecret: FACEBOOK_APP_SECRET!,
                callbackURL: 'http://localhost:4000/auth/facebook/callback',
                profileFields: ['id', 'email', 'first_name', 'last_name', 'picture'],
            },
            facebookCallback
        )
    );

    passport.serializeUser((user: any, done) => done(null, user._id.toString()));
    passport.deserializeUser(async (userId: any, done) => {
        await User.findById(userId, (err: NativeError, user: IUser) => {
            if (user && !err) {
                done(null, user);
            } else {
                done(new Error("User not found"));
            }
        }).clone().catch((err) => console.log(err));
    });
}

export default initializeAuth;