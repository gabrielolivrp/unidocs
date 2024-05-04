import { Unidocs } from "@unidocs/use-unidocs";

export type FileActionEvent =
  | "download"
  | "file_info"
  | "update_file"
  | "transfer"
  | "version_history"
  | "view"
  | "share";

export interface Action {
  name: string;
  event: FileActionEvent;
  permissions: Unidocs.Permission[];
  owned?: boolean;
}

export const actions = [
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
    name: "Share",
    event: "share",
    owned: true,
    permissions: [],
  },
] as Action[];
