const { defineConfig } = require('cypress');
const path = require('path');
const webpackConfig = require('./webpack.config');  // Assuming you renamed it to webpack.config.js

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: webpackConfig,  // Explicitly passing Webpack config
    },
    specPattern: 'src/components/tests/cy.tests/**/*.cy.{js,jsx,ts,tsx}', // Adjusted pattern
  },
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyDlgw_1pSa0YbfsNRNDcG6IhS7QZ3NgMqY',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'luxurytravelplanningsystem.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'luxurytravelplanningsystem',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'luxurytravelplanningsystem.appspot.com',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '106801283144',
    REACT_APP_FIREBASE_APP_ID: '1:106801283144:web:8a5a84fef8119b0ff7187d',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-EQM5PW6Q44'
  },
  setupNodeEvents(on, config) {
    // Debug log to verify that Cypress loads the correct Webpack config
    console.log('Using Webpack config:', path.resolve(__dirname, './webpack.config.js'));
    return config;
  }
});
