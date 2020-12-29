import axios from "axios";
// import baseApiUrl from "./BaseService";

const baseApiUrl = process.env.REACT_APP_API_URL;


export function createObject(API_URL,object) {
  return axios.post(`${baseApiUrl}/${API_URL}/create`,object);
}

export function getAllObjects(API_URL) {
  return axios.get(`${baseApiUrl}/${API_URL}/getAll`);
}

export function getObjectById(API_URL,objectId) {
  return axios.get(`${baseApiUrl}/${API_URL}/get/${objectId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findObjects(API_URL,queryParams) {
  return axios.post(`${baseApiUrl}/${API_URL}/query`,queryParams);
}

// UPDATE => PUT: update the procuct on the server
export function updateObject(API_URL,object) {
  // return axios.put(`${baseApiUrl}/${API_URL}/update/${object.id}`, object);
  return axios.put(`${baseApiUrl}/${API_URL}/update`, object);
}

// UPDATE Status
export function updateStatusForObjects(API_URL,ids, isDeleted) {
  if(isDeleted)//status=isdeleted=true => deleteRange
  {
    return axios.put(`${baseApiUrl}/${API_URL}/SoftDeleteRange`, { idList:ids });
  }
  else{//status=isdeleted=false => RecoverDeleteRange
    return axios.put(`${baseApiUrl}/${API_URL}/RecoverDeleteRange`, { idList:ids });
  }
  
  // return axios.post(`${baseApiUrl}/${API_URL}/updateStatusForObjects`, {
  //   ids,
  //   status
  // });
}

// DELETE => delete the object from the server
export function deleteObject(API_URL,objectId) {
  // return axios.delete(`${baseApiUrl}/${API_URL}/SoftDelete/${objectId}`);
  return axios.put(`${baseApiUrl}/${API_URL}/SoftDelete/${objectId}`);
}

// DELETE Objects by ids
export function deleteObjects(API_URL,ids) {
  return axios.put(`${baseApiUrl}/${API_URL}/SoftDeleteRange`, { idList:ids });
}
