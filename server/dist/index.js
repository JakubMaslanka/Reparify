"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = require("mongoose");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_passport_1 = require("graphql-passport");
const graphql_upload_1 = require("graphql-upload");
const apollo_server_core_1 = require("apollo-server-core");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const index_1 = __importDefault(require("./graphql/resolvers/index"));
const auth_1 = __importDefault(require("./data/auth"));
dotenv.config();
const startApolloServer = async function (typeDefs, resolvers) {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const corsOptions = {
        origin: process.env.CLIENT_URI || 'http://localhost:3000',
        credentials: true
    };
    try {
        (0, auth_1.default)({
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
            FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
        });
    }
    catch (error) {
        console.log(error);
    }
    const uri = process.env.NODE_ENV !== "production" ?
        `${process.env.MONGO_STARTPOINT}${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}${process.env.MONGO_ENDPOINT}`
        : process.env.MONGODB_URI;
    const options = process.env.NODE_ENV !== "production" ?
        undefined
        : {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        };
    const store = process.env.NODE_ENV !== "production" ?
        undefined
        : connect_mongo_1.default.create({
            mongoUrl: process.env.MONGODB_CONNECTION_URI,
            collectionName: 'sessions'
        });
    app.use((0, express_session_1.default)({
        secret: process.env.SECRET || 'sessionSecret',
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "produciton",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 750000 }));
    app.use('/vehicle_pictures', express_1.default.static(__dirname + '/public'));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => (0, graphql_passport_1.buildContext)({ req, res }),
        plugins: process.env.NODE_ENV !== "production" ? [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)()
        ] : [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })
        ]
    });
    await (0, mongoose_1.connect)(uri, options)
        .then(async () => {
        console.log('MongoDB connected!');
        console.log(`Mode: ${process.env.NODE_ENV !== "production" ? "development" : "production"}`);
        await server.start();
        server.applyMiddleware({
            app,
            path: '/graphql',
            cors: corsOptions
        });
        app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
        app.get('/auth/google/callback', passport_1.default.authenticate('google', {
            failureRedirect: `${process.env.CLIENT_URI}/login`
        }), (_req, res) => res.redirect(`${process.env.CLIENT_URI}/dashboard`));
        app.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
        app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
            failureRedirect: `${process.env.CLIENT_URI}/login`
        }), (_req, res) => res.redirect(`${process.env.CLIENT_URI}/dashboard`));
        await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
        .catch(err => console.log(err));
};
startApolloServer(typeDefs_1.default, index_1.default).catch(err => console.log(err));
