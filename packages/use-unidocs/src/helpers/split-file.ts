import { readFile } from "./read-file";

// TODO: define max chunk size
const maxChunkSizeKB = 100;
const maxChunkSize = maxChunkSizeKB * 1024;

const splitBase64 = (base64: string, size: number) => {
  const parts: string[] = [];
  for (let i = 0; i < base64.length; i += size) {
    parts.push(base64.substring(i, i + size));
  }
  return parts;
};

const splitFile = async (file: File) => {
  const base64 = await readFile(file);
  const base64Size = base64.length;

  const numChunks = Math.ceil(base64Size / maxChunkSize);
  const chunkSize = Math.ceil(base64Size / numChunks);

  return splitBase64(base64, chunkSize);
};

export { splitFile };
