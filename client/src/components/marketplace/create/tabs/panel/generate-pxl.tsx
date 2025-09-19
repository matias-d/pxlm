import Button from "@/components/ui/button";

interface Props {
  onGeneratePXL: (isTry: boolean) => void;
}

export default function GeneratePXL({ onGeneratePXL }: Props) {
  return (
    <section className="flex items-center flex-col ">
      <div className="flex flex-col items-center gap-y-1 mb-6">
        <h2 className="font-display font-bold text-2xl">
          Generate your PXL ART
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl text-center">
          Each PXL ART is generated entirely at random, combining a variety of
          rarities and attributes such as colors, shapes, and patterns.
        </p>
      </div>
      <Button
        onClick={() => onGeneratePXL(false)}
        className="mb-24"
        classNameContainer=" gap-x-2 font-accent px-4 text-xl "
      >
        Generate PXL
      </Button>

      <div className="max-w-2xl  text-text-secondary/80 text-center flex flex-col gap-y-1 items-center">
        <span className="text-[10px] bg-yellow-300/10 text-yellow-500 px-2 py-1 rounded-md">
          Warning
        </span>
        <p>
          You have only <b className="text-accent/60">3</b> chances to generate
          your PXL ART. Once you’ve used all of them, you’ll need to wait a
          while before trying again — so make each attempt count!
        </p>
      </div>
    </section>
  );
}
