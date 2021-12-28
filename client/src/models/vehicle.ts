export interface Vehicle {
    id: string,
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
    owner: string,
    createdAt: string,
    techReviewExpDate: string,
    insuranceExpDate: string,
    repairList: {
        createdAt: string,
        workshop: string,
        description: string
    }[],
    user?: {
        type: any,
        ref: string
    }
}