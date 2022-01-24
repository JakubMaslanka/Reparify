import { ICurrentUser } from "./currentUser";

export interface IComment {
    _id: string,
    author: ICurrentUser,
    createdAt: string,
    content: string,
    rating: number
}