"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
// import express from "express";
var express = require("express");
var app = express();
var path = require('path');
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    console.log("index requested");
});
app.get("/:dir", function (req, res) {
    res.sendFile(__dirname + "/" + req.params.dir);
    console.log("dir " + req.params.dir + " requested");
});
app.listen(443);
var wss = new ws_1.WebSocketServer({ port: 5000 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                // let message = {
                //   "data": data,
                //   "time": new Date(),
                //   "user": data.user
                // }
                client.send(data, { binary: isBinary });
            }
        });
    });
});
