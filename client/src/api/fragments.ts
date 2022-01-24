import { gql } from "@apollo/client";

export const fragments = {
    USER_FRAGMENT: gql`
        fragment userFields on User {
            id
            isAdmin
            isWorkshop
            firstName
            lastName
            email
            createdAt
            avatar
        }
    `,
    VEHICLE_FRAGMENT: gql`
        fragment vehicleFields on Vehicle {
            id
            mark
            model
            vin
            isArchived
            isMarkedForSale
            price
            techReviewExpDate
            insuranceExpDate
            productionYear
            mileage
            fuelType
            power
            transmission
            bodyType
            photos
            createdAt
        }
    `,
    REPAIRS_ENTRY_FRAGMENT: gql`
        fragment repairFields on Repair {
            _id
            createdAt
            updatedAt
            workshop
            mileage
            description
            oilChange
            oilFilterChange
            fuelFilterChange
            dustFilterChange
            sparkPlugsChange
            airConditioningReview
            brakeFluid
            coolantFluid
            engineTiming
            recommendations
            otherChanges
        }
    `,
    WORKSHOP_FRAGMENT: gql`
        fragment workshopFields on Workshop {
            id
            name
            description
            email
            phoneNumber
            address1
            address2
            openingHours
            openingDays
            photo
            createdAt
            reviewScore
        }
    `
};