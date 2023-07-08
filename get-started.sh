#!/bin/bash

npm i

npx playwright install

echo "Which browser engine would you like to use to run tests?"

echo -n "chrome/webkit/firefox: "
read -r browserEngine

BROWSER=$browserEngine npm test run

start ./test-results/cucumber-report.html
