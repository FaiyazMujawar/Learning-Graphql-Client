import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

import App from "./App";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

// Adds Authorization token to request headers
const authLink = setContext(() => {
  const token = localStorage.getItem("JWT_TOKEN");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Apollo() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default Apollo;
