// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../app/actions/generalActions";
import * as uiHelpers from "../ObjectsUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_themeBase/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_themeBase/_partials/controls";
import { useObjectsUIContext } from "../ObjectsUIContext";
import { useFilterObjectsUIContext } from "../FilterObjectsUIContext";


export const ObjectsTable = ({ haveGeneralAction=true , isFullAccess, api, columns, currentState }) => {
  // console.log("currentState : " + currentState)
  // console.log("api : " + api)
  // console.log("actions : " + actions)
  // console.log("sliceActions : " + sliceActions)
  // console.log("callTypes : " + callTypes)
  // Objects UI Context //isFullAccess={isFullAccess}


  const objectsUIContext = useObjectsUIContext();
  const filterUIContext = useFilterObjectsUIContext();


  const objectsUIProps = useMemo(() => {
    return {
      ids: objectsUIContext.ids,
      setIds: objectsUIContext.setIds,
      queryParams: filterUIContext.queryParams,
      setQueryParams: filterUIContext.setQueryParams,
      openEditObjectPage: objectsUIContext.openEditObjectPage,
      openDeleteObjectDialog: objectsUIContext.openDeleteObjectDialog,
    };
  }, [objectsUIContext,filterUIContext]);


  const { menuList } = useSelector(
    (state) => ({ menuList: state.auth.menu }),
    shallowEqual
  );

  useEffect(() => {
    // columns[columns.length-1].formatExtraData = {
    //   openEditObjectPage: objectsUIProps.openEditObjectPage,
    //   openDeleteObjectDialog: objectsUIProps.openDeleteObjectDialog,
    // };
    
    if (haveGeneralAction) {
      if (columns.find(q => q.dataField === "action"))
      columns.pop()
      if (isFullAccess) {
        columns.push({
          dataField: "action",
          text: columnFormatters.translateByMessageId("MODULES.GENERAL.ACTION"),
          // text: "Actions",
          formatter: columnFormatters.ActionsColumnFormatter,
          formatExtraData: {
            openEditObjectPage: objectsUIProps.openEditObjectPage,
            openDeleteObjectDialog: objectsUIProps.openDeleteObjectDialog,
          },
          classes: "text-right pr-0",
          headerClasses: "text-right pr-3",
          style: {
            minWidth: "100px",
          },
        })
      }
      else {
        columns.push({
          dataField: "action",
          text: columnFormatters.translateByMessageId("MODULES.GENERAL.ACTION"),
          // text: "Actions",
          formatter: columnFormatters.ViewColumnFormatter,
          formatExtraData: {
            openEditObjectPage: objectsUIProps.openEditObjectPage,
          },
          classes: "text-right pr-0",
          headerClasses: "text-right pr-3",
          style: {
            minWidth: "100px",
          },
        })
      }
    }

  }, []);

  // // Getting curret state of objects list from store (Redux)
  // const { currentState } = useSelector(
  //   (state) => ({ currentState: state.objects }),
  //   shallowEqual
  // );
  const { totalCount, entities, listLoading, name } = currentState;

  // Objects Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    objectsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchObjects(api, name, objectsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsUIProps.queryParams, dispatch]);
  // Table columns

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: objectsUIProps.queryParams.pageSize,
    page: objectsUIProps.queryParams.pageNumber,
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
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  objectsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: objectsUIProps.ids,
                  setIds: objectsUIProps.setIds,
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
