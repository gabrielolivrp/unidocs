import { base64ToFile } from "./base64-to-file";

const joinFile = (chunks: string[], filename: string, mimetype: string): File => {
  const base64 = chunks.join("");
  return base64ToFile(base64, filename, mimetype);
};

export { joinFile };
