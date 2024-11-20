import { useState } from "react";
import { useAccount } from "wagmi";
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { FileVersionHistoryDialog } from "./file-version-history-dialog";
import { FileInfoDialog } from "./file-info-dialog";
import { FileCard } from "./file-card";
import { UpdateFile } from "./update-file";
import { TransferFile } from "./transfer-file-dialog";
import { ShareFileDialog } from "./share-file-dialog";
import {
  Badge,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
  Typography,
} from "@unidocs/ui";
import Image from "next/image";
import Empty from "@/assets/empty.svg";
import { actions, FileActionEvent } from "@/constants/file-actions";
import { formatBytes, hasPermissions } from "@/helpers";
import { Hash } from "./hash";
import { FileIcon } from "./file-icon";
import { AccountAvatar } from "./account-avatar";

interface FilesProps {
  layout: "list" | "grid";
}

const Files = ({ layout }: FilesProps) => {
  const { address } = useAccount();
  const [file, setFile] = useState<Unidocs.File | null>(null);
  const [fileInfoDialog, setFileInfoDialog] = useState(false);
  const [fileVersionHistoryDialog, setFileVersionHistoryDialog] =
    useState(false);
  const [updateFileDialog, setUpdateFileDialog] = useState(false);
  const [transferFileDialog, setTransferFileDialog] = useState(false);
  const [shareFileDialog, setShareFileDialog] = useState(false);

  const { files, downloadFile } = useUnidocs();

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

  const onAction = (file: Unidocs.File) => (event: FileActionEvent) => {
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
      {layout === "grid" && files.length > 0 && (
        <div className="grid grid-cols-6 gap-4 sm:grid-cols-4">
          {files?.map((file, index) => (
            <FileCard key={index} onAction={onAction(file)} file={file} />
          ))}
        </div>
      )}

      {layout === "list" && files.length > 0 && (
        <Table className="table-auto">
          <THead>
            <Tr>
              <Th>Name</Th>
              <Th>Owner</Th>
              <Th>Updated at</Th>
              <Th>Size</Th>
              <Th></Th>
            </Tr>
          </THead>
          <TBody>
            {files?.map((file, index) => (
              <ContextMenu key={index}>
                <ContextMenuTrigger asChild>
                  <Tr className="hover:bg-muted/95 border-b">
                    <Td>
                      <div className="flex items-center space-x-2">
                        <FileIcon
                          mimetype={file.currentVersion.mimetype}
                          size="2rem"
                        />
                        <Typography as="p" variant="p">
                          {file.currentVersion.filename}
                        </Typography>
                      </div>
                    </Td>
                    <Td>
                      <div className="flex items-center space-x-2">
                        <AccountAvatar address={file.owner} />
                        <Typography as="p" variant="p">
                          {file.owner === address ? (
                            "me"
                          ) : (
                            <Hash text={file.owner} />
                          )}
                        </Typography>
                      </div>
                    </Td>
                    <Td>{file.currentVersion.createdAt.toLocaleString()}</Td>
                    <Td>
                      <Badge>
                        {formatBytes(Number(file.currentVersion.filesize))}
                      </Badge>
                    </Td>
                    <Td>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Icon name="MoreVertical"></Icon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {actions.map(
                            ({ name, event, permissions, owned }, index) =>
                              hasPermissions(
                                file,
                                permissions,
                                address,
                                owned
                              ) && (
                                <DropdownMenuItem
                                  key={index}
                                  onClick={() => onAction(file)(event)}
                                >
                                  {name}
                                </DropdownMenuItem>
                              )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Td>
                  </Tr>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {actions.map(
                    ({ name, event, permissions, owned }, index) =>
                      hasPermissions(file, permissions, address, owned) && (
                        <ContextMenuItem
                          key={index}
                          onClick={() => onAction(file)(event)}
                        >
                          {name}
                        </ContextMenuItem>
                      )
                  )}
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TBody>
        </Table>
      )}

      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-60 h-44">
            <Image
              src={Empty}
              alt="Empty"
              object-fit="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <Typography as="h3" variant="lead">
            Upload your first file
          </Typography>
        </div>
      )}

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
