import { split, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/socket",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: TOKEN,
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
