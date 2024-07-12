import ipfs from "../lib/ipfs";
import { splitFile } from "./split-file";

const storeChunks = async (
  ipfsURL: string,
  chunks: string[]
): Promise<string[]> => {
  const data: Record<string, string> = {};

  let index = 0;
  for (const chunk of chunks) {
    data[index.toString()] = chunk;
    index += 1;
  }
  const ipfshashs = await ipfs(ipfsURL).storage(data);
  return Object.values(ipfshashs ?? {});
  // return new Promise((resolve) =>
  //   resolve([
  //     "QmYt25x9brcxgdjyMT8thvanYpuBf6bo14SDHj5z7xJfN5",
  //     "QmapMgt9Xq18KcxvyTTgVTmrhMfak3hxEJepCExVCb83Mr",
  //     "QmUnXXtikbW5hzbJc9cBRzk43yiDvkVKAwS3ycwZcJ8CgJ",
  //     "QmNfHHCtoVUw8BhqupkyGfYaygSBfkixQ5nyTVfse3drZK",
  //     "QmSbk1eX7AFtG2smPMytVs2ZfnunNQvkcHMYKesUXLsRvT",
  //   ])
  // );
};

const storeFile = async (ipfsURL: string, file: File) => {
  const chunks = await splitFile(file);
  const ipfsHashs = await storeChunks(ipfsURL, chunks);

  if (!ipfsHashs.length) {
    throw new Error("An error occurred when trying to upload to ipfs");
  }

  return ipfsHashs;
};

export { storeFile };
