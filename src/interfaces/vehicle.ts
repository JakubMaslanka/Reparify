import { Document, SchemaDefinitionProperty } from "mongoose";
import { IRepair } from "./repair";

export type IVehicle = Document & {
    mark: string,
    model: string,
    vin: string,
    productionYear: SchemaDefinitionProperty<Number>,
    mileage: SchemaDefinitionProperty<Number>,
    isArchived: boolean,
    isMarkedForSale: boolean,
    price: number | undefined,
    photos: string[],
    fuelType: string,
    power: SchemaDefinitionProperty<Number>,
    transmission: string,
    bodyType: string,
    createdAt: string,
    techReviewExpDate: string,
    insuranceExpDate: string,
    owner: string,
    repairList: IRepair[]
}

export interface IUpdateVehicleInput {
    mark: string,
    model: string,
    productionYear: number,
    photos: string[],
    fuelType: string,
    power: number,
    transmission: string,
    bodyType: string,
    techReviewExpDate: string,
    insuranceExpDate: string
}