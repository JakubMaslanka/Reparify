import { IComment } from "./comment";

export interface IWorkshop {
    id: string
    name: string
    description: string
    address1: string
    address2: string
    openingHours: string
    openingDays: string
    email: string
    photo: string
    createdAt: string,
    phoneNumber: number
    reviewScore: number
    comments: IComment[]
}

