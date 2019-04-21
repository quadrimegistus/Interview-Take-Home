const fileReader = (file) => {
    const fs = require('fs');
    const errorHandling = require('./jobs/errorHandler');
    return fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
          errorHandling(error);
        }
        console.log(`Contents of ${file}: \n`);
        const readableData = data.split(', ');
        console.log(readableData);
        console.log(' ');
        console.log('Returning to main menu.');
        return initialize();
    });
};

module.exports = fileReader;
