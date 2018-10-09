const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { baseWebpackConfig } = require('./webpack.config.base');
const paths = require('./paths');

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  module: {},
  plugins: [
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
  optimization: {
    minimizer: [
      // 压缩js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      // 压缩CSS
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});

module.exports = webpackConfig;
