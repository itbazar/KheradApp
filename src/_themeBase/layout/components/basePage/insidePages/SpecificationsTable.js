// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as actions from "../../../../../app/actions/generalActions";
import * as uiHelpers from "./SpecificationsUIHelper";
import { Pagination } from "../../../../../_themeBase/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../../../_themeBase/_helpers";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";
import { useFilterObjectsUIContext } from "../pages/FilterObjectsUIContext";

export function SpecificationsTable({reduxName,api,columns}) {
  // Specs UI Context
  const specsUIContext = useSpecificationsUIContext();
  const filterUIContext = useFilterObjectsUIContext();


  const specsUIProps = useMemo(() => {
    return {
      queryParams: filterUIContext.queryParams,
      setQueryParams: filterUIContext.setQueryParams,
      openEditSpecificationDialog: specsUIContext.openEditSpecificationDialog,
      openDeleteSpecificationDialog:
        specsUIContext.openDeleteSpecificationDialog,
      ids: specsUIContext.ids,
      setIds: specsUIContext.setIds,
      parentId: specsUIContext.parentId,
    };
  }, [specsUIContext,filterUIContext]);

  // Specs Redux state
  // Getting curret state of products list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state[reduxName] }),
    shallowEqual
  );
  const { totalCount, entities, listLoading,name } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    specsUIProps.setIds([]);
    dispatch(
      actions.fetchObjects(api,name,specsUIProps.queryParams)//,specsUIProps.parentId
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specsUIProps.queryParams, dispatch, specsUIProps.parentId]);

 
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: specsUIProps.queryParams.pageSize,
    page: specsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bordered={false}
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  specsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: specsUIProps.ids,
                  setIds: specsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
