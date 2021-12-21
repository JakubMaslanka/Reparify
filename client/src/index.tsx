import "./index.css";
import React from "react";
import App from "./components/App";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./utils/AuthProvider";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
})

const client = new ApolloClient({
  cache,
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include'
});

const rootElement = document.getElementById("root")! as HTMLElement;
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);