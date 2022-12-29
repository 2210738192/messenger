"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var express = require("express");
var http_1 = require("http");
var app = express();
var port = process.env.PORT || 5000;
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    console.log("index requested");
});
app.get("/:dir", function (req, res) {
    res.sendFile(__dirname + "/" + req.params.dir);
    console.log("dir " + req.params.dir + " requested");
});
app.listen(port);
var server = (0, http_1.createServer)();
var wss = new ws_1.WebSocketServer({ server: server });
server.listen(8080);
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
