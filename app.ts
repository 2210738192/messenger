import { WebSocket, WebSocketServer } from 'ws';
import express = require("express");
let http =  require("http");

const app = express();
let port = process.env.PORT || 5000
var server = http.createServer(app)
server.listen(port)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("index requested");
})
app.get("/:dir", (req, res) => {
  res.sendFile(__dirname + "/" + req.params.dir);
  console.log("dir " + req.params.dir + " requested");
})
app.listen(port);

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});