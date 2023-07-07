#!/bin/bash

npm i

npx playwright install

echo "Which search engine would you like to use to run tests?"

echo -n "chrome/webkit/firefox: "
read -r searchEngine

BROWSER=$searchEngine npm test run

start ./test-results/cucumber-report.html
