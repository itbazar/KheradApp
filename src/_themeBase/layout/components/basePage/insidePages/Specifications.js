import React, { useMemo } from "react";
import { SpecificationsFilter } from "./SpecificationsFilter";
import { SpecificationsTable } from "./SpecificationsTable";
import { SpecificationsLoadingDialog } from "./SpecificationsLoadingDialog";
import { SpecificationsDeleteDialog } from "./SpecificationsDeleteDialog";
import { SpecificationDeleteDialog } from "./SpecificationDeleteDialog";
import { SpecificationsFetchDialog } from "./SpecificationsFetchDialog";
import { SpecificationsGrouping } from "./SpecificationsGrouping";
import { SpecificationEditDialog } from "./specification-edit-dialog/SpecificationEditDialog";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";

export function Specifications({api,reduxName,columns,prepareFilter,filterInitialValues,filterFields}) {
  // Specifications UI Context
  const specsUIContext = useSpecificationsUIContext();
  const specsUIProps = useMemo(() => {
    return { ids: specsUIContext.ids };
  }, [specsUIContext]);

  filterInitialValues.roleId = specsUIContext.parentId
  return (
    <>
      <SpecificationsLoadingDialog reduxName={reduxName}/>
      <SpecificationEditDialog api={api} reduxName={reduxName}/>
      <SpecificationDeleteDialog api={api} reduxName={reduxName}/>
      <SpecificationsDeleteDialog api={api} reduxName={reduxName}/>
      <SpecificationsFetchDialog api={api} reduxName={reduxName}/>
      <div className="form margin-b-30">
        <SpecificationsFilter prepareFilter={prepareFilter} filterInitialValues={filterInitialValues} filterFields={filterFields}/>
        {specsUIProps.ids.length > 0 && (
          <>
            <SpecificationsGrouping />
            <br />
          </>
        )}
      </div>
      <SpecificationsTable api={api} reduxName={reduxName} columns={columns}/>
    </>
  );
}
