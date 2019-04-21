/* eslint-disable no-console */
/*
  Creating a CLI with Node for NDSL data reporting:
  MVP:
  (1): Prompt the user to select a desired history file from the local folder.
    (A): Display the start and end dates of the information in the file.
    (B): Display total number of days of data in that history file.
  (2): Prompt the user to select a specific battery, then prompt the user to select a specific string within that battery.
    (A): Print to console a table:
        Displaying the Ohmic value of each containiner on a specific string on the final day of the selected history file.
        Displaying the highest Ohmic value from the period, and the date it occurred for each container.
        Displaying the highest Ohmic growth from one day to the next as a percentage.
  (3): Allow the user to export requested report to a .CSV file.

  This is a minimum viable product of the provided take home. It presumes many things about the local environment, and does not take into consideration variance from the expected.

  Realistic, production level enhancements would be things like:
  Checking that directories are structured as they're expected to be, that the files follow our predefined, expected naming conventions, etc.
  Ensure that upon history file receipt/read that the data aligns with our expectations of what the data should be (data integrity protocols).
  Institute file modes following the 0-7 three digit pattern and permit read/write/execute capabilities based on authorization level of the accessing user.
  Implement at minimum basic barriers of data security with username/password establishment through inquirer, passport and a database. Write to new file logs of who accessed what file, when it was accessed, if changes were made and what they were.
  Create version control system / data backups in the event of a .destroyAll() scenario.
  Export of information and logs to a cloud store, or alternate on-site location.
  Deployment to some source of automation, or container service, to more easily handle new histories as they're received and further automate reporting processes.
  Migrate data dump sources away from .CSV to .JSON for minimalist enhancements on system read time.
  Ability to sort tables within the CLI based on a user input preference.
  Incorporate front-end architecture for easier reporting access for anyone who may not be CLI savvy, but needs to view these reports.
*/
require('dotenv').config();
const express = require('express');
const pgPool = require('./db/pgdb.ts');
const inquirer = require('./services/inquirer.ts');
const errorHandling = require('./jobs/errorHandler.ts');
const jsonHandling = require('./jobs/fileToJson.ts');
const readFileHandling = require('./jobs/readFile.ts');
const readDirHandling = require('./jobs/readDirectory.ts');
const dbase = require('./models/index.ts');

const PORT = process.env.PORT || process.env.LOCALPORT;
const app = express();
const syncOptions = {
    force: process.env.FORCE_SYNC === 'true'
};

app.use(express.static('jobs'));

// Catch 404 and forward to error handler:
if (app.get('env') !== 'development') {
  app.use((req, res, next) => {
      const err = new Error(`Not Found: ${req.url}`);
      next(err);
  });
}

if (app.get('env') === 'test') {
  syncOptions.force = true;
}

dbase.sequelize.sync(syncOptions).then(() => {
    if (app.get('env') !== 'test' || syncOptions.force) {
      require('./db/seed.ts')(dbase);
    }

    // Connect to local database on application load:
    pgPool.connect((error) => {
        errorHandling(error);
    });

    app.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}`);
    });
});

// Invoking inquirer on Node app spin-up to prompt the user for selections on what tasks they would like to perform:
inquirer();
