"use strict";
exports.__esModule = true;
var filePath = process.env.FILE_PATH;
var articles_engine_1 = require("../engine/articles.engine");
var index_data_1 = require("../datas/index.data");
var _a = require("util"), TextDecoder = _a.TextDecoder, TextEncoder = _a.TextEncoder;
if (filePath) {
    (0, index_data_1.init)().then(function () {
        var articles = (0, articles_engine_1.decodeAndSavePdfInDB)(filePath);
    })["catch"](function (e) {
        console.log('error init db');
    });
    // console.log('filePath', filePath);
}
else {
    console.log('Need a variable FILE_PATH in environment.');
}
console.log('run articles');
