import "dotenv/config";
import { createServer } from "http";
import { initExpressServer } from "./express.server";
import { initAssets } from "./lib/initAssets";
import { sanitizedChampList } from "./lib/sanitizedChampList";
import { TickManager } from "./lib/ticker";
import { initWsServer } from "./ws.server";

const app = initExpressServer();
const server = createServer(app);
const io = initWsServer(server);
export const tickManager = new TickManager(io);
const port = process.env.PORT || 1338;

async function main() {
  server.listen(port, () => {
    if (server.address() === null) {
      return console.log("Failed to start server.");
    }
    console.log(`Server started on port ${port}`);
  });
  await initAssets();
  io.emit("champs", sanitizedChampList());
}

main();
