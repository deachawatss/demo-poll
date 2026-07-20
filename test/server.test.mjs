import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { rm } from "node:fs/promises";
import { after, before, test } from "node:test";
import WebSocket from "ws";

const port = 3100;
const databasePath = `/tmp/quick-poll-server-test-${process.pid}.db`;
let server;

before(async () => {
  await rm(databasePath, { force: true });
  server = spawn("npm", ["run", "start"], {
    detached: true,
    env: {
      ...process.env,
      NODE_ENV: "production",
      POLL_DB_PATH: databasePath,
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Server did not start:\n${output}`));
    }, 30_000);

    const observe = (chunk) => {
      output += chunk.toString();
      if (output.includes(`http://localhost:${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    };

    server.stdout.on("data", observe);
    server.stderr.on("data", observe);
    server.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Server exited before startup (${code}):\n${output}`));
    });
  });
});

after(() => {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {}
  }
});

test("serves HTTP and sends vote counts after a WebSocket handshake", async () => {
  const response = await fetch(`http://localhost:${port}`);
  assert.equal(response.status, 200);

  const socket = new WebSocket(`ws://localhost:${port}`);
  await once(socket, "open");
  const [message] = await once(socket, "message");
  const payload = JSON.parse(message.toString());

  assert.equal(payload.type, "results");
  assert.deepEqual(payload.votes, []);
  socket.close();
});
