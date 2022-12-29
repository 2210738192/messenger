import {WebSocket, WebSocketServer} from 'ws';
// import express from "express";
import express = require("express");
import {readFile} from 'fs/promises';


const app = express();
const path = require('path');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log("index requested");
})
app.get("/:dir", (req, res) => {
  res.sendFile(__dirname + "/" + req.params.dir);
  console.log("dir " + req.params.dir + " requested");
})
app.listen(443);

const wss = new WebSocketServer({ port: 5000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
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