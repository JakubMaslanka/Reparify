import mongoose from "mongoose";

export type IVehicle = mongoose.Document & {
    mark: string,
    model: string,
    vin: string,
    productionYear: Number,
    mileage: Number,
    photos: string[],
    fuelType: string,
    power: Number,
    transmission: string,
    bodyType: string,
    createdAt: string,
    techReviewExpDate: string,
    insuranceExpDate: string,
    owner: string,
    repairList: {
        date: string,
        workshop: string,
        description: string
    }[]
}