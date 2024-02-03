"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, Icon } from "@unidocs/ui";
import { useDropzone } from "react-dropzone";

type State = "accept" | "reject" | "active" | null;

interface DropzoneProps {
  onAccept: (file: File) => void;
  onReject: () => void;
}

interface UploadIconProps {
  state: State;
}

interface PreviewProps {
  file?: File;
  removeFile: () => void;
}

interface UploadTextProps {
  state: State;
}

const dropzoneColor = (state: State) => {
  if (state == "accept") return "green-500";
  if (state == "active") return "blue-500";
  if (state == "reject") return "red-500";
  return "gray-400";
};

const UploadIcon = ({ state }: UploadIconProps) => (
  <Icon
    name="UploadCloud"
    className={`w-10 h-10 mb-3 text-${dropzoneColor(state)}`}
  />
);

const UploadText = ({ state }: UploadTextProps) => {
  if (state == "active") return <p>Drop the files here ...</p>;
  if (state == "reject") return <p>Drop the files is reject ...</p>;
  if (state == "accept") return <p></p>;
  return (
    <>
      <span className="font-semibold">Click to upload</span> or drag and drop
    </>
  );
};

export const Dropzone = ({ onAccept }: DropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<State>(null);

  const removeFile = useCallback(() => {
    setFile(null);
    setState(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    setFile(file);
    onAccept(file);
    setState("accept");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    onDropRejected: () => {
      setState("reject");
    },
  });

  useEffect(() => {
    if (isDragActive) {
      setState("active");
    }
  }, [isDragActive]);

  return (
    <Card
      {...getRootProps()}
      className={`border-dashed border-2 border-${dropzoneColor(
        state
      )} z-50 h-44 flex items-center justify-center`}
    >
      <input {...getInputProps()} />
      {file ? (
        <Preview file={file} removeFile={removeFile} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <UploadIcon state={state} />
          <p className={`text-${dropzoneColor(state)}`}>
            <UploadText state={state} />
          </p>
        </div>
      )}
    </Card>
  );
};

const Preview = ({ file, removeFile }: PreviewProps) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeFile();
  };

  return (
    <div className="bg-secondary rounded-md shadow-md flex items-center justify-center space-x-2">
      <Icon name="UploadCloud" className="w-5 h-5 my-4 ml-4" />

      <span className="text-sm text-gray-500 my-4">{file?.name}</span>

      <button onClick={(e) => handleRemove(e)} className="bg-transparent pr-2">
        <Icon name="X" className="w-5 h-5" />
      </button>
    </div>
  );
};
