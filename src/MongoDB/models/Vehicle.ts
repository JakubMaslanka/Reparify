import { Schema, model } from 'mongoose';

interface Vehicle {
    mark: string,
    model: string,
    vin: string,
    productionYear: Number,
    photos: string[],
    fuelType: string,
    power: Number,
    transmission: string,
    bodyType: string,
    owner: string,
    createdAt: string,
    techReviewExpDate: string,
    insuranceExpDate: string,
    repairList: {
        date: string,
        workshop: string,
        description: string
    }[],
    user: {
        type: any,
        ref: string
    }
}

const vehicleSchema = new Schema<Vehicle>({
    mark: String,
    model: String,
    vin: String,
    techReviewExpDate: String,
    insuranceExpDate: String,
    productionYear: Number,
    fuelType: String,
    power: Number,
    transmission: String,
    bodyType: String,
    owner: String,
    createdAt: String,
    photos: [String],
    repairList: [
        {
            createdAt: String,
            workshop: String,
            description: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const Vehicle = model<Vehicle>('vehicles', vehicleSchema);

export default Vehicle;