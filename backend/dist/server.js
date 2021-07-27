"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var console_1 = require("console");
var http_1 = __importDefault(require("http"));
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        //named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
var onError = function (error) {
    if (error.svscall !== "listen") {
        throw error;
    }
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " Requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
var onListening = function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    console_1.debug("Listening on " + bind);
};
var port = normalizePort(process.env.PORT || "3000");
app_1.app.set('port', port);
var server = http_1.default.createServer(app_1.app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
