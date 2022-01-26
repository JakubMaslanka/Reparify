import { StringValueNode } from 'graphql';
import mongoose from "mongoose";

export type IUser = mongoose.Document & {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    createdAt: string,
    avatar: StringValueNode,
    isAdmin: boolean,
    isWorkshop: boolean,
    facebookId?: string,
    googleId?: string,
    companyName?: string,
    provider?: string,
    comparePassword: (passwordToCompare: string) => Promise<boolean>
}