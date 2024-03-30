import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { Address } from "viem";
import { getContract } from "../helpers/getContracts";
import { Unidocs } from "../types";

interface useGetFilesProps {
  account: Address;
}

type File = Omit<
  Unidocs.File,
  "versions" | "permissions" | "currentVersion" | "createdAt"
> & {
  createdAt: bigint;
};

type Version = Omit<Unidocs.Version, "createdAt"> & {
  createdAt: bigint;
};

type AccountAccess = Omit<Unidocs.AccountAccess, "access"> & {
  access: number;
};

const useGetFiles = ({ account }: useGetFilesProps) => {
  const unidocs = getContract("Unidocs");
  const [files, setFiles] = useState<Unidocs.File[]>([]);

  const {
    data: result,
    refetch,
    isFetched,
  } = useReadContract({
    ...unidocs,
    functionName: "getFiles",
    args: [account],
  });

  const makeFileWithVersions = (
    file: File,
    access: AccountAccess[],
    versions: Version[]
  ): Unidocs.File => {
    const versions2 = versions.map((version) => ({
      ...version,
      createdAt: new Date(Number(version.createdAt)),
    }));
    const currentVersion = versions2[versions.length - 1];
    return {
      ...file,
      currentVersion,
      versions: versions2,
      permissions: access.map((a) => ({
        ...a,
        access: a.access === 0 ? "WRITE" : "READ",
      })),
      createdAt: new Date(Number(file.createdAt)),
    };
  };

  const refetch_ = () => refetch();

  useEffect(() => {
    if (isFetched && result) {
      const [files, versions, access] = result;
      const updatedFiles = files.map((file, index) =>
        makeFileWithVersions(file, access[index] as any, versions[index] as any)
      );
      setFiles(updatedFiles);
    }
  }, [isFetched]);

  return { files, refetch: refetch_ };
};

export { useGetFiles };
