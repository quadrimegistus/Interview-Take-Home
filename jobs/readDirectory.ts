const directoryReader = (directory) => {
    const fs = require('fs');
    const errorHandling = require('../jobs/errorHandler');
    return fs.readdir(directory, 'utf8', (error, data) => {
        if (error) {
          errorHandling(error);
        }
        console.log(`Directories: ${data}`);
        return data;
    });
};

module.exports = directoryReader;
