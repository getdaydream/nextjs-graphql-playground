import axios from 'axios';

const request = axios.create({
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [
    data =>
      // `transformRequest` allows changes to the request data before it is sent to the server
      // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // console.log(data);
      data,
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    data => {
      // Do whatever you want to transform the data
      const res = JSON.parse(data);
      return res;
    },
  ],
});

// before request hook
request.interceptors.request.use(config => config, err => Promise.reject(err));

// receive response hook
request.interceptors.response.use(
  response => response.data,
  error => {
    if (error) {
      // ....
    }
    return Promise.reject(error.response);
  },
);

export default request;
