import { icons, LucideProps } from "lucide-react";

export type Icons = keyof typeof icons;

interface IconProps extends LucideProps {
  name: Icons;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name];
  return <LucideIcon {...props} />;
};

export { Icon };
