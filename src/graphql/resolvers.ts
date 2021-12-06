import Vehicle from "../MongoDB/models/Vehicle"

export const resolvers = {
    Query: {
        vehicles: async () => {
            try {
                return await Vehicle.find({});
            } catch (err: string | any) {
                throw new Error(err)
            }
        }
    }
}