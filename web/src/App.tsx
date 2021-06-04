import { ApolloProvider } from "@apollo/client/react";

import Layout from "@web/layout";
import client from "@web/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  );
}
