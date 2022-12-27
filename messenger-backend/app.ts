import {WebSocket, WebSocketServer} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

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