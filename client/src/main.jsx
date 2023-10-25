import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
  <React.StrictMode>
    <Auth0Provider
     domain="dev-bkhop2updo2886ij.us.auth0.com"
     clientId="qpybmcICqVcPpTXaGAbROtpOUn0AyoZw"
     authorizationParams={{
      redirect_uri: "http://localhost:5173"
     }}
     audience="http://localhost:8000"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
  </MantineProvider>
);