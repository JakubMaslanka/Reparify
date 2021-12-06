import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
})

const client = new ApolloClient({
  cache,
  uri: GRAPHQL_ENDPOINT
});

const rootElement = document.getElementById("root")! as HTMLElement;
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
          <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);