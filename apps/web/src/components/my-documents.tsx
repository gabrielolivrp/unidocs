"use client";

import {
  Card,
  CardContent,
  Case,
  Default,
  Switch,
  TBody,
  THead,
  Table,
  Td,
  Th,
  Tr,
  Typography,
} from "@unidocs/ui";
import { useEffect, useState } from "react";
import { DocumentIcon } from "./document-icon";
import { DocumentDropdown } from "./document-dropdown";
import { useAccount, useReadContract } from "wagmi";
import { formatBytes, getContract } from "@/helpers";

const MyDocuments = () => {
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
      <Typography as="h4">My Documents</Typography>
      <Card className="h-full">
        <CardContent>
          <Switch value={isFetched}>
            <Case value={true}>
              <Table>
                <THead>
                  <Tr>
                    <Th>Token</Th>
                    <Th>Name</Th>
                    <Th>File Size</Th>
                    <Th>Checksum</Th>
                    <Th></Th>
                  </Tr>
                </THead>
                <TBody>
                  {data?.map((file, index) => (
                    <Tr key={index}>
                      <Td>{Number(file.tokenId)}</Td>
                      <Td>
                        <div className="flex items-center space-x-2">
                          <div className="bg-secondary p-1 rounded">
                            <DocumentIcon
                              size="1rem"
                              mimetype={file.mimetype}
                            />
                          </div>
                          <label>{file.filename}</label>
                        </div>
                      </Td>
                      <Td>{formatBytes(Number(file.filesize))}</Td>
                      <Td>
                        <p>{file.checksum}</p>
                      </Td>
                      <Td>
                        <DocumentDropdown />
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </Case>
            <Default>loading...</Default>
          </Switch>
        </CardContent>
      </Card>
    </div>
  );
};

export { MyDocuments };
