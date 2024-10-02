const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'luxury_travel_planning_system',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

