"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.findArticles = exports.decodeAndSavePdfInDB = void 0;
var articles_data_1 = require("../datas/articles.data");
var fs_1 = __importDefault(require("fs"));
var pdf_engine_1 = require("./pdf.engine");
var environment_1 = __importDefault(require("../environment"));
var _a = require("util"), TextDecoder = _a.TextDecoder, TextEncoder = _a.TextEncoder;
var decodeAndSavePdfInDB = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var file, articles, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = fs_1["default"].readFileSync(path);
                return [4 /*yield*/, (0, pdf_engine_1.transformPDFtoWordsArray)(file)];
            case 1:
                articles = _a.sent();
                i = 1;
                _a.label = 2;
            case 2:
                if (!(i < articles.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, articles_data_1.create)(articles[i])];
            case 3:
                _a.sent();
                i++;
                return [3 /*break*/, 2];
            case 4:
                console.log('save files in db done');
                return [2 /*return*/, true];
        }
    });
}); };
exports.decodeAndSavePdfInDB = decodeAndSavePdfInDB;
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
var findArticles = function (words) { return __awaiter(void 0, void 0, void 0, function () {
    var articles, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, articles_data_1.findOnText)(words)];
            case 1:
                articles = _a.sent();
                value = '';
                //@ts-ignore
                articles.forEach(function (a) {
                    value += "<div>\n        <a href=\"".concat(environment_1["default"].url, "/deputie?Nom=").concat(removeAccents(a.Nom.toUpperCase()), "&Prenom=").concat(removeAccents(a.Prenom.toLowerCase()), "\">Nom: ").concat(a.Nom, " Pr\u00E9nom: ").concat(a.Prenom, "</a>\n         => \n         <a href=\"").concat(environment_1["default"].url, "/article?id=").concat(a._id, "\">ARTICLE</a>\n         </div>");
                });
                return [2 /*return*/, value];
        }
    });
}); };
exports.findArticles = findArticles;
