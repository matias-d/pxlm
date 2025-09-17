import Avatar from "boring-avatars";
import { cn } from "../../lib/cn";

interface Props {
  username: string;
  size?: number;
  className?: string;
}

export default function AvatarUI({ username, size = 32, className }: Props) {
  return (
    <Avatar
      name={username}
      size={size}
      variant="pixel"
      className={cn("", className)}
      colors={["#ac6aff", "#ffc876", "#ff776f", "#858dff", "#ff98e2"]}
    />
  );
}
