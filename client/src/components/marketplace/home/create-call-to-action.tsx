import Button from "../../ui/button";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function CreateCallToAction() {
  return (
    <div className="mb-12 bg-linear-to-r  from-accent via-accent-fifthy to-accent-firthy rounded-sm h-[350px] p-6 lg:p-8 flex items-center justify-between relative">
      <div className="bg-card rounded-full -top-8 ring ring-white/10 shadow right-0 lg:right-auto lg:left-8 w-24 h-24 flex items-center justify-center z-10 absolute overflow-hidden">
        <img
          src="/assets/art-background-3.svg"
          alt="PXL NFT EXAMPLE"
          className="size-20 mt-7"
        />
      </div>
      <div className="bg-black/30 absolute inset-0 "></div>
      <div className="h-full w-full flex flex-col lg:justify-end items-start gap-y-4 z-10">
        <h1 className="text-3xl md:text-4xl lg:text-7xl font-accent font-black tracking-widest">
          CREATE <br />
          YOUR PXL.
        </h1>
        <Button
          asChild
          className="flex items-center gap-x-1 btn-secondary lg:w-56 justify-center"
        >
          <Link to="/marketplace/create">
            Create now
            <ChevronRight />
          </Link>
        </Button>
      </div>

      <div></div>
      <img
        src="/assets/art-background.svg"
        alt="PXL NFT EXAMPLE"
        className="size-36 md:size-56 lg:size-96 z-20 absolute lg:static right-0 bottom-0"
      />
      <img
        src="/assets/art-background-2.svg"
        alt="PXL NFT EXAMPLE"
        className="size-36 md:size-40 lg:size-80 absolute lg:opacity-30 bottom-0 left-0 lg:left-auto lg:right-1/5 z-10"
      />
    </div>
  );
}
