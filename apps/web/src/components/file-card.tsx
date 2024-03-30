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

interface Action {
  name: string;
  event: string;
  permissions: Unidocs.Access[];
  owned?: boolean;
}

const actions = [
  {
    name: "Download",
    event: "download",
    permissions: ["READ", "WRITE"],
  },
  {
    name: "File Information",
    event: "file_info",
    permissions: ["READ", "WRITE"],
  },
  {
    name: "Update file",
    event: "update_file",
    permissions: ["WRITE"],
  },
  {
    name: "Transfer",
    event: "transfer",
    owned: true,
    permissions: [],
  },
  {
    name: "Version History",
    event: "version_history",
    permissions: ["READ", "WRITE"],
  },
  {
    name: "Open",
    event: "view",
    permissions: ["READ", "WRITE"],
  },
  {
    name: "Share",
    event: "share",
    owned: true,
    permissions: [],
  },
] as Action[];

interface FileCardProps {
  file: Unidocs.File;
  onAction: (e: string) => void;
}

const FileCard = ({ file, onAction }: FileCardProps) => {
  const { address } = useAccount();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="transition-all group/item border p-3 rounded-2xl relative hover:bg-primary-foreground">
          <div className="group-hover/item:visible invisible absolute top-1 left-1">
            <Badge>{formatBytes(Number(file.currentVersion.filesize))}</Badge>
          </div>
          <div className="absolute right-1 top-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Icon name="MoreVertical"></Icon>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {actions.map(({ name, event }, index) => (
                  <DropdownMenuItem key={index} onClick={() => onAction(event)}>
                    {name}
                  </DropdownMenuItem>
                ))}
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
