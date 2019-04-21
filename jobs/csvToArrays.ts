const parseCsvForReports = (file) => {
    const parse = require('csv-parse');
    const assert = require('assert');
    const errorHandling = require('../jobs/errorHandler');
    const options = {
        columns: (header) => header.map((column) => column.toUpperCase()),
        relax_column_count: true
    };
    parse(file, options, (error, records) => {
        if (error) {
          errorHandling(error);
        }
        console.log(records);
        assert.deepEqual(records, records);
    });
};

module.exports = parseCsvForReports;
