import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  transformRequest: [
    data => {
      return JSON.stringify(data);
    },
  ],
  withCredentials: true,
});

// before request hook
axios.interceptors.request.use(config => config, err => Promise.reject(err));

// receive response hook
axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response);
  },
);

export default axios;
