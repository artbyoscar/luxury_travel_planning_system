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
  env: {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyDlgw_1pSa0YbfsNRNDcG6IhS7QZ3NgMqY',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'luxurytravelplanningsystem.firebaseapp.com',
    REACT_APP_FIREBASE_PROJECT_ID: 'luxurytravelplanningsystem',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'luxurytravelplanningsystem.appspot.com',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '106801283144',
    REACT_APP_FIREBASE_APP_ID: '1:106801283144:web:8a5a84fef8119b0ff7187d',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'G-EQM5PW6Q44'
  }
});