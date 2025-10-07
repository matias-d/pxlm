import { cn } from "@/lib/cn";

interface Props {
  addedPrices: {
    bonus: number;
    name: string;
    color: string;
  }[];
}

export default function AddedPrices({ addedPrices }: Props) {
  return (
    <div className="flex  gap-x-1.5 items-center">
      {addedPrices.map((item, index) => (
        <>
          <div
            className="flex flex-col text-[10px]  items-end gap-x-1"
            key={`${item.name} ${item.bonus + index}`}
          >
            <p className="text-green-300 font-semibold font-display">
              +{item.bonus.toFixed(3)}
            </p>
            <p
              className={cn("text-gray-400 text-[7.2px] uppercase", item.color)}
            >
              {item.name}
            </p>
          </div>
          {index !== addedPrices.length - 1 && (
            <div className="h-6 w-[1.2px] bg-border"></div>
          )}
        </>
      ))}
    </div>
  );
}
