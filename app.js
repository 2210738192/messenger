"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Server } = require('ws');
const ws_1 = __importDefault(require("ws"));
const express = require('express');
const https = require('http');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const server = https.createServer(app).listen(PORT);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log("index requested");
});
app.get("/:dir", (req, res) => {
    res.sendFile(__dirname + "/" + req.params.dir);
    console.log("dir " + req.params.dir + " requested");
});
const wss = new Server({ server });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
