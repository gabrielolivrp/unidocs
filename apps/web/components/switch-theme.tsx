import { useTheme } from "next-themes";
import { Button, Icon, Case, Switch } from "@unidocs/ui";

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();
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
