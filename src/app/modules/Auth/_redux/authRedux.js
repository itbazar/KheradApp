import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  MenuLoaded: "[Load Menu] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "v706-Kherad-auth", whitelist: ["user", "authToken","menu"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user,menu } = action.payload;
        return { ...state, user, menu };
      }

      case actionTypes.MenuLoaded: {
        const { menu } = action.payload;
        return { ...state, menu };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: (user,menu) => ({ type: actionTypes.UserLoaded, payload: { user,menu } }),
  // fulfillMenu: menu => ({ type: actionTypes.MenuLoaded, payload: { menu } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    // const { data: user } = yield getUserByToken();

    const user = JSON.parse(sessionStorage.authUser);
    const menu = JSON.parse(sessionStorage.authUserMenu);
    
    yield put(actions.fulfillUser(user,menu));
  //  yield put(actions.fulfillMenu(menu));
  });
}
