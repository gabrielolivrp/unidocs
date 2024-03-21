import { useWriteContract } from "wagmi";
import { getContract } from "../helpers/getContracts";

interface UpdateVersionProps {
  fileId: bigint;
  filename: string;
  description: string;
  ipfs: string[];
  checksum: string;
  mimetype: string;
  filesize: bigint;
}

const useUpdateDocumentVersion = () => {
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
  }: UpdateVersionProps) => {
    return writeContractAsync({
      ...unidocs,
      functionName: "updateDocument",
      args: [fileId, filename, description, ipfs, checksum, mimetype, filesize],
    });
  };

  return { updateVersion };
};

export { useUpdateDocumentVersion };
