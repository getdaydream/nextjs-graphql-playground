const webpack = require('webpack');
const merge = require('webpack-merge');

const { baseWebpackConfig } = require('./webpack.config.base');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [],
});

module.exports = webpackConfig;
