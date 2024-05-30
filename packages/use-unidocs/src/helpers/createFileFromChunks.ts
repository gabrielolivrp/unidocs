import ipfs from "../lib/ipfs";

const getChunks = async (ipfsURL: string, ipfshashs: string[]) => {
  const chunks = [];
  const data = await ipfs(ipfsURL).get(ipfshashs);

  // TODO: estourar um erro?
  if (!data || !Object.keys(data).length) return [];

  let index = 0;
  for (const hash of ipfshashs) {
    chunks.push(data[hash].chunk as string);
    index += 1;
  }

  return chunks;
};

const createFileFromChunks = (ipfsURL: string, ipfshashs: string[]) => {
  return getChunks(ipfsURL, ipfshashs).then((chunks) => chunks.join(""));
};

export { createFileFromChunks };
