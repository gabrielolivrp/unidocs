"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { Unidocs } from "../types";
import { useAccount } from "wagmi";
import {
  type StoreFileProps,
  type UpdateFileProps,
  type TransferFileProps,
  type UpdateFileDescriptionProps,
  type UpdateFileNameProps,
  type DownloadFileProps,
  type ShareFileProps,
  type RevokeAccessProps,
  useGetFiles,
  useStoreFile,
  useTransferFile,
  useUpdateFile,
  useUpdateFileDescription,
  useUpdateFileName,
  useDownloadFile,
  useShareFile,
  useRevokeAccess,
} from "../hooks";

type UnidocsContextProps = {
  files: Unidocs.File[];
  storeFile: (props: StoreFileProps) => any;
  updateFile: (props: UpdateFileProps) => any;
  transferFile: (props: TransferFileProps) => any;
  updateFileDescription: (props: UpdateFileDescriptionProps) => any;
  updateFileName: (props: UpdateFileNameProps) => any;
  downloadFile: (props: DownloadFileProps) => any;
  shareFile: (props: ShareFileProps) => any;
  revokeAccess: (props: RevokeAccessProps) => any;
};

const UnidocsContext = createContext<UnidocsContextProps | null>(null);

interface UnidocsProviderProps {
  children: ReactNode;
}

export const UnidocsProvider = ({ children }: UnidocsProviderProps) => {
  const { address } = useAccount();
  const { files, refetch } = useGetFiles({ account: address! });
  const { storeFile } = useStoreFile();
  const { updateFile } = useUpdateFile();
  const { transferFile } = useTransferFile();
  const { updateFileDescription } = useUpdateFileDescription();
  const { updateFileName } = useUpdateFileName();
  const { downloadFile } = useDownloadFile();
  const { shareFile } = useShareFile();
  const { revokeAccess } = useRevokeAccess();

  const storeFile_ = async (props: StoreFileProps) =>
    storeFile(props).then(async (result) => {
      await refetch();
      return result;
    });
  const updateFile_ = (props: UpdateFileProps) =>
    updateFile(props).then((result) => {
      refetch();
      return result;
    });
  const transferFile_ = (props: TransferFileProps) =>
    transferFile(props).then((result) => {
      refetch();
      return result;
    });
  const updateFileDescription_ = (props: UpdateFileDescriptionProps) =>
    updateFileDescription(props).then((result) => {
      refetch();
      return result;
    });
  const updateFileName_ = (props: UpdateFileNameProps) =>
    updateFileName(props).then((result) => {
      refetch();
      return result;
    });
  // const downloadFile_ = (props: DownloadFileProps) =>
  //   downloadFile(props).then((result) => {
  //     refetch();
  //     return result;
  //   });
  const shareFile_ = (props: ShareFileProps) =>
    shareFile(props).then((result) => {
      refetch();
      return result;
    });
  const revokeAccess_ = (props: RevokeAccessProps) =>
    revokeAccess(props).then((result) => {
      refetch();
      return result;
    });

  return (
    <UnidocsContext.Provider
      value={{
        files,
        downloadFile,
        storeFile: storeFile_,
        updateFile: updateFile_,
        transferFile: transferFile_,
        updateFileDescription: updateFileDescription_,
        updateFileName: updateFileName_,
        shareFile: shareFile_,
        revokeAccess: revokeAccess_,
      }}
    >
      {children}
    </UnidocsContext.Provider>
  );
};

export const useUnidocs = (): UnidocsContextProps => {
  const context = useContext(UnidocsContext);

  if (!context) {
    throw new Error("useUnidocs must be used within a UnidocsContextProvider");
  }

  return context;
};
