import { gql } from 'apollo-server-express';

const typeDefs = gql`
    schema {
        query: Query
        mutation: Mutation
    }

    scalar Upload

    type Query {
        vehicles: [Vehicle!]!
        vehicle(id: ID!): Vehicle!
        workshops: [Workshop!]!
        workshop(id: ID!): Workshop!
        currentUserVehicles: [Vehicle]!
        vehicleForSale: [Vehicle]!
        user(id: ID!): User!
        currentUser: User
        otherFields: Boolean!
    }

    type Mutation {
        login(input: LoginInput!): AuthResult!
        signup(input: SignupInput!): AuthResult!
        logout: Boolean
        fileUpload(file: [Upload]!): FileUploadResult!
        addVehicle(input: VehicleCreateInput!): VehicleResult!
        editVehicle(id: ID!, input: VehicleUpdateInput!): VehicleResult!
        removeVehicle(id: ID): OnlyMutationResult!
        archiveVehicle(id: ID!): VehicleResult!
        addRepair(id: ID!, input: RepairInput!): VehicleRepairResult!
        editRepair(id: ID!, input: RepairInput!, repairId: String!): VehicleRepairResult!
        removeRepair(id: ID!, repairId: String!): VehicleRepairResult!
        markVehicleForSale(id: ID!, price: Int!): VehicleResult!
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

    input VehicleCreateInput {
        mark: String!
        model: String!
        power: Int!
        mileage: Int!
        productionYear: Int!
        fuelType: String!
        bodyType: String!
        transmission: String!
        insuranceExpDate: String!
        techReviewExpDate: String!
        vin: String!
        photos: [String]!
    }

    input VehicleUpdateInput {
        mark: String!
        model: String!
        power: Int!
        productionYear: Int!
        fuelType: String!
        bodyType: String!
        transmission: String!
        insuranceExpDate: String!
        techReviewExpDate: String!
        photos: [String]!
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

    type OnlyMutationResult {
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

    type VehicleResult implements MutationResult {
        success: Boolean!
        message: String!
        vehicle: Vehicle
    }

    type FileUploadResult implements MutationResult {
        success: Boolean!
        message: String!
        uploadFileList: [File]!
    }

    type File {
      url: String!
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
        isArchived: Boolean!
        isMarkedForSale: Boolean!
        price: Int
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

    type Workshop {
        id: ID!
        name: String!
        description: String!
        email: String!
        phoneNumber: Int!
        address1: String!
        address2: String!
        openingHours: String!
        openingDays: String!
        photo: String!
        createdAt: String!
        comments: [Comment!]!
        reviewScore: Int!
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

    type Comment {
        _id: ID!
        author: User!
        createdAt: String!
        content: String!
        rating: Int!
    }
`;

export default typeDefs;