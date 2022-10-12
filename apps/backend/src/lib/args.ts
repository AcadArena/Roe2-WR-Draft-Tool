import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
const args = yargs(hideBin(process.argv))
  .options({
    skipDownload: { type: "boolean" },
    useCache: { type: "boolean", default: true },
  })
  .parseSync();

export default args;
