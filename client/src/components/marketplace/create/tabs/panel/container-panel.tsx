import type { IState } from "@/hooks/create/useCreate";
import PXLImage from "@/components/ui/pxl-image";
import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  classPXLImage?: string;

  pxl: IState;
}

export default function ContainerPanel({
  children,
  className,
  classPXLImage,
  pxl,
}: Props) {
  return (
    <section>
      <Card className={cn(" grid grid-cols-2 p-6  gap-x-6 ", className)}>
        <PXLImage
          src={pxl.url}
          alt="PXL ART"
          className={cn("object-cover w-[25rem] h-[27.5rem] ", classPXLImage)}
        />

        {children}
      </Card>
    </section>
  );
}
