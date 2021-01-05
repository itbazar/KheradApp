import React from "react";
import {FormattedDate } from 'react-intl'
export const DateColumnFormatter = (cellContent, row,props) => (
<FormattedDate value={cellContent} />
);


