import { ArrowLeftToLine } from "lucide-react";
import { Tooltip } from "../../../ui/tooltip";
import PXLImage from "../../../ui/pxl-image";
import Textarea from "../../../ui/textarea";
import Button from "../../../ui/button";
import Card from "../../../ui/card";
import Input from "../../../ui/input";
import CardDark from "../card-dark";

interface Props {
  onNextStep: () => void;
}

export default function Customize({ onNextStep }: Props) {
  return (
    <section className="w-3xl">
      <Card className=" grid grid-cols-2 p-6 ">
        <div className="w-full space-y-4 relative">
          <PXLImage src="/pxl-examples/6.svg" alt="PXL ART" />
          <div className="grid grid-cols-2 gap-2 ">
            <CardDark
              title="hat"
              value="Beani"
              className="p-2 w-32"
              classNameValue="text-xs"
            />
            <CardDark
              title="accesory"
              value="Drilling small"
              className="p-2 w-32"
              classNameValue="text-xs"
            />
            <CardDark
              title="glasses"
              value="Dark glasses"
              className="p-2 w-32"
              classNameValue="text-xs"
            />
            <CardDark
              title="beard"
              value="Low beard"
              className="p-2 w-32"
              classNameValue="text-xs"
            />
          </div>
        </div>
        <form className="w-full flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg font-accent flex mb-4 text-accent">
              Customize your PXL ART
            </h2>
            <div className="mb-5">
              <h4 className="font-semibold mb-1.5 text-sm">NAME</h4>
              <Input
                label="Name of PXL ART"
                type="text"
                value={"PXL ART #0000"}
                disabled
                className="font-semibold"
              />
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-1.5 text-sm">Description</h4>
              <Textarea
                label="Description of PXL ART"
                required
                placeholder="Alfred a pxl art man with black glasses and..."
              />
            </div>

            <div>
              <h4 className="font-semibold mb-1.5 text-sm">Price</h4>
              <Input
                label="Price in TBNB"
                type="number"
                required
                value={1.4}
                placeholder="0.001"
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <Tooltip content="Back">
              <Button className=" h-12 px-4 text-base ">
                <ArrowLeftToLine />
              </Button>
            </Tooltip>
            <Button onClick={onNextStep} className="h-12 text-base">
              Next
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
