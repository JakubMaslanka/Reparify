import { gql } from '@apollo/client';
import { fragments } from './fragments';

const { 
  USER_FRAGMENT,
  VEHICLE_FRAGMENT,
  REPAIRS_ENTRY_FRAGMENT
} = fragments;

export const SIGNUP_MUTATION = gql`
  mutation Signup($credentials: SignupInput!) {
    signup(input: $credentials) {
      success
      message
      currentUser {
        ... userFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($credentials: LoginInput!) {
    login(input: $credentials) {
      success
      message
      currentUser {
        ... userFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const UPLOAD_FILE = gql`
  mutation FileUpload($file: [Upload]!) {
    fileUpload(file: $file) {
    success
    message
    uploadFileList {
        url
      }
    }
  }
`;

export const CREATE_NEW_REPAIR_ENTRY = gql`
  mutation AddRepair($id: ID!, $input: RepairInput!) {
    addRepair(id: $id, input: $input) {
      success
      message
      vehicle {
        ... vehicleFields
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
`;

export const UPDATE_EXIST_REPAIR_ENTRY = gql`
  mutation EditRepair($id: ID!, $input: RepairInput!, $repairID: String!) {
    editRepair(id: $id, input: $input, repairId: $repairID) {
      success
      message
      vehicle {
        ... vehicleFields
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
`;

export const DELETE_EXIST_REPAIR_ENTRY = gql`
  mutation RemoveRepair($id: ID!, $repairID: String!) {
    removeRepair(id: $id, repairId: $repairID) {
      success
      message
      vehicle {
        ... vehicleFields
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
`;

export const CREATE_NEW_VEHICLE = gql`
  mutation AddVehicle($formData: VehicleCreateInput!) {
    addVehicle(input: $formData) {
      success
      message
      vehicle {
        ... vehicleFields
        owner {
          ... userFields
        }
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const UPDATE_EXIST_VEHICLE = gql`
  mutation EditVehicle($id: ID!, $formData: VehicleUpdateInput!) {
    editVehicle(id: $id, input: $formData) {
      success
      message
      vehicle {
        ... vehicleFields
        owner {
          ... userFields
        }
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const DELETE_EXIST_VEHICLE = gql`
  mutation DeleteVehicle($id: ID!) {
    removeVehicle(id: $id) {
      success
      message
    }
  }
`;

export const ARCHIVE_EXIST_VEHICLE = gql`
  mutation ArchiveCurrentVehicle($id: ID!) {
    archiveVehicle(id: $id) {
      success
      message
      vehicle {
        ... vehicleFields
        owner {
          ... userFields
        }
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const MARK_FOR_SALE_VEHICLE = gql`
  mutation MarkVehicleForSale($id: ID!, $price: Int!) {
    markVehicleForSale(id: $id, price: $price) {
      success
      message
      vehicle {
        ... vehicleFields
        owner {
          ... userFields
        }
        repairList {
          ... repairFields
        }
      }
    }
  }
  ${VEHICLE_FRAGMENT}
  ${REPAIRS_ENTRY_FRAGMENT}
  ${USER_FRAGMENT}
`;