import axios from 'axios';

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [
    data => {
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // console.log(data);
      return JSON.stringify(data);
    },
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    data => {
      // Do whatever you want to transform the data
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        parsedData = undefined;
      }
      if (parsedData) data = parsedData;
      return data;
    },
  ],
  timeout: 5000,
});

// receive response hook
request.interceptors.response.use(
  response => response,
  error => {
    if (error) {
      console.log(error.response.status);
    }
    return Promise.reject(error.response);
  },
);

export { request };
