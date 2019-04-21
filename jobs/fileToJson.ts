const jsonWriter = (file) => {
    const fs = require('fs');
    const csvtojson = require('csvtojson');
    const errorHandling = require('./jobs/errorHandler');
    const options = {}; // Can be passed to configure headers for new JSON pairs. Currently unused.
    csvtojson(options)
      .fromFile(file)
      .on('done', (error) => {
          if (error) {
            errorHandling(error);
          }
          console.log(`CSV parsing completed for ${file}. \n Now writing parsed information to JSON...\n`);
      })
      .then((jsonObj) => {
          const jsonLog = `../data/json/${file}.json`;
          // Write JSON payload to local data directory:
          jsonObj.forEach((item) => {
              const writeData = {
                  date: new Date(),
                  text: JSON.stringify(item, null, 1)
              };
              fs.appendFileSync(jsonLog, writeData);
          });
          console.log(`New JSON write completed successfully for original file: ${file}. A copy has been saved to your local JSON data directory.`);
          console.log('Attempting to reinitialize main menu.');
          return initialize();
      });
};
module.exports = jsonWriter;
