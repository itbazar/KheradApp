import React, { useMemo } from "react";
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
import { useFilterObjectsUIContext } from "./FilterObjectsUIContext";

export function ObjectsCard({ haveGeneralAction = true, isFullAccess, api, basePath, columns, currentState, prepareFilter, filterFields, filterInitialValues }) {
  const ObjectsUIContext = useObjectsUIContext();
  const filterUIContext = useFilterObjectsUIContext();


  const intl = useIntl();

  const ObjectsUIProps = useMemo(() => {
    return {
      ids: ObjectsUIContext.ids,
      queryParams: filterUIContext.queryParams,
      setQueryParams: filterUIContext.setQueryParams,
      newObjectButtonClick: ObjectsUIContext.newObjectButtonClick,
      openDeleteObjectsDialog: ObjectsUIContext.openDeleteObjectsDialog,
      openEditObjectPage: ObjectsUIContext.openEditObjectPage,
      openUpdateObjectsStatusDialog:
        ObjectsUIContext.openUpdateObjectsStatusDialog,
      openFetchObjectsDialog: ObjectsUIContext.openFetchObjectsDialog,
    };
  }, [ObjectsUIContext,filterUIContext]);

  return (
    <Card>
      <CardHeader title="">
        <CardHeaderToolbar>
          {haveGeneralAction && <button
            type="button"
            className="btn btn-primary"
            onClick={ObjectsUIProps.newObjectButtonClick}
            disabled={!isFullAccess}
          >
            {intl.formatMessage({ id: 'MODULES.GENERAL.BUTTONNEW' })}
          </button>
          }
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ObjectsFilter prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues} />
        {ObjectsUIProps.ids.length > 0 && (
          <>
            <ObjectsGrouping />
          </>
        )}
        <ObjectsTable haveGeneralAction={haveGeneralAction} isFullAccess={isFullAccess} api={api} basePath={basePath} currentState={currentState} columns={columns} />
      </CardBody>
    </Card>
  );
}
