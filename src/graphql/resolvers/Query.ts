import Vehicle from "../../MongoDB/models/Vehicle"

const Query = {
    vehicles: async () => {
        try {
            return await Vehicle.find({});
        } catch (e: unknown) {
            throw new Error(e as string);
        }
    },
    currentUser: (_rootValue: unknown, _arg: unknown, context: any) => context.getUser()
};

export default Query;