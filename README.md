# Test project
All requirements for the project are placed in the Requirements.pdf file.

## Technologies
Project is created with:
* Playwright (TS binding)
* Cucumber (BDD)

## Project structure
* .github -> Contains yml file to execute the tests in GitHub Actions
* src -> Contains the features & Typescript code
* test-results -> Contains reports in json and html format

## Get Started
### Set up
1. Clone or download the project
2. Open the project in the bash terminal
3. `npm config set strict-ssl false` to explicitly disable SSL
4. `sh get-started.sh` to automatically install all dependencies, browser engines, run test scripts in the selected environment (you will be asked which browser engine you would like to use to run tests) and open html report
    
To run tests in multiple browser engines manually:
* `BROWSER=chrome npm test run` to run tests using chrome
* `BROWSER=firefox npm test run` to run tests using firefox
* `BROWSER=webkit npm test run` to run tests using webkit  
  
For running only one scenario in the feature file:  
`BROWSER=<YourBrowserEngine> npm run test <FullPathOfFeature>.feature:<LineOfCodeWhereScenarioIsDefined>`  
  
To enable headed mode:  
1. Go to the directory `src\helper\browsers`
2. Edit the `BrowserManager.ts` file and set the headless param to false: `headless: false`  

### Folder structure
1. `src\pages` -> All the pages (UI screen)
2. `src\test\features` -> Contains feature file
3. `src\test\steps` -> Contains all step definitions
4. `src\hooks\hooks.ts` -> Browser setup
5. `src\hooks\pageFixture.ts` -> To share the page objects to steps
6. `src\helper\env` -> Multiple environments are handled
7. `src\helper\types` -> To get environment code suggesstions
8. `src\test-reports` -> Contains html and json test report
9. `cucumber.json` -> Cucumber config
10. `package.json` -> Contains all the dependencies
