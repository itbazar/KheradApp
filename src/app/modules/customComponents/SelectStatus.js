import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ObjectStatusTitles } from '../../../_themeBase/layout/components/basePage/pages/ObjectsUIHelpers';
import { Select } from '../../../_themeBase/_partials/controls';
import { useIntl } from 'react-intl';

export const SelectStatus = (props) => {
  const intl = useIntl();
    return (
      <Select name="isDeleted" label="MODULES.GENERAL.STATUS" {...props}>
        {ObjectStatusTitles.map((isDeleted, index) => (
          <option key={isDeleted} value={index}>
           
            {intl.formatMessage({ id: isDeleted })}
        {/* {isDeleted} */}
        
          </option>
        ))}
      </Select>
    )
  }