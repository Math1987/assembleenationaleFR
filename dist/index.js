"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var index_data_1 = require("./datas/index.data");
var articles = __importStar(require("./engine/articles.engine"));
var articles_data_1 = require("./datas/articles.data");
var deputies_data_1 = require("./datas/deputies.data");
(0, index_data_1.init)();
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1["default"])();
var example_route_1 = __importDefault(require("./routes/example.route"));
exports.app.get('', function (req, res) {
    res.status(200).send('Assemblée Nationale recherche députés et articles API.');
});
exports.app.use(example_route_1["default"]);
exports.app.get("/loadArticles", function (req, res) {
    if (req.query['path']) {
        articles.decodeAndSavePdfInDB(req.query['path']).then(function (r) {
            res.status(200).send('file loaded');
        })["catch"](function (err) {
            res.status(500).send("error");
        });
    }
    else {
        res.status(400).send('need path');
    }
});
exports.app.get("/find", function (req, res) {
    if (req.query['words']) {
        articles.findArticles(req.query['words']).then(function (ars) {
            console.log(ars);
            res.status(200).send(ars);
        })["catch"](function (err) {
            res.status(50).send('error fetching articles.');
        });
    }
    else {
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }
});
exports.app.get("/article", function (req, res) {
    if (req.query['id']) {
        (0, articles_data_1.readOne)(req.query['id']).then(function (article) {
            res.status(200).send(article);
        })["catch"](function (err) {
            res.status(500).send('error fetching article.');
        });
    }
    else {
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }
});
exports.app.get("/deputie", function (req, res) {
    if (req.query['Nom'] && req.query['Prenom']) {
        (0, deputies_data_1.readOneByDatas)({ Nom: req.query['Nom'], Prenom: req.query['Prenom'] }).then(function (deputie) {
            var txt = "";
            for (var _i = 0, _a = Object.keys(deputie); _i < _a.length; _i++) {
                var key = _a[_i];
                //@ts-ignore
                txt += "<div>" + key + " : " + deputie[key] + "</div>";
            }
            res.status(200).send(txt);
        })["catch"](function (err) {
            res.status(500).send('error fetching article.');
        });
    }
    else {
        res.status(400).send('need words. Exemple : /find?words=agriculteurs');
    }
});
exports.app.listen(6060);
exports.app.listen(80);
console.log('Hello world!');
