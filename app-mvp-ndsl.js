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

  Battery -> String -> Container; Naming convention will be reflected as: Battery 1, String 1, Container 1 = B1S1C1
  Table Formatting: Row = B1S1C1; Column 1 = Ohmic Value on Final Day; Column 2 = Highest Ohmic Value; Column 3 = Date of Occurrance; Column 4 = Highest Ohmic Growth Percentage.

  This is a minimum viable product of the provided take home. It presumes files exists as they're named, in the expected directories, among many other things that are not taken into consideration here, but should be in an actual production environment.

  Realistic, production level enhancements would be things like:
  Include things like reading the directory to ensure the files actually exist, that directories are structured as they're expected to be, that the files follow our predefined, expected naming conventions, etc.
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
const columnify = require('columnify');
const parse = require('csv-parse/lib/sync');
const assert = require('assert');
const csv = require('csvtojson');

const dataDumpDir = 'data';
const dataFiles = fs.readdirSync(dataDumpDir, 'utf8');
const currentCsvFile = 'history2010.csv';
const csvFile = `./data/${currentCsvFile}`;
const toJsonFile = `./data/${currentCsvFile}.json`;
const converter = {
    ignoreColumns: /(PC|PT|CU|DCM|CH|TY|CT|TP|VF|VT|ZI|HY|Blk Fr|Blk To|Ver|HV|LV|HZ|LZ|HT|LT|HC|LC|SP1|Hydgn|Blank|Current|Temp)/
};

// Read data dump directory on application start, and render files within directory

csv(converter)
  .fromFile(csvFile)
  .on('done', (error) => {
      if (error) {
        console.log(`Code: ${error.code}\n Message: ${error.message}`);
      } else {
        console.log('All parsing completed.');
      }
  })
  .then((jsonObj) => {
      console.log(jsonObj);
      // Write JSON payload to newly created file:
      jsonObj.forEach((item, index, array) => {
          fs.appendFileSync(toJsonFile, JSON.stringify(item, null, 1));
      });
  });

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath)

/*
let dataToWrite;
*/

// Calling on the file system to read the data within the user selected file from the inquirer prompts, then print that information to console:
/* fs.readFile('./data/history2010.csv', 'utf8', (error, data) => {
   if (error) throw error
   const dataArr = data.split(',')
   console.log(dataArr)
}) */

// Calling on the file system to write data as CSV based on user preference selection during inquirer prompts:
/* const writeData = fs.writeFile('form-tracking/formList.csv', dataToWrite, 'utf8', (error) => {
    if (error) throw error;
    console.log('New Report File Created!');
}); */

// Invoking inquirer on Node app initiation to prompt user for selections on what information they would like to view:
/*
inquirer
  .prompt([
      {
          type: 'list',
          name: 'selectableHistoryFiles',
          message: 'Please select a history file to view its contents.',
          choices: csvFiles
      },
      {
          type: 'list',
          name: 'selectableBatteries',
          message: 'Please select the battery for which you would like a report.',
          choices: ['Battery1', 'Battery2', 'Battery3']
      },
      {
          type: 'list',
          name: 'selectableStrings',
          message: 'Please select the string for which you would like a report.',
          choices: ['String1', 'String2', 'String3']
      }
  ])
  .then((userSelections) => {});
*/
