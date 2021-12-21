import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import session from 'express-session';
import passport from 'passport';
import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { buildContext } from "graphql-passport";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers/index';

import initializeAuth from './data/auth';

dotenv.config();

const startApolloServer = async function(typeDefs: DocumentNode, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);
    const corsOptions = {
        origin: process.env.CLIENT_URI!,
        credentials: true 
    };

    try {
        initializeAuth({
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
            FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
        });
    } catch (error: unknown) {
        console.log(error)
    }

    app.use(session({
        secret: process.env.SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => buildContext({ req, res }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(), 
            ApolloServerPluginLandingPageDisabled()
        ]
    });

    await connect(`${process.env.MONGO_STARTPOINT!}${process.env.MONGO_USERNAME!}:${process.env.MONGO_PASSWORD!}${process.env.MONGO_ENDPOINT!}`)
        .then(async () => {
            console.log('MongoDB connected!')
            await server.start()

            server.applyMiddleware({ 
                app,
                path: '/graphql',
                cors: corsOptions
            });

            app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
            app.get('/auth/google/callback', passport.authenticate('google', { 
                failureRedirect: `${process.env.CLIENT_URI!}/login`}),
                (_req: Request, res: Response) => res.redirect(process.env.CLIENT_URI!));

            app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
            app.get('/auth/facebook/callback', passport.authenticate('facebook', {
                failureRedirect: `${process.env.CLIENT_URI!}/login`}),
                (_req: Request, res: Response) => res.redirect(process.env.CLIENT_URI!));

            await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        })
        .catch(err => console.log(err));
}

startApolloServer(typeDefs, resolvers).catch(err => console.log(err));