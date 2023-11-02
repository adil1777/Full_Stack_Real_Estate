import React from "react";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";



import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-bkhop2updo2886ij.us.auth0.com"
    clientId="iogTJQob9YiGgtIvX5UjXiKxBxX2jm09"
    authorizationParams={{
      redirect_uri:"http://localhost:5173"
    }}
  >
    <App />
  </Auth0Provider>,
);