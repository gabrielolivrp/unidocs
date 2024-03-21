import { toBase64 } from "./toBase64";
import * as ipfs from "../lib/ipfs";

const storeChunks = async (chunks: string[]) => {
  const data: Record<string, string> = {};

  let index = 0;
  for (const chunk of chunks) {
    data[index.toString()] = chunk;
    index += 1;
  }
  const ipfshashs = await ipfs.storage(data);
  return Object.values(ipfshashs ?? {});
};

const createChunks = async (base64: string): Promise<string[]> => {
  const chunkSize = Math.ceil(base64.length / 5);
  const chunks = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    chunks.push(base64.slice(i, i + chunkSize));
  }
  return chunks;
};

const storeFile = async (file: File) => {
  const base64 = await toBase64(file);
  const chunks = await createChunks(base64);
  const ipfsHashs = await storeChunks(chunks);

  if (!ipfsHashs.length) {
    throw new Error("An error occurred when trying to upload to ipfs");
  }

  return ipfsHashs;
};

export { storeFile };
