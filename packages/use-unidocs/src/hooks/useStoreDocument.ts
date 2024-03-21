import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";
import { generateChecksum } from "../helpers/generateChecksum";
import { storeFile } from "../helpers/storeFile";

interface StoreProps {
  file: File;
  filename: string;
  description: string;
}

const useStoreDocument = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const storeDocument = async ({ file, filename, description }: StoreProps) => {
    const mimetype = file.type;
    const filesize = BigInt(file.size);
    const checksum = await generateChecksum(file);
    const ipfs = await storeFile(file);

    return writeContractAsync({
      ...unidocs,
      functionName: "storeDocument",
      args: [filename, description, ipfs, checksum, mimetype, filesize],
    });
  };

  return { storeDocument };
};

export { useStoreDocument };
