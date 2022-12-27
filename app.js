"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                let message = JSON.parse(data.toString());
                message.time = new Date();
                
                // let message = {
                //   "data": data,
                //   "time": new Date(),
                //   "user": data.user
                // }
                client.send(JSON.stringify(message), { binary: isBinary });
            }
        });
    });
});
