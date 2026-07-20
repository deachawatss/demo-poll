import type { Server as HttpServer } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import { getVotes } from "./db";

let socketServer: WebSocketServer | undefined;

export function setupWebSocket(server: HttpServer): void {
  socketServer = new WebSocketServer({ server });

  socketServer.on("connection", (socket) => {
    socket.send(JSON.stringify({ type: "results", votes: getVotes() }));
  });
}

export function broadcastDirect(message: string): void {
  if (!socketServer) {
    return;
  }

  for (const client of socketServer.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}
