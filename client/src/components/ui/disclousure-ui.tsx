import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { cn } from "@/lib/cn";
import Card from "./card";
import { ChevronRight } from "lucide-react";

interface Props {
  icon?: React.ReactNode;
  children: React.ReactNode;
  classNameButton?: string;
  classNamePanel?: string;
  className?: string;
  title: string;
}

export default function DisclousureUI({
  icon,
  title,
  children,
  className,
  classNamePanel,
  classNameButton,
}: Props) {
  return (
    <div className="relative">
      <Disclosure>
        <Card className={cn("bg-card-light ", className)}>
          <DisclosureButton
            className={cn(
              "group cursor-pointer text-xs w-full flex items-center justify-between hover:text-accent transition-colors ",
              classNameButton
            )}
          >
            <div className="flex items-center gap-x-3">
              {icon && (
                <div className="border  border-border size-8 rounded-sm flex items-center justify-center">
                  <span className=" bg-card-super-light p-1.5 border border-border rounded-sm">
                    {" "}
                    {icon}
                  </span>
                </div>
              )}
              <span>{title}</span>
            </div>
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
