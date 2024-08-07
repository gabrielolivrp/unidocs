import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { Address } from "viem";
import { getContract } from "../helpers";
import { toPermission, Unidocs } from "../types";

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

type AccessControl = Omit<Unidocs.AccessControl, "permission"> & {
  permission: number;
};

const mapFile = (
  file: File,
  versions: Version[],
  accessControls: AccessControl[]
): Unidocs.File => {
  const versions_ = versions.map((version) => ({
    ...version,
    createdAt: new Date(Number(version.createdAt)),
  }));
  const currentVersion = versions_[versions.length - 1];
  return {
    ...file,
    currentVersion,
    versions: versions_,
    accessControls: accessControls.map((accessControl) => ({
      ...accessControl,
      permission: toPermission(accessControl.permission)
    })),
    createdAt: new Date(Number(file.createdAt)),
  };
};

const useGetFiles = ({ account }: useGetFilesProps) => {
  const unidocs = getContract("Unidocs");
  const [files, setFiles] = useState<Unidocs.File[]>([]);
  const [data, setData] = useState([[], [], []]);

  const {
    data: result,
    refetch,
    isFetched,
  } = useReadContract({
    ...unidocs,
    functionName: "getFiles",
    args: [account],
  });

  useEffect(() => {
    if (isFetched && result) {
      setData(result as any);
    }
  }, [isFetched, result]);

  const refetch_ = async () => {
    const { data: result } = await refetch();
    setData(result as any);
  };

  useEffect(() => {
    const [files_, versions, access] = data;
    const updatedFiles = (files_ ?? []).map((file: any, index: any) =>
      mapFile(file, versions[index], access[index])
    );
    setFiles(updatedFiles);
  }, [data]);

  return { files, refetch: refetch_ };
};

export { useGetFiles };
