import React from "react";
import { Route,useHistory  } from "react-router-dom";
import { ObjectsLoadingDialog } from "./objects-loading-dialog/ObjectsLoadingDialog";
import { ObjectDeleteDialog } from "./object-delete-dialog/ObjectDeleteDialog";
import { ObjectsDeleteDialog } from "./objects-delete-dialog/ObjectsDeleteDialog";
import { ObjectsFetchDialog } from "./objects-fetch-dialog/ObjectsFetchDialog";
import { ObjectsUpdateStatusDialog } from "./objects-update-status-dialog/ObjectsUpdateStatusDialog";
import { ObjectsCard } from "./ObjectsCard";
import { ObjectsUIProvider } from "./ObjectsUIContext";


const ObjectsPage = ({ basePath,api,currentState, columns,initialFilter,prepareFilter,filterFields,filterInitialValues,selectFilter }) => {
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
      <ObjectsCard api={api} basePath={basePath} currentState={currentState} columns={columns} prepareFilter={prepareFilter} filterFields={filterFields} filterInitialValues={filterInitialValues}/>
    </ObjectsUIProvider>
  );
}

export default ObjectsPage;




// const ObjectsPage = ({ history,path , newPath,editPath,deletePath,fetchPath,deleteAllPath,updatePath }) => {
//   const ObjectsUIEvents = {
//     newObjectButtonClick: () => {
//       history.push("/e-commerce/products/new");
//     },
//     openEditObjectPage: (id) => {
//       history.push(`/e-commerce/products/${id}/edit`);
//     },
//     openDeleteObjectDialog: (id) => {
//       history.push(`/e-commerce/products/${id}/delete`);
//     },
//     openDeleteObjectsDialog: () => {
//       history.push(`/e-commerce/products/deleteObjects`);
//     },
//     openFetchObjectsDialog: () => {
//       history.push(`/e-commerce/products/fetch`);
//     },
//     openUpdateObjectsStatusDialog: () => {
//       history.push("/e-commerce/products/updateStatus");
//     },
//   };

//   return (
//     <ObjectsUIProvider ObjectsUIEvents={ObjectsUIEvents}>
//       {/* <ObjectsLoadingDialog /> */}
//       <Route path="/e-commerce/products/deleteObjects">
//         {({ history, match }) => (
//           <ObjectsDeleteDialog
//             show={match != null}
//             onHide={() => {
//               history.push("/e-commerce/products");
//             }}
//           />
//         )}
//       </Route>
//       <Route path="/e-commerce/products/:id/delete">
//         {({ history, match }) => (
//           <ObjectDeleteDialog
//             show={match != null}
//             id={match && match.params.id}
//             onHide={() => {
//               history.push("/e-commerce/products");
//             }}
//           />
//         )}
//       </Route>
//       <Route path="/e-commerce/products/fetch">
//         {({ history, match }) => (
//           <ObjectsFetchDialog
//             show={match != null}
//             onHide={() => {
//               history.push("/e-commerce/products");
//             }}
//           />
//         )}
//       </Route>
//       <Route path="/e-commerce/products/updateStatus">
//         {({ history, match }) => (
//           <ObjectsUpdateStatusDialog
//             show={match != null}
//             onHide={() => {
//               history.push("/e-commerce/products");
//             }}
//           />
//         )}
//       </Route>
//       <ObjectsCard />
//     </ObjectsUIProvider>
//   );
// }

// export default ObjectsPage;
