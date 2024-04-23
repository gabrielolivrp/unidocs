import { formatBytes } from "@/helpers";
import {
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Typography,
} from "@unidocs/ui";
import { FileIcon } from "./file-icon";
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { useState } from "react";
import { FileInfoDialog } from "./file-info-dialog";

interface FileVersionHistoryDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FileVersionHistoryDialog = ({
  file,
  open,
  onOpenChange,
}: FileVersionHistoryDialogProps) => {
  const { downloadFile } = useUnidocs();
  const [fileDialog, setFileDialog] = useState(file);
  const [fileInfoDialog, setFileInfoDialog] = useState(false);

  const handleFileInfo = (file: Unidocs.File, version: Unidocs.Version) => {
    setFileDialog({ ...file, currentVersion: version });
    setFileInfoDialog(true);
  };

  const handleDownload = async (file: Unidocs.File, version: Unidocs.Version) =>
    downloadFile({ file: { ...file, currentVersion: version } });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col-reverse space-y-2">
            <table>
              <tbody>
                {file.versions.toReversed().map((version, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center justify-center space-x-2">
                        <FileIcon size="2rem" mimetype={version.mimetype} />
                        <div className="flex-1">
                          <button className="inline-flex items-center transition-all cursor-pointer group/item">
                            <Typography variant="p">
                              {version.filename}
                            </Typography>
                            <Icon
                              className="group-hover/item:inline-block hidden ml-1 w-3 h-3"
                              name="ExternalLink"
                            />
                          </button>
                          <Typography variant="mutedText">
                            {version.createdAt.toLocaleString()}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge>{formatBytes(Number(version.filesize))}</Badge>
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Icon name="MoreVertical"></Icon>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleDownload(file, version)}
                          >
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleFileInfo(file, version)}
                          >
                            File Information
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      <FileInfoDialog
        readonly
        file={fileDialog}
        open={fileInfoDialog}
        onOpenChange={setFileInfoDialog}
      />
    </>
  );
};

export { FileVersionHistoryDialog };
