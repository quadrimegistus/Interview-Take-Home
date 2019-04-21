/* eslint-disable func-names */
/* eslint-disable no-console */
const pg = require('pg');
const credentials = require('../config/config.ts');
require('dotenv').config();

// Config creation to configure pooling behavior and client options:
const dbConfig = {
    user: credentials.username,
    database: credentials.database,
    password: credentials.password,
    host: credentials.server,
    port: process.env.port || credentials.port,
    max: 10, // Max allowed clients in the pool.
    idleTimeoutMillis: 30000 // Idle allowance before connection closure.
};

// Initializes a connection pool:
const pool = new pg.Pool(dbConfig);

// Error handling and logging:
pool.on('error', (error, client) => {
    const errorHandling = require('../jobs/errorHandler.ts');
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
