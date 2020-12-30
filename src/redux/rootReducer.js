import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { objectsSlice } from "../app/reduxSlices/objectsSlice";


export const rootReducer = combineReducers({
  auth: auth.reducer,
  univercities: objectsSlice({name :"univercities"}).reducer,
  dorms: objectsSlice({name :"dorms"}).reducer,
  blocks: objectsSlice({name :"blocks"}).reducer,
  rooms: objectsSlice({name :"rooms"}).reducer,
  collages: objectsSlice({name :"collages"}).reducer,
  fields: objectsSlice({name :"fields"}).reducer,
  groups: objectsSlice({name :"groups"}).reducer,
  subGroups: objectsSlice({name :"subGroups"}).reducer,
  devices: objectsSlice({name :"devices"}).reducer,
  deviceTypes: objectsSlice({name :"deviceTypes"}).reducer,
  terms: objectsSlice({name :"terms"}).reducer,
  years: objectsSlice({name :"years"}).reducer,
  semesters: objectsSlice({name :"semesters"}).reducer,
  grades: objectsSlice({name :"grades"}).reducer,
  accounts: objectsSlice({name :"accounts"}).reducer,
  banks: objectsSlice({name :"banks"}).reducer,
  shifts: objectsSlice({name :"shifts"}).reducer,
  shiftAssigns: objectsSlice({name :"shiftAssigns"}).reducer,
  workTimes: objectsSlice({name :"workTimes"}).reducer,

});

export function* rootSaga() {
  yield all([auth.saga()]);
}
