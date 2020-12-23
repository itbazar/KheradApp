import React from 'react';
import { ObjectStatusTitles } from '../../../_themeBase/layout/components/basePage/pages/ObjectsUIHelpers';
import { Select } from '../../../_themeBase/_partials/controls';

export const SelectStatus = (props) => {
    return (
      <Select name="isDeleted" label="MODULES.GENERAL.STATUS" {...props}>
        {ObjectStatusTitles.map((isDeleted, index) => (
          <option key={isDeleted} value={index}>
            {isDeleted}
          </option>
        ))}
      </Select>
    )
  }