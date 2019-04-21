const csvWriter = (file) => {
    const fs = require('fs');
    const errorHandling = require('./jobs/errorHandler');
    const stringify = require('csv-stringify');
    stringify(file, (error, data) => {
        const newCsvFile = `../data/csv/${file}.csv`;
        if (error) {
          errorHandling(error);
        }
        data.split(',');
        fs.appendFileSync(newCsvFile, data);
        return initialize();
    });
};

module.exports = csvWriter;
