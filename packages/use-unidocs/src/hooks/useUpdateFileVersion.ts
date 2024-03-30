import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";

interface UpdateFileVersionProps {
  fileId: bigint;
  filename: string;
  description: string;
  ipfs: string[];
  checksum: string;
  mimetype: string;
  filesize: bigint;
}

const useUpdateFileVersion = () => {
  const unidocs = getContract("Unidocs");
  const { writeContractAsync } = useWriteContract();

  const updateVersion = async ({
    fileId,
    filename,
    description,
    ipfs,
    checksum,
    mimetype,
    filesize,
  }: UpdateFileVersionProps) => {
    const createdAt = BigInt(Date.now());
    return writeContractAsync({
      ...unidocs,
      functionName: "updateFile",
      args: [
        fileId,
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

  return { updateVersion };
};

export { useUpdateFileVersion };
