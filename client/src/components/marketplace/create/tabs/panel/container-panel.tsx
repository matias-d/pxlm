import SpecialCombo from "@/components/ui/special-combo";
import type { IPxlCreate } from "@/interfaces/pxl";
import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  classPXLImage?: string;

  pxl: IPxlCreate;
}

export default function ContainerPanel({ children, className, pxl }: Props) {
  return (
    <section>
      <Card className={cn(" grid grid-cols-2 p-6  gap-x-6 ", className)}>
        <div className="group relative inline-flex overflow-hidden rounded-md w-[25rem] h-[27.5rem] ">
          <img
            src={pxl.url}
            alt={"PXL GENERATE BY DICEBEAR"}
            loading="lazy"
            className={cn(" object-cover shadow w-full", className)}
          />
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>

          <SpecialCombo bonuses={pxl.bonuses} />
        </div>

        {children}
      </Card>
    </section>
  );
}
