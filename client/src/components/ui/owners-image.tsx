import { BadgeCheck } from "lucide-react";
import AvatarUI from "./avatar-ui";
import { Tooltip } from "./tooltip";
import type { IPxl } from "@/interfaces/pxl";
import useMarketplace from "@/hooks/useMarketplace";

interface Props {
  pxl: IPxl;
}

export default function OwnersImage({ pxl }: Props) {
  const { addressMP } = useMarketplace();

  return (
    <div className="absolute right-1 -bottom-2.5 flex items-center">
      {pxl.seller !== pxl.owner && (
        <Tooltip content="Seller" contentClassName="text-[10px]">
          <AvatarUI
            className="ring-2 ring-card rounded-full"
            username={pxl.seller}
            size={28}
          />
        </Tooltip>
      )}

      {pxl.owner !== addressMP && (
        <div className="relative -ml-2 mt-2">
          <Tooltip content="Owner " contentClassName="text-[10px]">
            <AvatarUI
              className="ring-2 ring-card rounded-full"
              username={pxl.owner}
              size={28}
            />
            <BadgeCheck
              className="absolute -bottom-1.5 -right-1.5 text-card"
              fill="#ff98e2"
              size={18}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
