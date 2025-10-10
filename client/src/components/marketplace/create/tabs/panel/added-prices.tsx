import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CircleAlert } from "lucide-react";
import React from "react";

interface Props {
  addedPrices: {
    bonus: number;
    name: string;
    color: string;
  }[];
}

export default function AddedPrices({ addedPrices }: Props) {
  return (
    <Popover className="relative">
      <Tooltip content="Fixed prices" className="whitespace-nowrap">
        <PopoverButton className="cursor-pointer hover:bg-card rounded-full p-1 transition-all">
          <CircleAlert />
        </PopoverButton>
      </Tooltip>
      <PopoverPanel
        modal={false}
        anchor="bottom"
        className="flex flex-col bg-card-dark min-w-[180px] rounded-md border border-border mt-1"
      >
        {addedPrices.map((item, index) => (
          <React.Fragment key={`${item.name} ${index}`}>
            <div
              className={cn(
                " text-xs   gap-x-1 flex items-center p-2 border-b border-border hover:bg-card transition-colors",
                addedPrices.length - 1 === index && "border-b-0"
              )}
            >
              <p className="text-green-300 font-semibold font-display">
                +{item.bonus.toFixed(3)}
              </p>
              <p
                className={cn("text-gray-400 text-[8px] uppercase", item.color)}
              >
                {item.name}
              </p>
            </div>
          </React.Fragment>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
