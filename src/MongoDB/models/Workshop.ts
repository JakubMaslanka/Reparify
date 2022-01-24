import { Schema, model } from 'mongoose';
import { IWorkshop } from '../../interfaces/workshop';

const workshopSchema = new Schema<IWorkshop>({
    name: String,
    description: String,
    address1: String,
    address2: String,
    openingHours: String,
    openingDays: String,
    email: String,
    photo: String,
    phoneNumber: Number,
    createdAt: {
        type: String,
        inmutable: true,
        default: () => new Date(Date.now()).toDateString(),
        required: true
    },
    comments: [
        {
            _id: {
                type: String,
                inmutable: true,
                required: true
            },
            author: {
                type: String,
                inmutable: true,
                required: true
            },
            createdAt: {
                type: String,
                inmutable: true,
                default: () => new Date(Date.now()).getTime(),
                required: true
            },
            content: {
                type: String
            },
            rating: {
                type: Number,
                min: 0,
                max: 5
            }
        }
    ]
});

const Workshop = model<IWorkshop>('workshops', workshopSchema);

export default Workshop;