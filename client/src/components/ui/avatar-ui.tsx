import { Frown } from "lucide-react";
import Avatar from "boring-avatars";
import { cn } from "@/lib/cn";

interface Props {
  username: string | undefined;
  size?: number;
  className?: string;
  loading: boolean;
  error: boolean;
}

export default function AvatarUI({
  username,
  size = 32,
  className,
  loading,
  error,
}: Props) {
  if (error)
    return (
      <div className="bg-card-super-light rounded-full opacity-40">
        <Frown size={size} />{" "}
      </div>
    );

  return loading ? (
    <div className=" bg-card-super-light rounded-full opacity-40">
      <img
        src="/pxl-examples/8.svg"
        style={{ width: size, height: size }}
        className="animate-pulse"
      />
    </div>
  ) : (
    <Avatar
      name={username || "Uknowed name"}
      size={size}
      variant="pixel"
      className={cn("", className)}
      colors={["#ac6aff", "#ffc876", "#ff776f", "#858dff", "#ff98e2"]}
    />
  );
}
