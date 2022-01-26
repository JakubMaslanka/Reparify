import { Document, SchemaDefinitionProperty } from "mongoose";

export type IWorkshop = Document & {
    name: string,
    description: string,
    address1: string,
    address2: string,
    openingHours: string,
    openingDays: string,
    email: string,
    photo: string,
    createdAt: string,
    phoneNumber: SchemaDefinitionProperty<Number>
    comments: IComment[]
}

export interface IComment {
    _id: string,
    author: string,
    createdAt: string,
    content: string,
    rating: SchemaDefinitionProperty<Number>
}