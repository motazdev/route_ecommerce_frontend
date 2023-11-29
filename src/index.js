// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './assets/style/index.scss';
// import App from './App';
// import { BrowserRouter } from "react-router-dom";
// // import { Provider } from 'react-redux';
// // import store from './app/store';
// import { AuthProvider } from 'react-auth-kit';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthProvider
//     authType={'cookie'}
//     authName={'_auth'}
//     cookieDomain={window.location.hostname}
//     cookieSecure={window.location.protocol === "https:"}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </AuthProvider>

// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/style/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { StrictMode } from "react";
import { DataProvider } from "./contexts/DataProvider.js";
import { AuthDataProvider } from "./contexts/AuthDataProvider";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <DataProvider>
      <AuthProvider>
        <AuthDataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthDataProvider>
      </AuthProvider>
    </DataProvider>
  </StrictMode>
);
