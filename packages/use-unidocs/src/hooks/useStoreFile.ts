import { useWriteContract } from "wagmi";
import { getContract, generateChecksum, storeFile } from "../helpers";

export interface StoreFileProps {
  file: File;
  filename: string;
  description: string;
}

const useStoreFile = (ipfsURL: string) => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const storeFile_ = async ({
    file,
    filename,
    description,
  }: StoreFileProps) => {
    const mimetype = file.type;
    const filesize = BigInt(file.size);
    const checksum = await generateChecksum(file);
    const ipfs = await storeFile(ipfsURL, file);
    const createdAt = BigInt(Date.now());
    return writeContractAsync({
      ...unidocs,
      functionName: "storeFile",
      args: [
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ],
    });
  };

  return { storeFile: storeFile_ };
};

export { useStoreFile };
