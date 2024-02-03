"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormGroup,
  Input,
  Label,
  Typography,
} from "@unidocs/ui";
import { Dropzone } from "./dropzone";
import { useEffect, useState } from "react";
import { useTransactor } from "@/hooks";
import { useLoading } from "@/contexts";
import { useWriteContract } from "wagmi";
import { generateChecksum } from "@/helpers/generateChecksum";
import { toast } from "sonner";
import { getContract } from "@/helpers";

interface ConfirmMintProps {
  file: File;
  open: boolean;
  onClose: () => void;
}

const ConfirmMint = ({ file, open, onClose }: ConfirmMintProps) => {
  const [filename, setFilename] = useState("");
  const { startLoading, finishLoading } = useLoading({
    message: "Confirming transaction",
  });
  const { writeContractAsync } = useWriteContract();
  const writeTx = useTransactor({
    onError: (err) => toast(err),
    onSuccess: () => toast("Transaction completed successfully"),
    onFinish: () => finishLoading(),
  });
  const unidocs = getContract("Unidocs");

  const handleMint = async () => {
    startLoading();
    await writeTx(async () => {
      const checksum = await generateChecksum(file);
      return writeContractAsync({
        ...unidocs,
        functionName: "storeDocument",
        args: [
          filename,
          ["ipfs_1", "ipfs_2"],
          checksum,
          file.type,
          BigInt(file.size),
        ],
      });
    });
  };

  useEffect(() => {
    if (file) {
      setFilename(file.name);
    }
  }, [file]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Mint</DialogTitle>
        </DialogHeader>
        <FormGroup>
          <Label>File name</Label>
          <Input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </FormGroup>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleMint}>Mint</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MintDocument = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleDropAccepted = (file: File) => {
    setFile(file);
    setOpen(true);
  };

  const handleDropRejected = () => {
    console.log("onDropRejected");
  };

  return (
    <div className="space-y-4">
      <Typography as="h4">Mint Document</Typography>
      <Dropzone onAccept={handleDropAccepted} onReject={handleDropRejected} />

      {file && (
        <ConfirmMint file={file} open={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export { MintDocument };
