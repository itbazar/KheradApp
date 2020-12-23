import React, { createContext } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import SetLayout from "../../app/SetLayout";
import { Helmet } from "react-helmet";
import { toAbsoluteUrl } from "../_helpers";

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || "i18nConfig";
const initialState = {
  selectedLang: "fa"
};

function getConfig() {
  const ls = localStorage.getItem(I18N_CONFIG_KEY);
  if (ls) {
    try {
      return JSON.parse(ls);
    } catch (er) {
      console.error(er);
    }
  }
  return initialState;
}

// Side effect
export function setLanguage(lang) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
  window.location.reload();

  //   let ret = '<div></div>'

  //   const linkGlobalStyle = document.querySelector(".global_style");
  //     console.log(linkGlobalStyle);

  //     const divBody = document.querySelector("#kt_body");
  //     console.log(divBody);

  //   if (lang === 'en') {
  //     console.log("left to right layout");

  //     linkGlobalStyle.setAttribute("href",toAbsoluteUrl("/css/style.react.css") );
  //     divBody.setAttribute("direction", "");
  //     divBody.setAttribute("dir", "");
  //     divBody.setAttribute("style", "");
  //     console.log(linkGlobalStyle);
  //     // ret =
  //     // <Helmet>

  //     //     <link
  //     //         rel="stylesheet"
  //     //         id="global_style"
  //     //         class="global_style"
  //     //         href={toAbsoluteUrl("/css/style.react.css")} 
  //     //     />
  //     //     <body id="kt_body" />
  //     // </Helmet>

  // }
  // else {
  //     console.log("Right to left layout");
  //     linkGlobalStyle.setAttribute("href", toAbsoluteUrl("/css/style.react.rtl.css"));
  //     divBody.setAttribute("direction", "rtl");
  //     divBody.setAttribute("dir", "rtl");
  //     divBody.setAttribute("style", "direction: rtl");
  //     console.log(linkGlobalStyle);
  //     // ret = 
  //     // <Helmet>

  //     //     <link
  //     //         rel="stylesheet"
  //     //         id="global_style"
  //     //         class="global_style"
  //     //         href={toAbsoluteUrl("/css/style.react.rtl.css")}
  //     //     />
  //     //     <body id="kt_body" direction="rtl" dir="rtl" style="direction: rtl"></body>
  //     // </Helmet>
  // }

}

const I18nContext = createContext();

export function useLang() {
  return useContext(I18nContext).selectedLang;
}

export function withI18n(Component) {
  class WithI18n extends React.Component {
    static displayName = `WithI18n(${Component.displayName || Component.name})`;

    static contextType = I18nContext;

    render() {
      return <Component {...this.props} menu={this.context} />;
    }
  }

  return WithI18n;
}

export const I18nConsumer = I18nContext.Consumer;

export function BaseI18nProvider({ children }) {
  const lang = useMemo(getConfig, []);

  return (
    <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
  );
}
