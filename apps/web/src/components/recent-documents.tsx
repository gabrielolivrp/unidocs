"use client";
import Image from "next/image";
import { Case, Default, Switch, Typography } from "@unidocs/ui";
import { useEffect, useState } from "react";
import { DocumentDropdown } from "./document-dropdown";
import { useAccount, useReadContract } from "wagmi";
import { getContract } from "@/helpers";

interface DocumentCardProps {
  tokenId: bigint;
  filename: string;
  checksum: string;
  mimetype: string;
  filesize: bigint;
  ipfs: readonly string[];
}

const DocumentPreview = () => (
  <Image src="/nft.jpg" alt="image" className="rounded-lg" layout="fill" />
);

const DocumentCard = ({ filename }: DocumentCardProps) => (
  <div className="border p-3 space-y-2 rounded-2xl relative">
    <div className="absolute right-4 top-4">
      <DocumentDropdown />
    </div>
    <Typography as="h6">{filename}</Typography>
    <div className="relative w-full h-24">{/* <DocumentPreview /> */}</div>
  </div>
);

const RecentDocuments = () => {
  const [isFetched, setIsFetched] = useState(false);
  const { address, isConnected } = useAccount();

  const unidocs = getContract("Unidocs");
  const { data, isFetched: contractIsFetched } = useReadContract({
    ...unidocs,
    functionName: "getDocuments",
    args: [address!],
  });
  useEffect(() => {
    setIsFetched(contractIsFetched);
  }, [contractIsFetched]);

  return (
    <div className="space-y-4">
      <Typography as="h4">Recent Documents</Typography>
      <div className="grid grid-cols-4 gap-4">
        <Switch value={isFetched}>
          <Case value={true}>
            {data?.slice(0, 4).map((file, index) => (
              <DocumentCard key={index} {...file} />
            ))}
          </Case>
          <Default>loading...</Default>
        </Switch>
      </div>
    </div>
  );
};

export { RecentDocuments };
