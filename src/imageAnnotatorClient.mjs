import { ImageAnnotatorClient } from "@google-cloud/vision";

import { fileURLToPath } from "url";
import path from "path";

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// Get the current module's directory path
const __dirname = path.dirname(__filename);

const imageAnnotatorClient = new ImageAnnotatorClient({
    keyFilename: __dirname + "/../config/tgin13-5fb20b297444.json",
});

export default imageAnnotatorClient;
