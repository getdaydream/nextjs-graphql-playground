import axios from 'axios';
import store from '../store/index'

const http = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [
    data => {
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // console.log(data);
      return JSON.stringify(data)
    }
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    data => {
      // Do whatever you want to transform the data
      const res = JSON.parse(data);
      console.log(res);
      return res;
    },
  ],
  timeout: 5000,
});

// before request hook
http.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      Object.assign(config, {
        headers: {
          Authorization: `Bearer ${store.state.token}`
        }
      });
    }
    return config;
  }
  ,
  err => Promise.reject(err)
);
// receive response hook
http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error.response);
  },
);

export { http };
