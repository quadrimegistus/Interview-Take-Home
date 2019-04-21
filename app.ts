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

const inquirer = require('inquirer');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const assert = require('assert');
const pool = require('./db/pgdb.js');
const errorHandling = require('./jobs/errorHandler');
const jsonHandling = require('./jobs/fileToJson');
const readFileHandling = require('./jobs/readFile');
const readDirHandling = require('./jobs/readDirectory');

require('dotenv').config(); // Environment variables - credentials for Postgres.

// Connect to local database on application load:
pool.connect((error) => {
    errorHandling(error);
});

// Invoking inquirer on Node app spin-up to prompt the user for selections on what tasks they would like to perform:
function initialize() {
    inquirer
      .prompt({
          name: 'initializer',
          type: 'list',
          message: 'Welcome back! What would you like to do today?',
          choices: ['Manage Local Data Files']
      })
      .then((input) => {
          const chosenOption = input.initializer;
          if (chosenOption === 'Manage Local Data Files') {
            console.log(`You chose: ${chosenOption}. \n`);
            const homeDirectory = './data';
            const dirArray = readDirHandling(homeDirectory);
            selectDir(dirArray);
          }
      });
}

function selectDir(directoryArray) {
    inquirer
      .prompt({
          type: 'list',
          name: 'selectDataDir',
          message: 'Please select a directory to manage its local files.',
          choices: directoryArray
      })
      .then((input) => {
          const chosenDir = input.selectDataDir;
          console.log(`You chose: ${chosenDir}. \n`);
          const fileArray = readDirHandling(chosenDir);
          selectFile(fileArray);
      });
}

function selectFile(fileArray) {
    inquirer
      .prompt({
          type: 'list',
          name: 'selectDataFile',
          message: 'Please select a file to manage its content.',
          choices: fileArray
      })
      .then((input) => {
          const chosenFile = input.selectDataFile;
          console.log(`You chose: ${chosenFile}. \n`);
          manageFile(chosenFile);
      });
}

function manageFile(file) {
    inquirer
      .prompt({
          type: 'list',
          name: 'manageDataFile',
          message: `Please select an action for ${file}`,
          choices: ['READ', 'EXPORTTOJSON', 'EXPORTTOCSV', 'DELETE']
      })
      .then((input) => {
          const chosenAction = input.manageDataFile;
          if (chosenAction === 'DELETE') {
            console.log(`You chose: ${chosenAction}. \n`);
            console.log(`Sorry, you don't have the permissions to delete ${file}. \n Returning to main menu.`);
            return initialize();
          }
          if (chosenAction === 'READ') {
            console.log(`You chose: ${chosenAction}. \n`);
            return readFileHandling(file);
          }
          if (chosenAction === 'EXPORTTOJSON') {
            console.log(`You chose: ${chosenAction}. \n`);
            return jsonHandling(file);
          }
          if (chosenAction === 'EXPORTTOCSV') {
            console.log(`You chose: ${chosenAction}. \n`);
          }
      });
}
