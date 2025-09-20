import AvatarUI from "../ui/avatar-ui";
import PXLImage from "../ui/pxl-image";
import Button from "../ui/button";
import { cn } from "@/lib/cn";
import Card from "../ui/card";
import { Sparkle } from "lucide-react";

export default function PxlCard() {
  return (
    <Card className="group relative overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out ">
      <PXLImage src="/pxl-examples/6.svg" alt="PXL ART" className="w-full " />
      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-x-1 font-semibold ">
          <h2 className="text-text-primary  ">PXL ART</h2>
          <p className="font-display">#0212</p>
        </div>

        <div className="flex items-center gap-x-1">
          <p className="font-display text-indigo-500 text-sm font-semibold bg-card-super-light px-1 rounded-md flex items-center gap-x-1">
            <Sparkle size={15} />
            #0212
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-x-2 font-semibold mb-0.5">
          <p className="font-display">1.50</p>
          <p className="text-text-secondary">TBNB</p>
        </div>
        <div className="flex items-center gap-x-1 text-xs font-semibold">
          <p className=" text-text-secondary">Last sale</p>
          <p className="font-display ">
            1.40 <span className="text-text-secondary font-primary">TBNB</span>
          </p>
        </div>
      </div>

      <div
        className={cn(
          "absolute -bottom-full group-hover:bottom-0 transition-all duration-300 ease-in-out w-full left-0"
        )}
      >
        <Button
          className="w-full h-14 text-base flex items-center rounded-none"
          classNameContainer="text-sm flex items-center justify-between w-full font-semibold "
        >
          <span>Buy Now</span>
          <p>
            1.40 <span className="font-primary">TBNB</span>
          </p>
        </Button>
      </div>
    </Card>
  );
}
