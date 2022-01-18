"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var index_data_1 = require("./datas/index.data");
console.log('Hello world!');
(0, index_data_1.init)();
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1["default"])();
var example_route_1 = __importDefault(require("./routes/example.route"));
exports.app.use(example_route_1["default"]);
console.log('Hello world!');
