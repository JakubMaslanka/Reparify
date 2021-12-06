import { Schema, model } from 'mongoose';

interface User {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    createdAt: string,
    avatar: string
}

const userSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    createdAt: String,
    avatar: String
});

const User = model<User>('users', userSchema);

export default User;
