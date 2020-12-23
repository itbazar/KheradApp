import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_themeBase/_partials/controls";
import { ObjectsFilter } from "./objects-filter/ObjectsFilter";
import { ObjectsTable } from "./objects-table/ObjectsTable";
import { ObjectsGrouping } from "./objects-grouping/ObjectsGrouping";
import { useObjectsUIContext } from "./ObjectsUIContext";
import { useIntl } from 'react-intl';

export function ObjectsCard({api,columns,currentState,prepareFilter,filterFields,filterInitialValues}) {
  const ObjectsUIContext = useObjectsUIContext();

  const intl = useIntl();

  const ObjectsUIProps = useMemo(() => {
    return {
      ids: ObjectsUIContext.ids,
      queryParams: ObjectsUIContext.queryParams,
      setQueryParams: ObjectsUIContext.setQueryParams,
      newObjectButtonClick: ObjectsUIContext.newObjectButtonClick,
      openDeleteObjectsDialog: ObjectsUIContext.openDeleteObjectsDialog,
      openEditObjectPage: ObjectsUIContext.openEditObjectPage,
      openUpdateObjectsStatusDialog:
        ObjectsUIContext.openUpdateObjectsStatusDialog,
      openFetchObjectsDialog: ObjectsUIContext.openFetchObjectsDialog,
    };
  }, [ObjectsUIContext]);

  return (
    <Card>
      <CardHeader title="">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={ObjectsUIProps.newObjectButtonClick}
          >
         {intl.formatMessage({ id: 'MODULES.GENERAL.BUTTONNEW' })} 
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ObjectsFilter prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>
        {ObjectsUIProps.ids.length > 0 && (
          <>
            <ObjectsGrouping />
          </>
        )}
        <ObjectsTable api={api} currentState={currentState} columns={columns}/>
      </CardBody>
    </Card>
  );
}
