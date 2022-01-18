"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import { removeAccents } from "../engine/words.utils.engine" ;
var fs_1 = __importDefault(require("fs"));
// const cleanBson = ( bsonFile : any ) : any => {
//     console.log(bsonFile) ;
//     removeAccents(bsonFile) ;
//     return null ;
// }
/**
 *
 */
var cleanAndSaveBson = function (path) {
    var file = fs_1["default"].readFileSync(path);
    console.log(file);
};
cleanAndSaveBson("/files/deputes.bson");
