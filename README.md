# API FOR SEARCHING AND FILTERING DEPUTIES IN FRENCH ASSEMBLEE NATIONALE

Provide http routes for searching and filtering deputies with customs fields from key-words or sentences found in the articles they published.
Provide also scripts to restructure datas from deputies bson files and to store and asignate articles from pdf official files of Assemblée National parutions. 

## TECHNO

<em>nodejs, express, mongodb, pdf-parse</em>

## USAGE 

1. Clone the repository on your machine.
2. Open a terminal and move to the root of the project in the folder created by cloning repository.
3. In the terminal, type "npm i" and press enter (you have to get [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [nodejs](https://nodejs.org/en/download/) installed).
3. In the terminal, type "npm run test" and press enter for launching mocha test or "npm run build" to create a dist folder containing the javascript native code.
4. Be shure to have [mongodb](https://www.mongodb.com/) installed on your local machine and accessible for dev mode.