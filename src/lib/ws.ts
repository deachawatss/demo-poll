import type { Server as HttpServer } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import { getVotes } from "./db";

let webSocketServer: WebSocketServer | undefined;

export function setupWebSocket(server: HttpServer): void {
  const socketServer = new WebSocketServer({ server });
  webSocketServer = socketServer;

  socketServer.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "results", votes: getVotes() }));

    socket.on("message", (data, isBinary) => {
      for (const client of socketServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      }
    });
  });
}

export function broadcast(data: object): void {
  const socketServer = webSocketServer;
  if (!socketServer) {
    return;
  }

  const message = JSON.stringify(data);

  for (const client of socketServer.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}
