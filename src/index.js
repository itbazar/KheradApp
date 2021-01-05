/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "./_themeBase/_assets/css/FoodSoft.css";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";
import App from "./app/App";
//import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "./_themeBase/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_themeBase/_assets/plugins/flaticon/flaticon.css";
import "./_themeBase/_assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import {
  BaseLayoutProvider,
  BaseSplashScreenProvider,
  BaseSubheaderProvider
} from "./_themeBase/layout";
import {BaseI18nProvider} from "./_themeBase/i18n";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
// /* const mock = */ _redux.mockAxios(axios);

/**
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store);

ReactDOM.render(
  <BaseI18nProvider>
     {/* <SetLayout/> */}
    <BaseLayoutProvider>
      <BaseSubheaderProvider>
        <BaseSplashScreenProvider>
          <App store={store} persistor={persistor} basename={PUBLIC_URL} />
        </BaseSplashScreenProvider>
      </BaseSubheaderProvider>
    </BaseLayoutProvider>
  </BaseI18nProvider>,
  document.getElementById("root")
);
