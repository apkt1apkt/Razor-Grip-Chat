import { split, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";

const { REACT_APP_API_URI: httpUri, REACT_APP_API_SOCKET: socketUri } = process.env;

const TOKEN = { token: "" };

export const getAccessToken = () => TOKEN.token;

export const setAccessToken = (token: string) => (TOKEN.token = `Bearer ${token}`);

const httpLink = createHttpLink({ uri: httpUri });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getAccessToken(),
  },
}));

const wsLink = new WebSocketLink({
  uri: socketUri!,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => ({ "x-auth": getAccessToken() }),
  },
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
