import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { cn } from "@/lib/cn";
import Card from "./card";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  classNamePanel?: string;
}

export default function DisclousureUI({
  title,
  children,
  className,
  classNamePanel,
}: Props) {
  return (
    <div className="relative">
      <Disclosure>
        <Card className={cn("bg-card-light ", className)}>
          <DisclosureButton className="group cursor-pointer text-xs w-full flex items-center justify-between">
            <p className="group-hover:text-accent transition-colors">{title}</p>
            <ChevronRight className="group-data-open:rotate-90 transition-all group-hover:text-accent" />
          </DisclosureButton>
          <DisclosurePanel className={cn("z-20 mt-2 ", classNamePanel)}>
            {children}
          </DisclosurePanel>
        </Card>
      </Disclosure>
    </div>
  );
}
