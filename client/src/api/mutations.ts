import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($credentials: SignupInput!) {
    signup(input: $credentials) {
      success
      message
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
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($credentials: LoginInput!) {
    login(input: $credentials) {
      success
      message
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
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
