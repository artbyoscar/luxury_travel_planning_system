// cypress.config.js

const { defineConfig } = require('cypress');
const webpackConfig = require('./webpack.config.cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});