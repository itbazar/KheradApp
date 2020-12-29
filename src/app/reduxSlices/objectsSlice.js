import {createSlice} from "@reduxjs/toolkit";

const initialObjectsState = {
  //name:"",
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  objectForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};


export const objectsSlice = ({ name = "" }) => {
  const slice = createSlice(
      {
      name: name,
      initialState:{name , ...initialObjectsState},
      reducers: {
        catchError: (state, action) => {
          state.error = `${action.type}: ${action.payload.error}`;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = false;
          } else {
            state.actionsLoading = false;
          }
        },
        startCall: (state, action) => {
          state.error = null;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = true;
          } else {
            state.actionsLoading = true;
          }
        },
        // getObjectById
        objectFetched: (state, action) => {
          state.actionsLoading = false;
          state.objectForEdit = action.payload.objectForEdit;
          state.error = null;
        },
        // findObjects
        objectsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.error = null;
          state.entities = entities;
          state.totalCount = totalCount;
        },
         // fetchAllObjects
         allObjectsFetched: (state, action) => {
          const { entities } = action.payload;
          state.error = null;
          state.entities = entities;
        },
        // createObject
        objectCreated: (state, action) => {
          state.actionsLoading = false;
          state.error = null;
          state.entities.push(action.payload.object);
        },
        // updateObject
        objectUpdated: (state, action) => {
          state.error = null;
          state.actionsLoading = false;
          state.entities = state.entities.map(entity => {
            if (entity.id === action.payload.object.id) {
              return action.payload.object;
            }
            return entity;
          });
        },
        // deleteObject
        objectDeleted: (state, action) => {
          state.error = null;
          state.actionsLoading = false;
          state.entities = state.entities.filter(el => el.id !== action.payload.id);
        },
        // deleteObjects
        objectsDeleted: (state, action) => {
          state.error = null;
          state.actionsLoading = false;
          state.entities = state.entities.filter(
            el => !action.payload.ids.includes(el.id)
          );
        },
        // objectsUpdateState
        objectsStatusUpdated: (state, action) => {
          state.actionsLoading = false;
          state.error = null;
          debugger;
          const { ids, isDeleted } = action.payload;
          state.entities = state.entities.map(entity => {
            if (ids.findIndex(id => id === entity.id) > -1) {
              entity.isDeleted = isDeleted;
            }
            return entity;
          });
        }
      }
    });
  return slice;
};

// export const objectsSlice = createSlice(
//   {
//   name: "objects",
//   initialState: initialObjectsState,
//   reducers: {
//     catchError: (state, action) => {
//       state.error = `${action.type}: ${action.payload.error}`;
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = false;
//       } else {
//         state.actionsLoading = false;
//       }
//     },
//     startCall: (state, action) => {
//       state.error = null;
//       if (action.payload.callType === callTypes.list) {
//         state.listLoading = true;
//       } else {
//         state.actionsLoading = true;
//       }
//     },
//     // getObjectById
//     objectFetched: (state, action) => {
//       state.actionsLoading = false;
//       state.objectForEdit = action.payload.objectForEdit;
//       state.error = null;
//     },
//     // findObjects
//     objectsFetched: (state, action) => {
//       const { totalCount, entities } = action.payload;
//       state.listLoading = false;
//       state.error = null;
//       state.entities = entities;
//       state.totalCount = totalCount;
//     },
//     // createObject
//     objectCreated: (state, action) => {
//       state.actionsLoading = false;
//       state.error = null;
//       state.entities.push(action.payload.object);
//     },
//     // updateObject
//     objectUpdated: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.map(entity => {
//         if (entity.id === action.payload.object.id) {
//           return action.payload.object;
//         }
//         return entity;
//       });
//     },
//     // deleteObject
//     objectDeleted: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(el => el.id !== action.payload.id);
//     },
//     // deleteObjects
//     objectsDeleted: (state, action) => {
//       state.error = null;
//       state.actionsLoading = false;
//       state.entities = state.entities.filter(
//         el => !action.payload.ids.includes(el.id)
//       );
//     },
//     // objectsUpdateState
//     objectsStatusUpdated: (state, action) => {
//       state.actionsLoading = false;
//       state.error = null;
//       const { ids, status } = action.payload;
//       state.entities = state.entities.map(entity => {
//         if (ids.findIndex(id => id === entity.id) > -1) {
//           entity.status = status;
//         }
//         return entity;
//       });
//     }
//   }
// });


