import { hashPassword } from "../../data/auth";
import { generateAvater } from "../../data/helpers";
import { ILoginCredentials, ISignupCredentials } from "../../interfaces/credentials";

import User from "../../MongoDB/models/User"

const Mutation = {
    login: async (_rootValue: unknown, { input: { email, password } }: ILoginCredentials, context: any) => {
        try {
            const { user } = await context.authenticate("graphql-local", {
                email,
                password
            });
            await context.login(user);
            return {
              success: true,
              message: "You've successfully logged in.",
              currentUser: user
            }
          } catch (error) {
            return {
              success: false,
              message: (error as Error).message,
            }
          }
    },
    signup: async (_rootValue: unknown, { input: { email, password, firstName, lastName } }: ISignupCredentials, context: any) => {
        try {
            const isUserExist = await User.findOne({email}).exec();
            if (!!isUserExist) {
                throw new Error("User with this email already exist!")
            }
            if (password && password.length < 8) {
              throw new Error("The password is too weak!")
            }
            const newUser = new User({
                email,
                password: hashPassword(password),
                firstName,
                lastName,
                provider: null,
                isAdmin: false,
                isWorkshop: false,
                createdAt: new Date().toISOString(),
                avatar: generateAvater(firstName, lastName)
            });
            newUser.save((err: unknown) => {
                if (err) throw new Error(err as string);
            })
            await context.login(newUser);
            return {
              success: true,
              message: "You've successfully created an account.",
              currentUser: newUser
            }
          } catch (error) {
            return {
              success: false,
              message: (error as Error).message,
            }
          }
    },
    logout: (_rootValue: unknown, _arg: unknown, context: any) => context.logout(),
};

export default Mutation;