import { Icon, Icons } from "@unidocs/ui";

interface FileIconProps {
  mimetype: string;
  size?: string | number | undefined;
}

const icon = (mimetype: string): Icons => {
  switch (mimetype) {
    case "image/jpeg":
    case "image/png":
      return "FileImage";
    case "video/mp4":
      return "FileVideo";
    case "audio/mpeg":
      return "FileAudio";
    case "application/pdf":
      return "FileText";
    default:
      return "File";
  }
};

const FileIcon = ({ mimetype, size }: FileIconProps) => (
  <Icon strokeWidth={1} name={icon(mimetype)} size={size} />
);

export { FileIcon };
