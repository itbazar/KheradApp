import * as requestFromServer from "../services/PublicCrudService";
import {objectsSlice, callTypes} from "../reduxSlices/objectsSlice";

//const {actions} = objectsSlice({name:"products"});

export const fetchObjects = (API_URL,sliceName,queryParams) => dispatch => {
 
  const {actions} = objectsSlice({name:sliceName});
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findObjects(API_URL,queryParams)
    .then(response => {
      console.log("response.data :")
      console.log(response.data.data)
      const { totalCount, result:entities } = response.data.data;

      dispatch(actions.objectsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find objects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchObject = (API_URL,sliceName,id) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  if (!id) {
    return dispatch(actions.objectFetched({ objectForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getObjectById(API_URL,id)
    .then(response => {
      const object = response.data.data;
      dispatch(actions.objectFetched({ objectForEdit: object }));
    })
    .catch(error => {
      error.clientMessage = "Can't find object";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteObject = (API_URL,sliceName,id) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteObject(API_URL,id)
    .then(response => {
      dispatch(actions.objectDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete object";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createObject = (API_URL,sliceName,objectForCreation) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createObject(API_URL,objectForCreation)
    .then(response => {
      const object = response.data.data;
      dispatch(actions.objectCreated({ object }));
    })
    .catch(error => {
      error.clientMessage = "Can't create object";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateObject = (API_URL,sliceName,object) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateObject(API_URL,object)
    .then(() => {
      dispatch(actions.objectUpdated({ object }));
    })
    .catch(error => {
      error.clientMessage = "Can't update object";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateObjectsStatus = (API_URL,sliceName,ids,status) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForObjects(API_URL,ids, status)
    .then(() => {
      dispatch(actions.objectsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update objects status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteObjects = (API_URL,sliceName,ids) => dispatch => {
  const {actions} = objectsSlice({name:sliceName});

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteObjects(API_URL,ids)
    .then(() => {
      dispatch(actions.objectsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete objects";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
