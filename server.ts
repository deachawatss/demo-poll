import { createServer } from "node:http";

import next from "next";

import { setupWebSocket } from "./src/lib/ws";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port });
const handle = app.getRequestHandler();

async function startServer(): Promise<void> {
  await app.prepare();

  const server = createServer((request, response) => {
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

void startServer();
