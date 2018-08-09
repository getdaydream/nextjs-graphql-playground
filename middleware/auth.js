import axios from 'axios';
import cookie from 'cookie';

export default function({ req }) {
  axios.defaults.headers = {};
  if (process.client || !req.headers.cookie) {
    return;
  }
  let cookies;
  try {
    cookies = cookie.parse(req.headers.cookie);
  } catch (error) {
    return;
  }
  if (cookies.token) {
    axios.defaults.headers = {
      Authorization: 'Bearer ' + cookies.token,
    };
  }
}
