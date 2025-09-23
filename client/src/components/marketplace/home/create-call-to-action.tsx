import Button from "../../ui/button";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function CreateCallToAction() {
  return (
    <div className="mb-12 bg-linear-to-r  from-accent via-accent-fifthy to-accent-firthy rounded-sm h-[350px] p-8 flex items-center justify-between relative">
      <div className="bg-card rounded-full -top-8 ring ring-white/10 shadow left-8 w-24 h-24 flex items-center justify-center z-10 absolute overflow-hidden">
        <img
          src="/pxl-examples/3.svg"
          alt="PXL NFT EXAMPLE"
          className="size-20 mt-7"
        />
      </div>
      <div className="bg-black/30 absolute inset-0 "></div>
      <div className="h-full w-full flex flex-col justify-end items-start gap-y-4 z-10">
        <h2 className="text-7xl font-accent font-black tracking-widest">
          CREATE <br />
          YOUR PXL.
        </h2>
        <Button
          asChild
          className="flex items-center gap-x-1 btn-secondary w-56 justify-center"
        >
          <Link to="/marketplace/create">
            Create now
            <ChevronRight />
          </Link>
        </Button>
      </div>
      <img
        src="/pxl-examples/1.svg"
        alt="PXL NFT EXAMPLE"
        className="size-96 z-20"
      />
      <img
        src="/pxl-examples/2.svg"
        alt="PXL NFT EXAMPLE"
        className="size-80 absolute opacity-30 bottom-0 right-1/5 z-10"
      />
    </div>
  );
}
