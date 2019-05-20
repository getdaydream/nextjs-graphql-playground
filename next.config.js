// next.config.js
const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

module.exports = withPlugins([[withTypescript], [withSass], [withCSS]]);
