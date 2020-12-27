import axios from "axios";

// export const LOGIN_URL = "api/auth/login";
export const baseApiUrl = process.env.REACT_APP_API_URL_REMOTE;
// export const baseApiUrl = process.env.REACT_APP_API_URL;
export const LOGIN_URL = baseApiUrl+"/api/User/Token";
export const ME_URL = baseApiUrl+"/api/User/Get/22";
export const REGISTER_URL = baseApiUrl+"/api/auth/register";
export const REQUEST_PASSWORD_URL =baseApiUrl+ "/api/auth/forgot-password";

// export const ME_URL = "api/me";

export function login(username, password) {
  return axios.post(LOGIN_URL, null, { params: {
    username,
    password
  }})
  // return axios.post(LOGIN_URL, { username, password });
  // return axios.post(LOGIN_URL);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // return axios.get(ME_URL);
  return axios.get(ME_URL);
}

// {}
// "filter": {"title": "fff"},
// "orderCluase": "title desc,id asc ",
// "pageNumber": 1,
// "pageSize": 10,
// "skipCount": 0,
// "sortField": "title",
// "sortOrder": "asc",
// "takeCount": 5,
// "whereClause": "title.contains(@0)",
// "whereClauseParameters": ["fff"]
// }


// {
//   "whereClause": "title.contains(@0)",
//   "whereClauseParameters": [
//     "fff"
//   ],
//   "orderClause": "title desc,id asc",
//   "skipCount": 0,
//   "takeCount": 5,
// "filter": {"title": "fff"},
// "pageNumber": 1,
//  "pageSize": 10

// }