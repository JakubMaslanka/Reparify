import { gql } from 'apollo-server-express';

const typeDefs = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        vehicles: [Vehicle!]!
        currentUser: User
    }

    type Mutation {
        login(input: LoginInput!): AuthResult!
        signup(input: SignupInput!): AuthResult!
        logout: Boolean
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input SignupInput {
        email: String!
        firstName: String!
        lastName: String!
        password: String!
    }
    
    interface MutationResult {
        success: Boolean!
        message: String!
    }

    type AuthResult implements MutationResult {
        success: Boolean!
        message: String!
        currentUser: User
    }

    type User {
        id: ID!
        isAdmin: Boolean!
        isWorkshop: Boolean!
        companyName: String
        firstName: String!
        lastName: String!
        email: String!
        createdAt: String!
        avatar: String!
    }

    type Vehicle {
        id: ID
        mark: String!
        model: String!
        vin: String!
        techReviewExpDate: String!
        insuranceExpDate: String!
        productionYear: Int!
        photos: [String]
        fuelType: String
        power: Int
        transmission: String
        bodyType: String
        owner: String!
        createdAt: String!
        repairList: [Repair]!
    }

    type Repair {
        createdAt: String!
        workshop: String!
        description: String
    }
`;

export default typeDefs;