import { useHistory } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

import { authClientId, authDomain } from "@web/fixed";

export default function AuthProvider(props: AuthProviderProps) {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={authDomain}
      clientId={authClientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0Provider>
  );
}

type AuthProviderProps = {
  children: JSX.Element;
};
