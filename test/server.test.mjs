import assert from "node:assert/strict";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";
import WebSocket from "ws";

const port = 3102;
const serverUrl = `ws://127.0.0.1:${port}`;
let server;

function startServer() {
  return new Promise((resolve, reject) => {
    server = spawn("npm", ["run", process.env.SERVER_SCRIPT ?? "start"], {
      detached: true,
      env: { ...process.env, PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";

    const timeout = setTimeout(() => {
      reject(new Error(`Server did not start within 30 seconds:\n${output}`));
    }, 30_000);

    const observeOutput = (chunk) => {
      output += chunk.toString();
      if (output.includes(`http://localhost:${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    };

    server.stdout.on("data", observeOutput);
    server.stderr.on("data", observeOutput);
    server.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Server exited before starting (code ${code}):\n${output}`));
    });
  });
}

function connectClient() {
  const client = new WebSocket(serverUrl);
  return {
    client,
    opened: once(client, "open"),
    message: once(client, "message").then(([data]) => data.toString()),
  };
}

before(async () => {
  await startServer();
});

after(() => {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {}
  }
});

test("accepts WebSocket clients and broadcasts a message to every connection", async () => {
  const page = await fetch(`http://127.0.0.1:${port}`);
  assert.equal(page.status, 200);

  const first = connectClient();
  const second = connectClient();

  await Promise.all([first.opened, second.opened]);
  const firstInitial = JSON.parse(await first.message);
  const secondInitial = JSON.parse(await second.message);
  assert.equal(firstInitial.type, "results");
  assert.ok(Array.isArray(firstInitial.votes));
  assert.deepEqual(secondInitial, firstInitial);

  const broadcast = JSON.stringify({ type: "results", votes: [] });
  const firstBroadcast = once(first.client, "message").then(([data]) => data.toString());
  const secondBroadcast = once(second.client, "message").then(([data]) => data.toString());

  first.client.send(broadcast);

  assert.equal(await firstBroadcast, broadcast);
  assert.equal(await secondBroadcast, broadcast);

  first.client.close();
  second.client.close();
});
