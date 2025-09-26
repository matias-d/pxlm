import PXLCard from "@/components/ui/pxl-card";
import PXLImage from "@/components/ui/pxl-image";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Link } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Card from "./card";

interface Props {
  renderButtonClose?: (onClose: () => void) => React.ReactNode;
  renderHandleNext?: (
    onNext: () => void,
    isLastItem: boolean
  ) => React.ReactNode;
  children?: React.ReactNode;
  disableOutsideClick?: boolean;
  className?: string;
  onOpen: () => void;
  title?: string;
  items: IPxl[];
  open: boolean;
}

export default function ModalSave({
  disableOutsideClick = false,
  renderButtonClose,
  renderHandleNext,
  className,
  children,
  onOpen,
  title,
  items,
  open,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    setCurrentIndex(0);
    onOpen();
  };

  const isLastItem = currentIndex === items.length - 1;

  return (
    <Modal
      isOpen={open}
      onOpen={handleClose}
      disableOutsideClick={disableOutsideClick}
      classNameCard="bg-card-light flex flex-col justify-between w-[24rem]"
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-accent  text-text-primary/80">
            Your news PXL!
          </h2>
          <span className="text-sm text-text-secondary">
            {currentIndex + 1} of {items.length}
          </span>
        </div>
      )}

      <div className="relative flex justify-center mb-6 h-80">
        {items.map((pxl, index) => {
          const isActive = index === currentIndex;
          const isBehind = index < currentIndex;

          return (
            <div
              key={pxl.tokenId}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                zIndex: isActive ? 10 : isBehind ? 0 : 5,
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateY(0) scale(1)"
                  : "translateY(20px) scale(0.95)",
                visibility: isActive ? "visible" : "hidden",
              }}
            >
              <PXLCard.Card tokenId={pxl.tokenId}>
                <PXLImage
                  classNameContainer="size-[18.75rem] bg-card-super-light"
                  alt={`PXL Media #${pxl.tokenId}`}
                  pxl={pxl}
                />
                <PXLCard.Info
                  rarity_score={pxl.rarity_score}
                  tokenId={pxl.tokenId}
                />
                <PXLCard.PriceDetails price={pxl.price} isSold={pxl.sold} />
                <PXLCard.FooterContent>
                  <Button
                    asChild
                    className="w-full h-14 text-base flex items-center rounded-none"
                  >
                    <Link to="/marketplace/collection">My collection</Link>
                  </Button>
                </PXLCard.FooterContent>
              </PXLCard.Card>
            </div>
          );
        })}
      </div>
      <Card className="z-50 mt-24">
        <div
          className={cn(
            "flex justify-between",

            isLastItem && "justify-end",
            className
          )}
        >
          {children}
          {renderButtonClose && renderButtonClose(handleClose)}
          {renderHandleNext && renderHandleNext(handleNext, isLastItem)}
        </div>
      </Card>
    </Modal>
  );
}
