"use strict";
exports.__esModule = true;
exports.returnFirstWord = exports.removeAccents = void 0;
var removeAccents = function (str) {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g,
        /[\310-\313]/g, /[\350-\353]/g,
        /[\314-\317]/g, /[\354-\357]/g,
        /[\322-\330]/g, /[\362-\370]/g,
        /[\331-\334]/g, /[\371-\374]/g,
        /[\321]/g, /[\361]/g,
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }
    return '' + str;
};
exports.removeAccents = removeAccents;
var returnFirstWord = function (str) {
    return '' + str;
};
exports.returnFirstWord = returnFirstWord;
