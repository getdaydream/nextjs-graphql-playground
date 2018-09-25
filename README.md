This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## 1. 基于`create-react-app`的修改

### 1.1 添加`react-hot-loader`

1.  Run `npm run eject`
2.  Install React Hot Loader (`npm install --save-dev react-hot-loader`)
3.  In `config/webpack.config.dev.js`, add `'react-hot-loader/babel'` to Babel
    loader configuration. The loader should now look like:

```js
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
      plugins: ['react-hot-loader/babel'],
    },
  }
```

4.  Mark your App (`src/App.js`) as _hot-exported_:

```js
// ./containers/App.js
import React from 'react';
import { hot } from 'react-hot-loader';

const App = () => <div>Hello World!</div>;

export default hot(module)(App);
```
