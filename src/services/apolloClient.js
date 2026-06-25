import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP_URL || "https://owwny.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": import.meta.env.VITE_H_PASS,
    "x-hasura-user-id": localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).id
      : null,
    "x-hasura-role": "b2b",
  },
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: import.meta.env.VITE_GRAPHQL_WS_URL || "wss://owwny.hasura.app/v1/graphql",
  options: {
    connectionParams: {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": import.meta.env.VITE_H_PASS,
        "x-hasura-role": "b2b",
      },
    },
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Create the apollo client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
