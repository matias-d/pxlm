import { Frown } from "lucide-react";
import Avatar from "boring-avatars";
import { cn } from "@/lib/cn";
import useMarketplace from "@/hooks/useMarketplace";

interface Props {
  username: string | undefined;
  className?: string;
  size?: number;
}

export default function AvatarUI({ username, size = 32, className }: Props) {
  const { loading, error } = useMarketplace();

  if (error)
    return (
      <div className="bg-card-super-light rounded-full opacity-40">
        <Frown size={size} />{" "}
      </div>
    );

  return loading ? (
    <div className=" bg-card-super-light rounded-full opacity-40">
      <img
        src="/assets/art-loading-avatar.svg"
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
