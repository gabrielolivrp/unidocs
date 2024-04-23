"use client";

import {
  Button,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from "@unidocs/ui";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Header, Footer, Files, UploadFile } from "@/components";
import { useIsMounted } from "@/hooks";

interface ToggleLayoutProps {
  layout: "list" | "grid";
  onChange: (layout: "list" | "grid") => void;
}

const ToggleLayout = ({ layout, onChange }: ToggleLayoutProps) => (
  <div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => onChange("grid")}
            className={`rounded-l-full ${
              layout === "grid" ? "bg-muted/95" : ""
            }`}
            variant="outline"
          >
            <Icon name="LayoutGrid" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Grid</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => onChange("list")}
            className={`rounded-r-full ${
              layout === "list" ? "bg-muted/95" : ""
            }`}
            variant="outline"
          >
            <Icon name="LayoutList" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>List</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

const Home = () => {
  const { isConnected } = useAccount();
  const [layout, setLayout] = useState<"list" | "grid">("grid");
  const [uploadFileDialog, setUploadFileDialog] = useState(false);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <>
      <div className="space-y-8 h-screen flex flex-col justify-between">
        <Header />
        <div className="container flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <ToggleLayout layout={layout} onChange={setLayout} />
            <div>
              <Button
                disabled={!isConnected}
                onClick={() => setUploadFileDialog(true)}
              >
                Upload
              </Button>
            </div>
          </div>
          <Files layout={layout} />
        </div>
        <Footer />
      </div>
      <UploadFile open={uploadFileDialog} onOpenChange={setUploadFileDialog} />
    </>
  );
};

export default Home;
