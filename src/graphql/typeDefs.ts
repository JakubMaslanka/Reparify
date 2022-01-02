import { gql } from 'apollo-server-express';

const typeDefs = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        vehicles: [Vehicle!]!
        vehicle(id: ID!): Vehicle!
        currentUserVehicles: [Vehicle]!
        user(id: ID!): User!
        currentUser: User
    }

    type Mutation {
        login(input: LoginInput!): AuthResult!
        signup(input: SignupInput!): AuthResult!
        logout: Boolean
        addRepair(id: ID!, input: RepairInput!): VehicleRepairResult!
        editRepair(id: ID!, input: RepairInput!, repairId: String!): VehicleRepairResult!
        removeRepair(id: ID!, repairId: String!): VehicleRepairResult!
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

    input RepairInput {
        workshop: String!
        mileage: Int!
        description: String!
        oilChange: Boolean!
        oilFilterChange: Boolean!
        fuelFilterChange: Boolean!
        dustFilterChange: Boolean!
        sparkPlugsChange: Boolean!
        airConditioningReview: Boolean!
        brakeFluid: Boolean!
        coolantFluid: Boolean!
        engineTiming: Boolean!
        recommendations: String
        otherChanges: String
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

    type VehicleRepairResult implements MutationResult {
        success: Boolean!
        message: String!
        vehicle: Vehicle
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
        id: ID!
        mark: String!
        model: String!
        vin: String!
        techReviewExpDate: String!
        insuranceExpDate: String!
        productionYear: Int!
        mileage: Int!
        photos: [String]
        fuelType: String
        power: Int
        transmission: String
        bodyType: String
        owner: User!
        createdAt: String!
        repairList: [Repair]
    }

    type Repair {
        _id: ID!
        createdAt: String!
        updatedAt: String
        workshop: String!
        mileage: Int!
        description: String!
        oilChange: Boolean!
        oilFilterChange: Boolean!
        fuelFilterChange: Boolean!
        dustFilterChange: Boolean!
        sparkPlugsChange: Boolean!
        airConditioningReview: Boolean!
        brakeFluid: Boolean!
        coolantFluid: Boolean!
        engineTiming: Boolean!
        recommendations: String
        otherChanges: String
    }
`;

export default typeDefs;