import React from "react";
import {useLang} from "./Basei18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/ar";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fa";

import arMessages from "./messages/ar";
import enMessages from "./messages/en";
import faMessages from "./messages/fa";

const allMessages = {
  ar: arMessages,
  en: enMessages,
  fa: faMessages
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
