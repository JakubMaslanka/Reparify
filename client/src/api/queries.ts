import { gql } from '@apollo/client';
import { fragments } from './fragments';

const { 
  USER_FRAGMENT,
  VEHICLE_FRAGMENT,
  REPAIRS_ENTRY_FRAGMENT,
  WORKSHOP_FRAGMENT
} = fragments;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      ... userFields
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_VEHICLES = gql`
  query GetAllVehicles {
    vehicles {
        ... vehicleFields
      owner {
        ... userFields
      }
      repairList {
        ... repairFields
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_SINGLE_VEHICLE = gql`
  query GetSingleVehicle($VehicleId: ID!) {
    vehicle(id: $VehicleId) {
        ... vehicleFields
      owner {
        ... userFields
      }
      repairList {
        ... repairFields
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_CURRENT_USER_VEHICLE = gql`
  query CurrentUserVehicles {
    currentUserVehicles {
        ... vehicleFields
      owner {
        ... userFields
      }
      repairList {
        ... repairFields
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_VEHICLES_MARKED_FOR_SALE = gql`
  query VehicleMarkedForSale {
    vehicleForSale {
        ... vehicleFields
      owner {
        ... userFields
      }
      repairList {
        ... repairFields
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_ALL_WORKSHOPS = gql`
  query GetAllWorkshops {
    workshops {
        ... workshopFields
      comments {
        _id
        author {
          ... userFields
        }
        createdAt
        content
        rating
      }
    }
  }
  ${WORKSHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_SINGLE_WORKSHOP = gql`
  query SingleWorkshop($id: ID!) {
    workshop(id: $id) {
        ... workshopFields
      comments {
        _id
        author {
          ... userFields
        }
        createdAt
        content
        rating
      }
    }
  }
  ${WORKSHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;