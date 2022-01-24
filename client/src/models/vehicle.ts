import { ICurrentUser } from "./currentUser";
import { IRepair } from "./repair";

export interface IVehicle {
    id: string,
    mark: string,
    model: string,
    vin: string,
    isArchived: boolean,
    isMarkedForSale: boolean,
    productionYear: number,
    mileage: number,
    price?: number,
    photos: string[],
    fuelType: string,
    power: number,
    transmission: string,
    bodyType: string,
    owner: ICurrentUser,
    createdAt: string,
    techReviewExpDate: string,
    insuranceExpDate: string,
    repairList: IRepair[]
}

export interface CreateVehicleMutationVariables {
    mark: string
    model: string
    vin: string
    techReviewExpDate: string
    insuranceExpDate: string
    fuelType: string
    mileage: number | string
    power: number | string
    productionYear: number | string
    bodyType: string
    transmission: string
    photos: (string | null)[] | {url: string | null}[]
}