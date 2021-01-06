/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_themeBase/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_themeBase/layout";
import { SetLayout } from "./SetLayout";
import { useLang, setLanguage } from "../_themeBase/i18n";
import { Helmet } from "react-helmet";
import { toAbsoluteUrl } from "../_themeBase/_helpers";

const App = ({ store, persistor, basename }) => {

  const lang = useLang()

  useEffect(() => {
    const linkGlobalStyle = document.querySelector(".global_style");
    console.log(linkGlobalStyle);

    const divBody = document.querySelector("#kt_body");
    console.log(divBody);

    
    if (lang === 'en') {
      console.log("left to right layout");

      linkGlobalStyle.setAttribute("href", toAbsoluteUrl("/css/style.react.css"));
      divBody.setAttribute("direction", "");
      divBody.setAttribute("dir", "");
      divBody.setAttribute("style", "");
      console.log(linkGlobalStyle);
    }
    else {
      console.log("Right to left layout");
      linkGlobalStyle.setAttribute("href", toAbsoluteUrl("/css/style.react.rtl.css"));
      divBody.setAttribute("direction", "rtl");
      divBody.setAttribute("dir", "rtl");
      divBody.setAttribute("style", "direction: rtl");
      console.log(linkGlobalStyle);
    }
   
  }, [lang])

  
  return (
    /* Provide Redux store */

    <Provider store={store}>
      {/* <SetLayout/> */}
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}

              <I18nProvider>
                {/* Render routes with provided `Layout`. */}
                <Routes />

              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>

  );
}

export default App
