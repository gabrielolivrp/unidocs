"use client";

import Link from "next/link";
import { Typography } from "@unidocs/ui";
import { SwitchTheme } from "./switch-theme";
import { WalletButton } from "./wallet-button";

const Header = () => (
  <div className="border-b py-4 mb-4">
    <div className="container flex items-center justify-between">
      <Link href="/">
        <Typography as="h5">unidocs</Typography>
      </Link>

      <div className="flex items-center space-x-4">
        <SwitchTheme />
        <WalletButton />
      </div>
    </div>
  </div>
);

export { Header };
