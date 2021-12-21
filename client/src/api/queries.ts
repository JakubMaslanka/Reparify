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
      fuelType
      power
      transmission
      bodyType
      owner
      photos
      repairList {
        createdAt
        workshop
        description
      }
    }
  }
`;