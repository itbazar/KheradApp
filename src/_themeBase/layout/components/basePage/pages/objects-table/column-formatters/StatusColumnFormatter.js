import React from "react";
import {
  ObjectStatusCssClasses,
  ObjectStatusTitles
} from "../../ObjectsUIHelpers";
import { FormattedMessage } from "react-intl";
export const StatusColumnFormatter = (cellContent, row) => (
  <span

    className={`label label-lg label-light-${
     
      ObjectStatusCssClasses[(+!!row.isDeleted)]
    } label-inline`}
  >
    <FormattedMessage id= {ObjectStatusTitles[(+!!row.isDeleted)]}/>
  </span>
);
