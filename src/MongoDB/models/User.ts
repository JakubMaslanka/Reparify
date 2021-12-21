import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/user';
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
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

UserSchema.methods.comparePassword = async function (passwordToCompare: string): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, this.password);
};

const User = model<IUser>('users', UserSchema);

export default User;