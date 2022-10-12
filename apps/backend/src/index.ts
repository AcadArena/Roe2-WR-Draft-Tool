import { createServer } from "http";
import { initExpressServer } from "./express.server";
import { initAssets } from "./lib/initAssets";
import { TickManager } from "./lib/ticker";
import { initWsServer } from "./ws.server";

const app = initExpressServer();
const server = createServer(app);
const io = initWsServer(server);
export const tickManager = new TickManager(io);

async function main() {
  await initAssets();

  const port = 1338;
  server.listen(port, () => {
    if (server.address() === null) {
      return console.log("Failed to start server.");
    }
    console.log(`Server started on port ${port}`);
  });
}

main().then();
