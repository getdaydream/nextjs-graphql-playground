// stops mobx from listening to ssr rendered components
// ssr only mounts components once
const { useStaticRendering } = require('mobx-react');
const next = require('next');
const express = require('express');

useStaticRendering(true);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3001, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3001');
    });
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
