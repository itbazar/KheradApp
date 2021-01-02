import React from "react";
import { Route,useHistory  } from "react-router-dom";
import { ObjectsLoadingDialog } from "./objects-loading-dialog/ObjectsLoadingDialog";
import { ObjectDeleteDialog } from "./object-delete-dialog/ObjectDeleteDialog";
import { ObjectsDeleteDialog } from "./objects-delete-dialog/ObjectsDeleteDialog";
import { ObjectsFetchDialog } from "./objects-fetch-dialog/ObjectsFetchDialog";
import { ObjectsUpdateStatusDialog } from "./objects-update-status-dialog/ObjectsUpdateStatusDialog";
import { ObjectsCard } from "./ObjectsCard";
import { ObjectsUIProvider } from "./ObjectsUIContext";


const ObjectsPage = ({haveGeneralAction=true,isFullAccess,basePath,api,currentState, columns,initialFilter,prepareFilter,filterFields,filterInitialValues,selectFilter }) => {
  //console.log("basePath : " + basePath)
 
  const history = useHistory()
  //console.log("history : " + history)
  const ObjectsUIEvents = {
    newObjectButtonClick: () => {
      history.push(`${basePath}/new`);
    },
    openEditObjectPage: (id) => {
      history.push(`${basePath}/${id}/edit`);
    },
    openDeleteObjectDialog: (id) => {
      history.push(`${basePath}/${id}/delete`);
    },
    openDeleteObjectsDialog: () => {
      history.push(`${basePath}/deleteAll`);
    },
    openFetchObjectsDialog: () => {
      history.push(`${basePath}/fetch`);
    },
    openUpdateObjectsStatusDialog: () => {
      history.push(`${basePath}/updateStatus`);
    },
  };

  return (
    <ObjectsUIProvider ObjectsUIEvents={ObjectsUIEvents} initialFilter={initialFilter} selectFilter={selectFilter}>
      <ObjectsLoadingDialog listLoading={currentState.listLoading}/>
      <Route path={`${basePath}/deleteAll`}>
        {({ history, match }) => (
          <ObjectsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push(basePath);
            }}
            ObjectsDeleteDialog={ObjectsDeleteDialog}
            currentState={currentState}
            api={api}
          />
        )}
      </Route>
      <Route path={`${basePath}/:id/delete`}>
        {({ history, match }) => (
          <ObjectDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(basePath);
            }}
            ObjectsDeleteDialog={ObjectsDeleteDialog}
            currentState={currentState}
            api={api}
          />
        )}
      </Route>
      <Route path={`${basePath}/fetch`}>
        {({ history, match }) => (
          <ObjectsFetchDialog
            show={match != null}
            onHide={() => {
              history.push(basePath);
            }}
            currentState={currentState}
            api={api}
          />
        )}
      </Route>
      <Route path={`${basePath}/updateStatus`}>
        {({ history, match }) => (
          <ObjectsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push(basePath);
            }}
            currentState={currentState}
            api={api}
          />
        )}
      </Route>
      <ObjectsCard haveGeneralAction={haveGeneralAction} isFullAccess={isFullAccess}  api={api} basePath={basePath} currentState={currentState} columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>
    </ObjectsUIProvider>
  );
}

export default ObjectsPage;


