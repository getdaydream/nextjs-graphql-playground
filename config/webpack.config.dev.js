const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const { baseWebpackConfig } = require('./webpack.config.base');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    quiet: true,
    // Enable HMR
    hot: true,
    host: HOST,
  },

  module: {},
  plugins: [
    // Enable HMR, 当前只对css有效；ts会刷新页面
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`,
            ],
          },
        }),
      );

      resolve(devWebpackConfig);
    }
  });
});
