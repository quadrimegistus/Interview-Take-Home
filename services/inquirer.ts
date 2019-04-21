const inquiring = () => {
    const inquirer = require('inquirer');
    // Delivers the main menu to the user for the selectable interaction options, then calls the succeeding action function:
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
                console.log(`You selected: ${chosenOption}. \n`);
                const homeDirectory = './data';
                const dirArray = readDirHandling(homeDirectory);
                selectDir(dirArray);
              }
          });
    }

    // Delivers choices to the user for the selectable data directories, then calls the succeeding action function:
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
              console.log(`You selected: ${chosenDir}. \n`);
              const fileArray = readDirHandling(chosenDir);
              selectFile(fileArray);
          });
    }

    // Delivers choices to the user for the selectable data files, then calls the succeeding action function:
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
              console.log(`You selected: ${chosenFile}. \n`);
              manageFile(chosenFile);
          });
    }

    // Delivers choices to the user for management of the selected data file, then calls the corresponding action function:
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
                console.log(`You selected: ${chosenAction}. \n`);
                console.log(`Sorry, you don't have the permissions to delete ${file}. \n Returning to main menu.`);
                return initialize();
              }
              if (chosenAction === 'READ') {
                console.log(`You selected: ${chosenAction}. \n`);
                return readFileHandling(file);
              }
              if (chosenAction === 'EXPORTTOJSON') {
                console.log(`You selected: ${chosenAction}. \n`);
                return jsonHandling(file);
              }
              if (chosenAction === 'EXPORTTOCSV') {
                console.log(`You selected: ${chosenAction}. \n`);
              }
          });
    }
};

module.exports = inquiring;
