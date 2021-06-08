import { ApolloProvider } from "@apollo/client/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import Text from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import client, { setAccessToken } from "@web/apollo";
import Layout from "@web/layout";
import UpdateUserInfo from "@web/components/UpdateUserInfo";
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

  if (isLoading || (isAuthenticated && !gotToken))
    return (
      <ThemeProvider>
        <div style={{ display: "grid", placeContent: "center", placeItems: "center", height: "95vh" }}>
          <Text variant="h5" style={{ marginBottom: 20 }}>
            Razor Grip Chat
          </Text>
          <CircularProgress />
        </div>
      </ThemeProvider>
    );

  if (isAuthenticated)
    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <UpdateUserInfo />
          <Layout />
        </ThemeProvider>
      </ApolloProvider>
    );

  return <></>;
}
