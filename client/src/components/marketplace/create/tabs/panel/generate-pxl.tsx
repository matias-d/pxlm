import Button from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props {
  onGeneratePXL: (isTry: boolean) => void;
}

export default function GeneratePXL({ onGeneratePXL }: Props) {
  return (
    <section className="flex items-center flex-col ">
      <div className="flex flex-col items-center gap-y-1 mb-6">
        <div className="flex items-center  mb-1 gap-x-3">
          <div className="glow-animate size-2 rounded-full bg-emerald-300  animate-pulse drop-shadow-[0_0_5px_rgba(80,200,120,1)] text-emerald-300" />
          <span className="text-xs text-emerald-300">Active</span>
        </div>
        <h2 className="font-display font-bold text-lg lg:text-2xl">
          Generate your PXL ART
        </h2>
        <p className="text-text-secondary text-sm font-display lg:text-lg max-w-2xl text-center">
          Each PXL ART is generated entirely at random, combining a variety of
          rarities and attributes such as colors, shapes, and patterns.
        </p>
      </div>
      <Button
        onClick={() => onGeneratePXL(false)}
        className="mb-24"
        classNameContainer=" gap-x-2 font-accent  px-4 text-lg lg:text-xl flex items-center gap-x-3"
      >
        Generate PXL
        <Sparkles className="size-4 group-hover:scale-110 transition-transform duration-200 delay-75" />
      </Button>

      <div className="max-w-2xl  text-text-secondary/80 text-center flex flex-col gap-y-1 items-center">
        <span className="text-[10px] bg-yellow-600/10 text-yellow-500 px-2 py-1 rounded-md">
          Info
        </span>
        <p className=" rounded-md text-sm lg:text-base font-display">
          💡 You have only 3 chances to generate your PXL ART. Once you’ve used
          all of them, you’ll need to wait a while before trying again — so make
          each attempt count!
        </p>
      </div>
    </section>
  );
}
