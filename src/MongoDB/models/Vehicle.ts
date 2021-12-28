import { Schema, model } from 'mongoose';
import { IVehicle } from '../../interfaces/vehicle';

const vehicleSchema = new Schema<IVehicle>({
    mark: String,
    model: String,
    vin: String,
    techReviewExpDate: String,
    insuranceExpDate: String,
    productionYear: Number,
    mileage: Number,
    fuelType: String,
    power: Number,
    transmission: String,
    bodyType: String,
    createdAt: String,
    owner: String,
    photos: [String],
    repairList: [
        {
            createdAt: String,
            workshop: String,
            description: String
        }
    ]
});

const Vehicle = model<IVehicle>('vehicles', vehicleSchema);

export default Vehicle;