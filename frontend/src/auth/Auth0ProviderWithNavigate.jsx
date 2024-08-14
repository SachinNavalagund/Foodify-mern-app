import { Auth0Provider, User } from "@auth0/auth0-react";
import React from "react";

const Auth0ProviderWithNavigate = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise auth");
  }

  const onRedirectCallBack = (appState, user) => {
    console.log("User", user);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallBack={onRedirectCallBack}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
