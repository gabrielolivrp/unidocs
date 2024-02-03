"use client";
import { useTheme } from "next-themes";
import { useWeb3ModalTheme } from "@web3modal/wagmi/react";
import { Button, Icon, Case, Switch } from "@unidocs/ui";
import { useEffect } from "react";

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();
  const { setThemeMode } = useWeb3ModalTheme();

  useEffect(() => {
    setThemeMode(theme as "dark" | "light");
  }, [theme]);

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Switch value={theme}>
        <Case value="dark">
          <Icon name="Moon" />
        </Case>
        <Case value="light">
          <Icon name="SunMoon" />
        </Case>
      </Switch>
    </Button>
  );
};

export { SwitchTheme };
