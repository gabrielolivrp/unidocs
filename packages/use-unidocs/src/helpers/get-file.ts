import ipfs from "../lib/ipfs";
import { joinFile } from "./join-file";

const getFile = async (
  ipfsURL: string,
  cids: string[],
  filename: string,
  mimetype: string
) => {
  const chunks = [];
  const data = await ipfs(ipfsURL).get(cids);

  // TODO: estourar um erro?
  if (!data || !Object.keys(data).length) return;

  let index = 0;
  for (const hash of cids) {
    chunks.push(data[hash].chunk as string);
    index += 1;
  }

  return joinFile(chunks, filename, mimetype);
};

export { getFile };
