// next.config.js
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
module.exports = withPlugins([
  [
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
  ],
  [withTypescript],
]);
