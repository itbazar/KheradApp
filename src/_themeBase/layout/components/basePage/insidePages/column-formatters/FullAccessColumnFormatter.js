import React from "react";
import {
  ObjectFullAccessCssClasses,
  ObjectFullAccessTitles
} from "../../insidePages/SpecificationsUIHelper";
import { FormattedMessage } from "react-intl";
export const FullAccessColumnFormatter = (cellContent, row) => (
  <span

    className={`label label-lg label-light-${
     
      ObjectFullAccessCssClasses[(+!!row.isFullAccess)]
    } label-inline`}
  >
    <FormattedMessage id= {ObjectFullAccessTitles[(+!!row.isFullAccess)]}/>
  </span>
);