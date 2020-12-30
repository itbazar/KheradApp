import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
// import { initialFilter } from "./ObjectsUIHelpers";

const ObjectsUIContext = createContext();

export function useObjectsUIContext() {
  return useContext(ObjectsUIContext);
}

export const ObjectsUIConsumer = ObjectsUIContext.Consumer;

export function ObjectsUIProvider({ ObjectsUIEvents, children,initialFilter }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);
 


  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newObjectButtonClick: ObjectsUIEvents.newObjectButtonClick,
    openEditObjectPage: ObjectsUIEvents.openEditObjectPage,
    openDeleteObjectDialog: ObjectsUIEvents.openDeleteObjectDialog,
    openDeleteObjectsDialog: ObjectsUIEvents.openDeleteObjectsDialog,
    openFetchObjectsDialog: ObjectsUIEvents.openFetchObjectsDialog,
    openUpdateObjectsStatusDialog:
      ObjectsUIEvents.openUpdateObjectsStatusDialog,
  };

  return (
    <ObjectsUIContext.Provider value={value}>
      {children}
    </ObjectsUIContext.Provider>
  );
}
