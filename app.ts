const { Server } = require('ws');
import WebSocket from 'ws';
const express = require('express')
const https = require('http');
const app = express();
const PORT = process.env.PORT || 3000;

const server = https.createServer(app).listen(PORT);

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