const errorHandler = (error) => {
    const fs = require('fs');
    const errorDataLog = '../data/error-logs/error-log.txt';
    const errorData = {
        date: new Date(),
        text: error.message,
        stack: error.stack
    };
    console.log('There has been an error: \n');
    console.log(`Code: ${error.code}\n Message: ${error.message} \n`);
    console.log('This will be logged in your local error-logs directory.');
    fs.appendFileSync(errorDataLog, errorData);
    console.log('Attempting to reinitialize main menu.');
    return initialize();
};

module.exports = errorHandler;
