/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import clsx from "clsx";
import { Dropdown } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../_helpers";
import { useLang, setLanguage } from "../../../../i18n";
import { DropdownItemToggler } from "../../../../_partials/dropdowns";
import { FormattedMessage } from "react-intl";

const languages = [
  {
    lang: "fa",
    name: "فارسی",
    flag: toAbsoluteUrl("/media/svg/flags/136-iran.svg"),
  },
  {
    lang: "en",
    name: "English",
    flag: toAbsoluteUrl("/media/svg/flags/012-uk.svg"),
  },
  {
    lang: "ar",
    name: "العربیه",
    flag: toAbsoluteUrl("/media/svg/flags/020-iraq.svg"),
  },
];

export function LanguageSelectorDropdown() {
  const lang = useLang();
  const currentLanguage = languages.find((x) => x.lang === lang);
  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownItemToggler}
        id="dropdown-toggle-my-cart"
        className="mb-2"
      >
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="language-panel-tooltip"><FormattedMessage  id="TRANSLATOR.SELECT"/></Tooltip>
          }
        >
          <div className="btn btn-icon btn-clean btn-lg">
            <img
              className="w-25px h-25px w-lg-30px h-lg-30px rounded-circle"
              src={currentLanguage.flag}
              alt={currentLanguage.name}
            />
          </div>
        </OverlayTrigger>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-left">
        <ul className="navi navi-hover py-4">
          {languages.map((language) => (
            <li
              key={language.lang}
              className={clsx("navi-item", {
                active: language.lang === currentLanguage.lang,
              })}
            >
              <a
                href="#"
                onClick={() => setLanguage(language.lang)}
                className="navi-link"
              >
                <span className="symbol symbol-20 mr-3">
                  <img src={language.flag} alt={language.name} />
                </span>
                <span className="navi-text">{language.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
