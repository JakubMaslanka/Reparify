import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

dotenv.config();

const startApolloServer = async function(typeDefs: DocumentNode, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(), 
            ApolloServerPluginLandingPageDisabled()
        ],
    });

    await connect(process.env.MONGODB!)
            .then(async () => {
                console.log('MongoDB connected!')
                await server.start()

                server.applyMiddleware({ 
                    app,
                    path: '/graphql' 
                });

                await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
                console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
            })
            .catch(err => console.log(err));
}

startApolloServer(typeDefs, resolvers).catch(err => console.log(err));