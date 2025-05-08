import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './_mockApis';
import './utils/i18n';

// Supertokens - Temporarily disabled
// import SuperTokens from "supertokens-auth-react";
// import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
// import Session from "supertokens-auth-react/recipe/session";
// import EmailVerification from "supertokens-auth-react/recipe/emailverification";

// Supertokens initialization - Temporarily disabled
/*
SuperTokens.init({
    appInfo: {
        appName: "LHS-Pharmacy-Portal-Vibe",
        apiDomain: "http://localhost:5002",
        websiteDomain: "http://localhost:5174",
    },
    recipeList: [
        EmailPassword.init({
          signUpFeature: {
                emailVerificationFeature: {
                    mode: "REQUIRED",
                },
            },
        }),
        Session.init(),
        EmailVerification.init({
            mode: "REQUIRED",
        }),
    ]
});
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
);
