import PxlCard from "@/components/widgets/pxl-card";
import { Tooltip } from "@/components/ui/tooltip";
import PXLImage from "@/components/ui/pxl-image";
import { ArrowLeftToLine } from "lucide-react";
import Button from "@/components/ui/button";
import Error from "@/components/ui/error";
import Modal from "@/components/ui/modal";
import Card from "@/components/ui/card";
import CardDark from "../../trait-card";
import confetti from "canvas-confetti";
import { Link } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  onPrevStep: () => void;
}

export default function Save({ onPrevStep }: Props) {
  const error = false;
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (!open)
      confetti({
        particleCount: Math.floor(200 * 0.25),
        spread: 26,
        origin: { y: 0.7 },
        startVelocity: 55,
      });

    setOpen(!open);
  };

  if (error)
    return (
      <Error
        action={() => (
          <Button asChild className="h-12 text-sm ">
            Try again
          </Button>
        )}
        title="505 | A network error has occurred"
      />
    );

  return (
    <>
      <section>
        <Card className="p-6">
          <h2 className="font-accent font-semibold text-xl text-accent mb-4">
            Resume
          </h2>
          <div className="flex items-start gap-x-6">
            <PXLImage
              src="/pxl-examples/6.svg"
              alt="PXL ART"
              className="h-[29rem] object-cover w-auto"
            />
            <section className="flex flex-col gap-y-4">
              <div>
                <h4 className="font-display mb-2 font-semibold text-sm">
                  TRAITS <span className="text-text-secondary">4</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <CardDark title="hat" value="Beani" />
                  <CardDark title="accesory" value="Drilling small" />
                  <CardDark title="glasses" value="Dark glasses" />
                  <CardDark title="beard" value="Low beard" />
                </div>
              </div>
              <div>
                <h4 className="font-display mb-2 font-semibold text-sm">
                  DETAILS
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <CardDark title="name" value="PXL ART #0000" />
                  <CardDark title="price" value="0.4 TBNB" />
                  <CardDark
                    title="description"
                    value=" Charles a PXL ART man with gl...."
                    classNameValue="w-32 truncate"
                  />
                  <CardDark title="owner" value="@Matias" />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <Tooltip content="Back" contentClassName="bg-card-super-light">
                  <Button
                    onClick={onPrevStep}
                    className="h-12  flex items-center justify-center px-4 text-base "
                  >
                    <ArrowLeftToLine />
                  </Button>
                </Tooltip>
                <Button
                  onClick={onOpen}
                  className="h-12 flex items-center justify-center"
                >
                  🎉 Save
                </Button>
              </div>
            </section>
          </div>
        </Card>
      </section>
      <ModalSave error={error} open={open} onOpen={onOpen} />
    </>
  );
}

// Modal Presentation PXL CARD
const ModalSave = ({
  open,
  onOpen,
  error,
}: {
  open: boolean;
  error: boolean;
  onOpen: () => void;
}) => {
  return (
    <Modal
      isOpen={open}
      onOpen={onOpen}
      classNameCard="bg-card-light flex flex-col justify-between p-6"
    >
      <PxlCard />

      <div className={cn("flex justify-between mt-4", error && "justify-end")}>
        {!error && (
          <Button
            asChild
            className="btn-display text-base h-12 "
            onClick={onOpen}
          >
            <Link to="/marketplace/create">Try again</Link>
          </Button>
        )}

        <Button asChild className="text-base h-12 " onClick={onOpen}>
          <Link to="/marketplace">Home</Link>
        </Button>
      </div>
    </Modal>
  );
};
