import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { Address } from "viem";
import { UnidocsFile, Version } from "../types";
import { getContract } from "../helpers/getContracts";

interface UseGetDocumentsProps {
  account: Address;
}

const useGetDocuments = ({ account }: UseGetDocumentsProps) => {
  const unidocs = getContract("Unidocs");
  const [files, setFiles] = useState<UnidocsFile[]>([]);

  const { data: result, isFetched } = useReadContract({
    ...unidocs,
    functionName: "getDocuments",
    args: [account],
  });

  const makeFileWithVersions = (
    file: Omit<UnidocsFile, "versions" | "currentVersion" | "createdAt"> & {
      createdAt: bigint;
    },
    versions: (Omit<Version, "createdAt"> & {
      createdAt: bigint;
    })[]
  ): UnidocsFile => {
    const versions2 = versions.map((version) => ({
      ...version,
      createdAt: new Date(Number(version.createdAt)),
    }));
    const currentVersion = versions2[versions.length - 1];
    return {
      ...file,
      createdAt: new Date(Number(file.createdAt)),
      currentVersion,
      versions: versions2,
    };
  };

  useEffect(() => {
    if (isFetched && result) {
      const [files_, versions] = result;
      const updatedFiles = files_.map((file, index) =>
        makeFileWithVersions(file, versions[index] as any)
      );
      setFiles(updatedFiles);
    }
  }, [isFetched]);

  return { files };
};

export { useGetDocuments };
