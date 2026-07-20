import type { Server as HttpServer } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

import { getVotes } from "./db";

export const internalBroadcastPath = "/_internal/broadcast";

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

// broadcastDirect: only called from server.ts via the loopback handler
// where webSocketServer is guaranteed to be the real instance.
export function broadcastDirect(data: object): void {
  if (!webSocketServer) return;
  const message = JSON.stringify(data);
  for (const client of webSocketServer.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

// broadcast: called from Next.js API routes. Always uses loopback POST
// because API routes may load a separate module instance where
// webSocketServer is undefined (path alias vs relative import).
export async function broadcast(data: object): Promise<void> {
  const port = process.env.PORT ?? "3000";
  const response = await fetch(`http://127.0.0.1:${port}${internalBroadcastPath}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Could not broadcast vote update");
  }
}
