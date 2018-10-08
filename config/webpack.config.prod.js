const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { baseWebpackConfig } = require('./webpack.config.base');
const paths = require('./paths');

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        // 删除注释
        removeComments: true,
        // 去除多余的空格
        collapseWhitespace: true,
        // removeRedundantAttributes: true,
        // useShortDoctype: true,
        // removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // keepClosingSlash: true,
        // minifyJS: true,
        // minifyCSS: true,
        // minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: cssFilename,
      chunkFilename: '[id].css',
    }),
  ],
});

module.exports = webpackConfig;
