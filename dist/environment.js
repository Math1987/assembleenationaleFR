"use strict";
exports.__esModule = true;
var environment = {
    mode: "dev",
    db: "mongodb://localhost:27017/assemblee_nationale"
};
if (process.env.MODE === "prod") {
    environment.mode = "prod";
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/assemblee_nationale?retryWrites=true&w=majority";
}
exports["default"] = environment;
