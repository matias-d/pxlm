import { BadgeCheck } from "lucide-react";

export default function Logo() {
  return (
    <h1 className="font-accent font-bold text-lg tracking-widest flex items-center gap-x-1">
      PXLM <BadgeCheck className="text-accent lg:size-6 size-5" />
    </h1>
  );
}
