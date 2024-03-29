import * as cookieParser from 'cookie-parser';
import * as next from 'next';
import * as express from 'express';
import { routes } from './routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: false });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.use(handler);

    server.listen(3001, (err: any) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3001');
    });
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
