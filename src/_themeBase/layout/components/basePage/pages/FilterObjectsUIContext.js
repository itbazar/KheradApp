import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";

const FilterObjectsUIContext = createContext();

export function useFilterObjectsUIContext() {
  return useContext(FilterObjectsUIContext);
}

export const initialFilter = {
  filter: {
    title: "",
  },
  sortOrder: "desc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 5,

  whereClause: "",
  whereClauseParameters: [
  ],
  orderCluase: "id desc ",
  skipCount: 0,
  takeCount: 5,

  whereClauseSelect: "",
  whereClauseParametersSelect: [
  ],
};

export function FilterObjectsUIProvider({children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
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
    setQueryParams
  };

  return (
    <FilterObjectsUIContext.Provider value={value}>
      {children}
    </FilterObjectsUIContext.Provider>
  );
}
