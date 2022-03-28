"use strict";
exports.__esModule = true;
var filePath = process.env.FILE_PATH;
var articles_engine_1 = require("../engine/articles.engine");
if (filePath) {
    // console.log('filePath', filePath);
    var articles = (0, articles_engine_1.decodeAndSavePdfInDB)(filePath);
}
else {
    console.log('Need a variable FILE_PATH in environment.');
}
console.log('run articles');
