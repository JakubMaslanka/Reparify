import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      isAdmin
      isWorkshop
      firstName
      lastName
      email
      createdAt
      avatar
    }
  }
`;

export const GET_ALL_VEHICLES = gql`
  query GetAllVehicles {
    vehicles {
      id
      mark
      model
      vin
      techReviewExpDate
      insuranceExpDate
      productionYear
      mileage
      fuelType
      power
      transmission
      bodyType
      owner {
        id
        isAdmin
        isWorkshop
        firstName
        lastName
        email
        createdAt
        avatar
      }
      photos
      repairList {
        createdAt
        workshop
        description
      }
    }
  }
`;

export const GET_SINGLE_VEHICLE = gql`
  query GetSingleVehicle($VehicleId: ID!) {
    vehicle(id: $VehicleId) {
      id
      mark
      model
      vin
      techReviewExpDate
      insuranceExpDate
      productionYear
      mileage
      fuelType
      power
      transmission
      bodyType
      photos
      repairList {
        createdAt
        workshop
        description
      }
    }
  }
`;

export const GET_CURRENT_USER_VEHICLE = gql`
  query CurrentUserVehicles {
    currentUserVehicles {
      id
      mark
      model
      vin
      techReviewExpDate
      insuranceExpDate
      productionYear
      mileage
      fuelType
      power
      transmission
      bodyType
      owner {
        firstName
        lastName
      }
      photos
      repairList {
        createdAt
        workshop
        description
      }
    }
  }
`;