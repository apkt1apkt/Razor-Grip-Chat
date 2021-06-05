import { ApolloProvider } from "@apollo/client/react";
import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import client, { setAccessToken } from "@web/apollo";
import Layout from "@web/layout";
import ThemeProvider from "@web/providers/CustomTheme";
import { authAudience } from "@web/fixed";

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [gotToken, setGotToken] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        getAccessTokenSilently({ audience: authAudience, scope: "read:current_user" })
          .then((v) => {
            setAccessToken(v);
            setGotToken(true);
          })
          .catch((e) => e);
      } else loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently]);

  if (isLoading || (isAuthenticated && !gotToken)) return <ThemeProvider>loading...</ThemeProvider>;

  if (isAuthenticated)
    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <AppWithLiveUser />
        </ThemeProvider>
      </ApolloProvider>
    );

  return <></>;
}

const AppWithLiveUser = () => {
  const { user, isAuthenticated } = useAuth0();
  const [doUpdateMe] = useMutation(UPDATE_ME);
  useEffect(() => {
    if (isAuthenticated) {
      const { email, name, picture } = user || {};
      doUpdateMe({ variables: { body: { email, name, img: picture } } }).catch((e) => e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return <Layout />;
};

const UPDATE_ME = gql`
  mutation UpdateMe($body: UserInput!) {
    updateMe(body: $body) {
      _id
      email
      name
      img
    }
  }
`;
