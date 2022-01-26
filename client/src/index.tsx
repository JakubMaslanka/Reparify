import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import App from "./components/App";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./utils/AuthProvider";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false,
})

const client = new ApolloClient({
  // @ts-ignore
  link: createUploadLink({
    credentials: 'include',
    uri: 'http://localhost:4000/graphql',
  }),
  cache
});

const rootElement = document.getElementById("root")! as HTMLElement;

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={5}
            />
            <App />
          </AuthProvider>
        </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);