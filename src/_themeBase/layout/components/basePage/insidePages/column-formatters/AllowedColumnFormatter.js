import React from "react";
import {
  ObjectAllowedCssClasses,
  ObjectAllowedTitles
} from "../../insidePages/SpecificationsUIHelper";
import { FormattedMessage } from "react-intl";
export const AllowedColumnFormatter = (cellContent, row) => (
  <span

    className={`label label-lg label-light-${
     
      ObjectAllowedCssClasses[(+!!row.allowed)]
    } label-inline`}
  >
    <FormattedMessage id= {ObjectAllowedTitles[(+!!row.allowed)]}/>
  </span>
);
