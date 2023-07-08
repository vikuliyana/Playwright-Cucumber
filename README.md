# Test project
This project is written for verivox.de. All requirements for the project are placed in the Requirements.pdf file.

## Technologies
Project is created with:
* Playwright (TS binding)
* Cucumber (BDD)

## Project structure
* src -> Contains all the features & Typescript code
* test-results -> Contains reports in json and html format

## Get Started
### Set up
1. Clone the project
2. Open the project in the terminal
3. `npm config set strict-ssl false` to explicitly disable SSL
4. `sh get-started.sh` to automatically install all dependencies, browser engines, run test scripts in the selected environment (you will be asked which browser engine you would like to use to run tests) and open html report
To run tests in multiple browser engines manually:
* `BROWSER=chrome npm test run` to run tests using chrome
* `BROWSER=firefox npm test run` to run tests using firefox
* `BROWSER=webkit npm test run` to run tests using webkit


### Project structure
1. src\test\features -> Contains feature file
2. src\test\steps -> Contains all step definitions
3. src\hooks\hooks.ts -> Browser setup
4. src\hooks\pageFixture.ts -> Simple way to share the page objects to steps
5. src\helper\env -> Multiple environments are handled
6. src\helper\types -> To get environment code suggesstions
7. src\test-reports -> Contains html and json test report
8. cucumber.json -> Cucumber config
9. package.json -> Contains all the dependencies
