import { useHistory } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

import { authAudience } from "@web/fixed";

export default function AuthProvider(props: AuthProviderProps) {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain!}
      clientId={clientId!}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={authAudience}
      scope="read:current_user update:current_user_metadata"
    >
      {props.children}
    </Auth0Provider>
  );
}

type AuthProviderProps = {
  children: JSX.Element;
};

const { REACT_APP_AUTH0_DOMAIN: domain, REACT_APP_AUTH0_CLIENT_ID: clientId } = process.env;
