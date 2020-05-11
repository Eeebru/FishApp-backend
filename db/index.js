const {Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'fishes_app',
  password: '[eebru-eebru]g=',
  port: 5432
});

client.connect();

module.exports = client;