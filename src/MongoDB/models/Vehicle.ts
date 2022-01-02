import { Schema, model } from 'mongoose';
import { IVehicle } from '../../interfaces/vehicle';

const vehicleSchema = new Schema<IVehicle>({
    mark: String,
    model: String,
    vin: String,
    techReviewExpDate: String,
    insuranceExpDate: String,
    productionYear: {
        type: Number,
        min: 1900
    },
    mileage: {
        type: Number,
        min: 1
    },
    fuelType: String,
    power: {
        type: Number,
        min: 10,
        max: 1000
    },
    transmission: String,
    bodyType: String,
    createdAt: {
        type: String,
        inmutable: true,
        default: () => new Date(Date.now()).toDateString(),
        required: true
    },
    owner: String,
    photos: [String],
    repairList: [
        {
            _id: {
                type: String,
                inmutable: true,
                required: true
            },
            updatedAt: {
                type: String,
                inmutable: true,
                required: false
            },
            createdAt: {
                type: String,
                inmutable: true,
                default: () => new Date(Date.now()).toDateString(),
                required: true
            },
            workshop: {
                type: String,
                inmutable: true
            },
            mileage: {
                type: Number,
                inmutable: true,
                min: 1
            },
            description: String,
            oilChange: Boolean,
            oilFilterChange: Boolean,
            fuelFilterChange: Boolean,
            dustFilterChange: Boolean,
            sparkPlugsChange: Boolean,
            airConditioningReview: Boolean,
            brakeFluid: Boolean,
            coolantFluid: Boolean,
            engineTiming: Boolean,
            recommendations: String,
            otherChanges: String
        }
    ]
});

const Vehicle = model<IVehicle>('vehicles', vehicleSchema);

export default Vehicle;