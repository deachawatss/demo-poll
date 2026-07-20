import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import next from "next";

import { broadcastDirect, internalBroadcastPath, setupWebSocket } from "./src/lib/ws";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port });
const handle = app.getRequestHandler();

async function startServer(): Promise<void> {
  await app.prepare();

  const server = createServer(async (request, response) => {
    if (isInternalBroadcastRequest(request)) {
      await handleInternalBroadcast(request, response);
      return;
    }

    void handle(request, response);
  });

  setupWebSocket(server);
  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`,
    );
  });
}

function isInternalBroadcastRequest(request: IncomingMessage): boolean {
  const address = request.socket.remoteAddress;

  return (
    request.method === "POST" &&
    request.url === internalBroadcastPath &&
    (address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1")
  );
}

async function handleInternalBroadcast(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  let body = "";

  for await (const chunk of request) {
    body += chunk;
  }

  try {
    broadcastDirect(JSON.parse(body) as object);
    response.writeHead(204).end();
  } catch {
    response.writeHead(400).end();
  }
}

void startServer();
