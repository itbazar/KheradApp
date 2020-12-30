export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );
  

  axios.interceptors.response.use(response => {
    return response;
  }, error => {
      console.log("error.response");
      if (error.message === "Network Error") {
        console.log(JSON.stringify(error));
        return "Network Error";
      }
      // debugger;
      console.log(JSON.stringify(error.response));
  //  console.log(error.response);
      // if (error.response.status === 401) {
      //   window.localStorage.clear();
      //   window.location.replace("/auth/login");
      // }
 });
}
