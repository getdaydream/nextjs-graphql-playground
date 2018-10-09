const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

// common function to get style loaders
const getStyleLoaders = (cssLoaderOptions, preProcessor) => {
  const loaders = [
    isProduction
      ? MiniCssExtractPlugin.loader
      : require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssLoaderOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          // PostCSS plugin that tries to fix all of flexbug's issues
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

module.exports = {
  getStyleLoaders,
};
