// next.config.js
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([
  [withTypescript],
  [
    withCSS,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
  ],
]);
