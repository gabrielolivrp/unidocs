"use client";

import { Button, Typography } from "@unidocs/ui";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Header, Footer, Files, UploadFile } from "@/components";
import { useIsMounted } from "@/hooks";

const Home = () => {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <>
      <div className="space-y-8 h-screen flex flex-col justify-between">
        <Header />
        <div className="container flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <Typography variant="h4">Files</Typography>
            <Button disabled={!isConnected} onClick={() => setOpen(true)}>
              Upload
            </Button>
          </div>
          <Files />
        </div>
        <Footer />
      </div>
      <UploadFile open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Home;
