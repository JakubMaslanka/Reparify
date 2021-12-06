import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    schema {
        query: Query
    }

    type Query {
        vehicles: [Vehicle!]!
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
