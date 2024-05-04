import { arraysEqual } from "@/helpers";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
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
import { Unidocs, useUnidocs } from "@unidocs/use-unidocs";
import { useEffect, useState } from "react";
import { FileInfoDialog } from "./file-info-dialog";
import { AccountAvatar } from "./account-avatar";
import { Hash } from "./hash";

interface FileVersionHistoryDialogProps {
  file: Unidocs.File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Change {
  version: Unidocs.Version;
  change_type: string;
  details?: { old: string; new: string };
}

const diffVersions = (
  currentVersion: Unidocs.Version,
  previousVersion: Unidocs.Version
): Change[] => {
  const changes = [] as Change[];

  if (currentVersion.filename !== previousVersion.filename) {
    changes.push({
      version: currentVersion,
      change_type: "change_name",
      details: { old: previousVersion.filename, new: currentVersion.filename },
    });
  }

  if (currentVersion.description !== previousVersion.description) {
    changes.push({
      version: currentVersion,
      change_type: "change_description",
      details: {
        old: previousVersion.description,
        new: currentVersion.description,
      },
    });
  }

  if (!arraysEqual(currentVersion.ipfs, previousVersion.ipfs)) {
    changes.push({
      version: currentVersion,
      change_type: "change_content",
    });
  }

  return changes;
};

const diffAllVersions = (file: Unidocs.File) => {
  const changes: Change[] = [
    { version: file.versions[0], change_type: "file_created" },
  ];

  for (let i = 1; i < file.versions.length; i++) {
    const currentVersion = file.versions[i];
    const previousVersion = file.versions[i - 1];
    const versionChanges = diffVersions(currentVersion, previousVersion);
    changes.push(...versionChanges);
  }

  return changes;
};

const formatChange = (change: Change) => {
  switch (change.change_type) {
    case "change_name":
      return "Filename changed";
    case "change_description":
      if (change.details?.old === "") {
        return "Description added";
      }
      return "Description changed";
    case "change_content":
      return "File content has changed";
    case "file_created":
      return `File "${change.version.filename}" created`;
    default:
      return "Unknown change";
  }
};

const changesPerDay = (changes: Change[]) => {
  const changesWithCreatedAt = changes.map((change) => ({
    ...change,
    createdAt: new Date(change.version.createdAt),
  }));

  changesWithCreatedAt.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  const changesByDay: { [date: string]: Change[] } = {};
  changesWithCreatedAt.forEach((change) => {
    const dateKey = change.createdAt.toISOString().slice(0, 10);
    if (!changesByDay[dateKey]) {
      changesByDay[dateKey] = [];
    }
    changesByDay[dateKey].push(change);
  });
  return changesByDay;
};

const FileVersionHistoryDialog = ({
  file,
  open,
  onOpenChange,
}: FileVersionHistoryDialogProps) => {
  const { downloadFile } = useUnidocs();
  const [fileDialog, setFileDialog] = useState(file);
  const [fileInfoDialog, setFileInfoDialog] = useState(false);
  const [versionHistory, setVersionHistory] = useState<{
    [date: string]: Change[];
  }>({});

  const handleFileInfo = (file: Unidocs.File, version: Unidocs.Version) => {
    setFileDialog({ ...file, currentVersion: version });
    setFileInfoDialog(true);
  };

  const handleDownload = async (file: Unidocs.File, version: Unidocs.Version) =>
    downloadFile({ file: { ...file, currentVersion: version } });

  useEffect(() => {
    const diff = diffAllVersions(file);
    setVersionHistory(changesPerDay(diff));
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
          </DialogHeader>

          <div className="flex max-h-96 overflow-y-auto">
            {Object.entries(versionHistory).map(([key, data]) => (
              <div key={key}>
                <div className="ps-2 my-2 first:mt-0">
                  <Typography as="h3" variant="mutedText">
                    {key}
                  </Typography>
                </div>

                {data.toReversed().map((change, index) => (
                  <ContextMenu key={index}>
                    <ContextMenuTrigger asChild>
                      <div className="flex gap-x-3 relative group rounded-00">
                        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-secondary-foreground border-2 border-secondary"></div>
                          </div>
                        </div>
                        <div className="grow p-2 pb-8 relative">
                          <div className="absolute top-2 right-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Icon name="MoreVertical" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDownload(file, change.version)
                                  }
                                >
                                  Download
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    handleFileInfo(file, change.version)
                                  }
                                >
                                  File Information
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <Typography as="h3" variant="h6">
                            {formatChange(change)}
                          </Typography>
                          <div className="flex items-center space-x-2">
                            <AccountAvatar
                              className="w-4 h-4"
                              address={change.version.createdBy}
                            />
                            <Hash text={change.version.createdBy} />
                          </div>
                        </div>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem
                        onClick={() => handleDownload(file, change.version)}
                      >
                        Download
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => handleFileInfo(file, change.version)}
                      >
                        File Information
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            ))}
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
