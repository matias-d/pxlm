import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { cn } from "../../lib/cn";
import Card from "./card";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  classNameCard?: string;
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  disableOutsideClick?: boolean;
}

export default function Modal({
  isOpen,
  onOpen,
  description,
  title,
  className,
  children,
  classNameCard,
  disableOutsideClick = false,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (!disableOutsideClick) {
          onOpen();
        }
      }}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30  transition-opacity "
        onClick={() => {
          if (!disableOutsideClick) onOpen();
        }}
      >
        <Transition appear show={isOpen}>
          <DialogPanel
            className={cn(
              "transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className={cn("max-w-xl ", classNameCard)}>
              {title && (
                <DialogTitle className="font-bold font-accent">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <Description className="text-text-secondary my-2 font-display">
                  {description}
                </Description>
              )}
              {children}
            </Card>
          </DialogPanel>
        </Transition>
      </div>
    </Dialog>
  );
}
