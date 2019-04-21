import { getMaxListeners } from 'cluster';

/* eslint-disable func-names */
/* eslint-disable no-console */
const pg = require('pg');
const credentials = require('../config/credentials');
const errorHandling = require('../jobs/errorHandler');

// Config creation to configure pooling behavior and client options:
const config = {
    user: credentials.username,
    database: credentials.database,
    password: credentials.password,
    host: credentials.server,
    port: process.env.port || 5432,
    max: 10, // Max allowed clients in the pool.
    idleTimeoutMillis: 30000 // Idle allowance before connection closure.
};

// Initializes a connection pool:
const pool = new pg.Pool(config);

// Error handling and logging:
pool.on('error', (error, client) => {
    errorHandling(error);
});

module.exports.pool = pool;

// Exporting the query method for passing queries to the pool:
module.exports.query = function (text, values, callback) {
    console.log(`Query: \n ${text} \n ${values}`);
    return pool.query(text, values, callback);
};

// Client checking for multiple operations, such as a transaction:
module.exports.connect = function (callback) {
    return pool.connect(callback);
};
