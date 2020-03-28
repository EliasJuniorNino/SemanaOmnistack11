const knex = require('knex');
const configuration = require('../../knexfile');

const environment = process.env.environment || 'production'

const connection = knex(configuration[environment]);

module.exports = connection;