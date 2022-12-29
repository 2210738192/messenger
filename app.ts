// import { WebSocket, WebSocketServer } from 'ws';
// import express = require("express");
// import { createServer } from 'https';

// const app = express();
// let port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//   console.log("index requested");
// })
// app.get("/:dir", (req, res) => {
//   res.sendFile(__dirname + "/" + req.params.dir);
//   console.log("dir " + req.params.dir + " requested");
// })
// app.listen(port);

// const server = createServer();
// const wss = new WebSocketServer({server: server});
// server.listen(3000);

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });

// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express();
// server.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//   console.log("index requested");
// })
// server.get("/:dir", (req, res) => {
//   res.sendFile(__dirname + "/" + req.params.dir);
//   console.log("dir " + req.params.dir + " requested");
// })
// server.listen(PORT);

const { Server, WebSocket } = require('ws');

// const wss = new Server({ server });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });

const express = require('express')
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = express();
const PORT = process.env.PORT || 3000;

const server = https.createServer(options, app).listen(PORT);

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html");
  console.log("index requested");
})
app.get("/:dir", (req: any, res: any) => {
  res.sendFile(__dirname + "/" + req.params.dir);
  console.log("dir " + req.params.dir + " requested");
})

const wss = new Server({ server });

wss.on('connection', function connection(ws:any) {
  ws.on('message', function message(data: any, isBinary:any) {
    wss.clients.forEach(function each(client:any) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});