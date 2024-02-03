"use client";
import { Icon, Icons } from "@unidocs/ui";

interface DocumentIconProps {
  mimetype: string;
  size?: string | number | undefined;
}

const icon = (mimeType: string): Icons => {
  switch (mimeType) {
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

const DocumentIcon = ({ mimetype, size }: DocumentIconProps) => (
  <Icon name={icon(mimetype)} size={size} />
);

export { DocumentIcon };
