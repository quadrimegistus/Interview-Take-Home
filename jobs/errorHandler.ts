const errorHandler = (error) => {
    const fs = require('fs');
    const inquirer = require('../services/inquirer.ts');
    const errorDataLog = '../data/error-logs/error-log.txt';
    const errorData = {
        date: new Date(),
        text: error.message,
        stack: error.stack
    };
    console.log(`\nThere has been an error: ${error.name}\nCode: ${error.code}\nMessage: ${
      error.message
    }\nThis will be logged in your local error-logs directory.`);
    fs.appendFile(errorDataLog, errorData, (error) => {
        if (error) {
          return console.log('Yo dawg, there was an error in your error handler.');
        }
        console.log('Attempting to reinitialize main menu.');
        inquirer();
    });
};

module.exports = errorHandler;
