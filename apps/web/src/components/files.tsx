import { useState } from "react";
import { useAccount } from "wagmi";
import { useGetFiles, useDownloadFile, Unidocs } from "@unidocs/use-unidocs";
import { FileVersionHistoryDialog } from "./file-version-history-dialog";
import { FileInfoDialog } from "./file-info-dialog";
import { FileCard } from "./file-card";
import { UpdateFile } from "./update-file";
import { TransferFile } from "./transfer-file-dialog";
import { ShareFileDialog } from "./share-file-dialog";

const Files = () => {
  const { address, isConnected } = useAccount();
  const [file, setFile] = useState<Unidocs.File | null>(null);
  const [fileInfoDialog, setFileInfoDialog] = useState(false);
  const [fileVersionHistoryDialog, setFileVersionHistoryDialog] =
    useState(false);
  const [updateFileDialog, setUpdateFileDialog] = useState(false);
  const [transferFileDialog, setTransferFileDialog] = useState(false);
  const [shareFileDialog, setShareFileDialog] = useState(false);

  const { files } = useGetFiles({ account: address! });
  const { downloadFile } = useDownloadFile();

  const handlePreview = async (file: Unidocs.File) => {};

  const handleDownload = async (file: Unidocs.File) => downloadFile({ file });

  const handleFileInfo = (file: Unidocs.File) => {
    setFile(file);
    setFileInfoDialog(true);
  };

  const handleVersionHistory = (file: Unidocs.File) => {
    setFile(file);
    setFileVersionHistoryDialog(true);
  };

  const handleUpdateFile = (file: Unidocs.File) => {
    setFile(file);
    setUpdateFileDialog(true);
  };

  const handleTransferFile = (file: Unidocs.File) => {
    setFile(file);
    setTransferFileDialog(true);
  };

  const handleShareFile = (file: Unidocs.File) => {
    setFile(file);
    setShareFileDialog(true);
  };

  const onAction = (file: Unidocs.File) => (event: string) => {
    switch (event) {
      case "view":
        return handlePreview(file);
      case "download":
        return handleDownload(file);
      case "file_info":
        return handleFileInfo(file);
      case "version_history":
        return handleVersionHistory(file);
      case "update_file":
        return handleUpdateFile(file);
      case "transfer":
        return handleTransferFile(file);
      case "share":
        return handleShareFile(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-4">
        {files?.map((file, index) => (
          <FileCard key={index} onAction={onAction(file)} file={file} />
        ))}
        {!isConnected && (
          <>
            <p>Connecte sua carteira</p>
          </>
        )}
      </div>

      {file && (
        <>
          <FileInfoDialog
            file={file}
            open={fileInfoDialog}
            onOpenChange={setFileInfoDialog}
          />
          <FileVersionHistoryDialog
            file={file}
            open={fileVersionHistoryDialog}
            onOpenChange={setFileVersionHistoryDialog}
          />
          <UpdateFile
            file={file}
            open={updateFileDialog}
            onOpenChange={setUpdateFileDialog}
          />
          <TransferFile
            file={file}
            open={transferFileDialog}
            onOpenChange={setTransferFileDialog}
          />
          <ShareFileDialog
            file={file}
            open={shareFileDialog}
            onOpenChange={setShareFileDialog}
          />
        </>
      )}
    </div>
  );
};

export { Files };
