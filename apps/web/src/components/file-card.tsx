import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icon,
  Typography,
  Badge,
} from "@unidocs/ui";
import { FileIcon } from "./file-icon";
import { formatBytes, hasPermissions } from "@/helpers";
import { Unidocs } from "@unidocs/use-unidocs";
import { useAccount } from "wagmi";
import { actions, FileActionEvent } from "@/constants/file-actions";

interface FileCardProps {
  file: Unidocs.File;
  onAction: (e: FileActionEvent) => void;
}

const FileCard = ({ file, onAction }: FileCardProps) => {
  const { address } = useAccount();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="w-100 flex justify-center items-center transition-all group/item border p-3 rounded-2xl relative bg-muted/95">
          <div className="group-hover/item:visible invisible absolute top-1 left-1">
            <Badge>{formatBytes(Number(file.currentVersion.filesize))}</Badge>
          </div>
          <div className="absolute right-1 top-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icon name="MoreVertical"></Icon>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {actions.map(
                  ({ name, event, permissions, owned }, index) =>
                    hasPermissions(file, permissions, address, owned) && (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => onAction(event)}
                      >
                        {name}
                      </DropdownMenuItem>
                    )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-center flex-col">
            <FileIcon mimetype={file.currentVersion.mimetype} size="6rem" />
            <Typography variant="h6">{file.currentVersion.filename}</Typography>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {actions.map(
          ({ name, event, permissions, owned }, index) =>
            hasPermissions(file, permissions, address, owned) && (
              <ContextMenuItem key={index} onClick={() => onAction(event)}>
                {name}
              </ContextMenuItem>
            )
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { FileCard };
