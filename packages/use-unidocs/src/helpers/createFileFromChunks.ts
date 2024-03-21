import * as ipfs from "../lib/ipfs";

const getChunks = async (ipfshashs: string[]) => {
  const chunks = [];
  const data = await ipfs.get(ipfshashs);

  // TODO: estourar um erro?
  if (!data || !Object.keys(data).length) return [];

  let index = 0;
  for (const hash of ipfshashs) {
    chunks.push(data[hash].chunk as string);
    index += 1;
  }

  return chunks;
};

const createFileFromChunks = async (ipfshashs: string[]) => {
  return getChunks(ipfshashs).then((chunks) => chunks.join(""));
};

export { createFileFromChunks };
