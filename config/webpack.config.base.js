const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { getStyleLoaders } = require('./utils');
const paths = require('./paths');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const baseWebpackConfig = {
  entry: paths.appEntry,
  output: {
    filename: '[name].js',
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
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
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
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
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
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
  ],
};

module.exports = { baseWebpackConfig };
