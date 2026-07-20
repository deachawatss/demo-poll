import { createServer } from "node:http";

import next from "next";

import { broadcastDirect, setupWebSocket } from "./src/lib/ws";

const port = Number.parseInt(process.env.PORT ?? "3100", 10);
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  const server = createServer((request, response) => {
    if (request.method === "POST" && request.url === "/_internal/broadcast") {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        broadcastDirect(body);
        response.writeHead(200);
        response.end("ok");
      });
      return;
    }

    void handle(request, response);
  });

  setupWebSocket(server);
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
