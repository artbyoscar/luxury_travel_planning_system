// webpack.config.cypress.js

const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('react-scripts/config/webpack.config')('development');

module.exports = merge(commonConfig, {
  resolve: {
    alias: {
      // Add any custom aliases if needed
    },
  },
  module: {
    rules: [
      // Add any custom loaders if needed
    ],
  },
});