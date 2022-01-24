export interface IRepair {
    _id: string
    workshop: string
    mileage: number
    description: string
    oilChange: boolean
    oilFilterChange: boolean
    fuelFilterChange: boolean
    dustFilterChange: boolean
    sparkPlugsChange: boolean
    airConditioningReview: boolean
    brakeFluid: boolean
    coolantFluid: boolean
    engineTiming: boolean
    recommendations: string
    otherChanges: string
    createdAt: string
    updatedAt: string
};