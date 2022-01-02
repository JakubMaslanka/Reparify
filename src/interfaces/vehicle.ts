import { Document, SchemaDefinitionProperty } from "mongoose";
import { IRepair } from "./repair";

export type IVehicle = Document & {
    mark: string,
    model: string,
    vin: string,
    productionYear: SchemaDefinitionProperty<Number>,
    mileage: SchemaDefinitionProperty<Number>,
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