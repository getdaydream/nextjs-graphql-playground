import cookie, { CookieParseOptions } from 'cookie';
import http from 'http';

export const parseCookies = (
  req?: http.IncomingMessage,
  options: CookieParseOptions = {},
) => {
  let documentCookie: string = '';
  if (typeof window !== 'undefined') {
    documentCookie = document.cookie;
  }
  return cookie.parse(req ? req.headers.cookie || '' : documentCookie, options);
};
