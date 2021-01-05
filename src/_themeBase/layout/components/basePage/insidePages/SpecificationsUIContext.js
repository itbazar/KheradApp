/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
// import { initialFilter } from "./SpecificationsUIHelper";

const SpecificationsUIContext = createContext();

export function useSpecificationsUIContext() {
  return useContext(SpecificationsUIContext);
}

export const SpecificationsUIConsumer = SpecificationsUIContext.Consumer;

export function SpecificationsUIProvider({ currentParentId,initSpecification, children }) {//,initialFilter
  const [parentId, setParentId] = useState(currentParentId);
  // const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  // const setQueryParams = useCallback((nextQueryParams) => {
  //   setQueryParamsBase((prevQueryParams) => {
  //     if (isFunction(nextQueryParams)) {
  //       nextQueryParams = nextQueryParams(prevQueryParams);
  //     }

  //     if (isEqual(prevQueryParams, nextQueryParams)) {
  //       return prevQueryParams;
  //     }

  //     nextQueryParams.roleId = parentId
  //     return nextQueryParams;
  //   });
  // }, []);
  const [selectedId, setSelectedId] = useState(null);
 
  useEffect(() => {
    initSpecification.roleId = currentParentId;
    //initSpecification.groupId = currentParentId;
    setParentId(currentParentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParentId]);
  const [
    showEditSpecificationDialog,
    setShowEditSpecificationDialog,
  ] = useState(false);
  const openNewSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowEditSpecificationDialog(true);
  };
  const openEditSpecificationDialog = (id) => {
    setSelectedId(id);
    setShowEditSpecificationDialog(true);
  };
  const closeEditSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowEditSpecificationDialog(false);
  };
  const [
    showDeleteSpecificationDialog,
    setShowDeleteSpecificationDialog,
  ] = useState(false);
  const openDeleteSpecificationDialog = (id) => {
    setSelectedId(id);
    setShowDeleteSpecificationDialog(true);
  };
  const closeDeleteSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowDeleteSpecificationDialog(false);
  };
  const [
    showDeleteSpecificationsDialog,
    setShowDeleteSpecificationsDialog,
  ] = useState(false);
  const openDeleteSpecificationsDialog = () => {
    setShowDeleteSpecificationsDialog(true);
  };
  const closeDeleteSpecificationsDialog = () => {
    setShowDeleteSpecificationsDialog(false);
  };
  const [
    showFetchSpecificationsDialog,
    setShowFetchSpecificationsDialog,
  ] = useState(false);
  const openFetchSpecificationsDialog = () => {
    setShowFetchSpecificationsDialog(true);
  };
  const closeFetchSpecificationsDialog = () => {
    setShowFetchSpecificationsDialog(false);
  };
  const value = {
    ids,
    setIds,
    parentId,
    setParentId,
    // queryParams,
    // setQueryParams,
    initSpecification,
    selectedId,
    showEditSpecificationDialog,
    openEditSpecificationDialog,
    openNewSpecificationDialog,
    closeEditSpecificationDialog,
    showDeleteSpecificationDialog,
    openDeleteSpecificationDialog,
    closeDeleteSpecificationDialog,
    showDeleteSpecificationsDialog,
    openDeleteSpecificationsDialog,
    closeDeleteSpecificationsDialog,
    showFetchSpecificationsDialog,
    openFetchSpecificationsDialog,
    closeFetchSpecificationsDialog,
  };

  return (
    <SpecificationsUIContext.Provider value={value}>
      {children}
    </SpecificationsUIContext.Provider>
  );
}
