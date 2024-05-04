import { useState } from "react";
import {
  Badge,
  Button,
  Copy,
  Icon,
  Sheet,
  SheetContent,
  Typography,
} from "@unidocs/ui";
import { formatBytes, hasPermissions } from "@/helpers";
import { FileIcon } from "./file-icon";
import { UpdateFileNameDialog } from "./update-file-name-dialog";
import { UpdateFileDescriptionDialog } from "./update-file-description-dialog";
import { Hash } from "./hash";
import { Unidocs } from "@unidocs/use-unidocs";
import { useAccount } from "wagmi";
import { AccountAvatar } from "./account-avatar";

interface FileInfoDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  readonly?: boolean;
}

const FileInfoDialog = ({
  file,
  open,
  onOpenChange,
  readonly = false,
}: FileInfoDialogProps) => {
  const { address } = useAccount();

  const [updateFileNameDialog, setUpdateFileNameDialog] = useState(false);
  const [updateFileDescriptionDialog, setUpdateFileDescriptionDialog] =
    useState(false);

  const handleUpdateFileNameDialog = () => {
    setUpdateFileNameDialog(true);
    onOpenChange(false);
  };

  const handleUpdateFileDescriptionDialog = () => {
    setUpdateFileDescriptionDialog(true);
    onOpenChange(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-center">
                <FileIcon size="8rem" mimetype={file.currentVersion.mimetype} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Typography variant="h6">
                    {file.currentVersion.filename}
                  </Typography>
                  {hasPermissions(file, ["WRITE"], address) && !readonly && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleUpdateFileNameDialog}
                    >
                      <Icon size="1rem" name="Pen" />
                    </Button>
                  )}
                </div>
                <Badge>
                  {formatBytes(Number(file.currentVersion.filesize))}
                </Badge>
              </div>
            </div>

            <div>
              <Typography variant="h5">Information</Typography>
              <div className="grid gap-4 divide-y">
                <div className="flex items-center justify-between">
                  <Typography variant="p" className="text-muted-foreground">
                    Owner
                  </Typography>
                  <div className="flex items-center justify-center space-x-2">
                    <label>
                      {file.owner === address ? (
                        "me"
                      ) : (
                        <Hash text={file.owner} />
                      )}
                    </label>
                    <AccountAvatar address={file.owner} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="p" className="text-muted-foreground">
                    Type
                  </Typography>
                  <Typography variant="p">
                    {file.currentVersion.mimetype}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="p" className="text-muted-foreground">
                    Checksum
                  </Typography>
                  <Hash text={file.currentVersion.checksum} />
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="p" className="text-muted-foreground">
                    Created at
                  </Typography>
                  <Typography variant="p">
                    {file.createdAt.toLocaleString()}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="p" className="text-muted-foreground">
                    Updated at
                  </Typography>
                  <Typography variant="p">
                    {file.currentVersion.createdAt.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Typography variant="h5">Description</Typography>
                {hasPermissions(file, ["WRITE"], address) && !readonly && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUpdateFileDescriptionDialog}
                  >
                    <Icon size="1rem" name="Pen" />
                  </Button>
                )}
              </div>
              <Typography variant="p">
                {file.currentVersion.description}
              </Typography>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <UpdateFileNameDialog
        file={file}
        open={updateFileNameDialog}
        onOpenChange={setUpdateFileNameDialog}
      />
      <UpdateFileDescriptionDialog
        file={file}
        open={updateFileDescriptionDialog}
        onOpenChange={setUpdateFileDescriptionDialog}
      />
    </>
  );
};

export { FileInfoDialog };
