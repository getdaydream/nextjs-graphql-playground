import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://192.168.100.39:3000',
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
