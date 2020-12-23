import React from "react";
import { FormattedMessage } from "react-intl";
import {
  ObjectConditionCssClasses,
  ObjectConditionTitles
} from "../../ObjectsUIHelpers";

export const ConditionColumnFormatter = (cellContent, row) => (
  <>
    <span
      className={`badge badge-${
        ObjectConditionCssClasses[row.condition]
      } badge-dot`}
    ></span>
    &nbsp;
    <span
      className={`font-bold font-${
        ObjectConditionCssClasses[row.condition]
      }`}
    >
      {<FormattedMessage  id={ObjectConditionTitles[row.condition]} />}
    </span>
  </>
);
