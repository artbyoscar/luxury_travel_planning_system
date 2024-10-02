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
    REACT_APP_FIREBASE_API_KEY: 'your-api-key',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'your-auth-domain',
    REACT_APP_FIREBASE_PROJECT_ID: 'your-project-id',
    REACT_APP_FIREBASE_STORAGE_BUCKET: 'your-storage-bucket',
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: 'your-messaging-sender-id',
    REACT_APP_FIREBASE_APP_ID: 'your-app-id',
    REACT_APP_FIREBASE_MEASUREMENT_ID: 'your-measurement-id'
  }
});