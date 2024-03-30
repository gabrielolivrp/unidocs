import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { generateChecksum } from "../helpers/generateChecksum";
import { storeFile } from "../helpers/storeFile";

interface StoreProps {
  file: File;
  filename: string;
  description: string;
}

const useStoreFile = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const storeFile_ = async ({ file, filename, description }: StoreProps) => {
    const mimetype = file.type;
    const filesize = BigInt(file.size);
    const checksum = await generateChecksum(file);
    const ipfs = await storeFile(file);
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
