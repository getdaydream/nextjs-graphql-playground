const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const { getStyleLoaders } = require('./utils');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const webpackDevConfig = {
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
  entry: paths.appEntry,
  output: {
    filename: 'bundle.js',
    path: paths.appBuild,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      // By default we support CSS Modules with the extension .module.css
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: true,
          // TODO: getCSSModuleLocalIdent ?
          // getLocalIdent: getCSSModuleLocalIdent,
        }),
      },
      // Opt-in support for SASS (using .scss or .sass extensions).
      // Chains the sass-loader with the css-loader and the style-loader
      // to immediately apply all styles to the DOM.
      // By default we support SASS Modules with the
      // extensions .module.scss or .module.sass
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
      },
      // Adds support for CSS Modules, but using SASS
      // using the extension .module.scss or .module.sass
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: true,
            // getLocalIdent: getCSSModuleLocalIdent,
          },
          'sass-loader',
        ),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // transforms files into base64 URIs if file size is lower then the limit
              // otherwise, use file-loader as fallback
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Enable HMR, 当前只对css有效；ts会刷新页面
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      webpackDevConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      webpackDevConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                webpackDevConfig.devServer.host
              }:${port}`,
            ],
          },
        }),
      );

      resolve(webpackDevConfig);
    }
  });
});
