const log = console.log;
// __dirname is not definedin esmodule
// log(__dirname);

import path from "path";
// log(import.meta);
import { fileURLToPath } from "url";
// const filename = fileURLToPath(import.meta.url);
// log("filename ||", filename);
// const dirname = path.dirname(filename);
// log("dirname ||", dirname);
// const backendPath = path.join(dirname, "backend", "server.js");

// log(backendPath);

// const dirname = fileURLToPath(import.meta.dirname);

// log("DIRECT DIRNAME >> *", dirname);

log(process.cwd());
