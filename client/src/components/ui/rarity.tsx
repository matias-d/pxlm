import { cn } from "@/lib/cn";

interface Props {
  rarity: number;
}

const getRarity = (rarity: number) => {
  if (rarity >= 250)
    return {
      label: "legendary",
      class: "bg-yellow-600/30 text-yellow-500",
    };
  if (rarity >= 200)
    return { label: "epic", class: "bg-indigo-600/30 text-indigo-500" };
  if (rarity >= 150)
    return { label: "rare", class: "bg-sky-600/30 text-sky-500" };
  if (rarity >= 120)
    return { label: "uncommon", class: "bg-lime-600/30 text-lime-500" };
  return { label: "common", class: "bg-gray-600/30 text-gray-500" };
};

export default function Rarity({ rarity }: Props) {
  const options = getRarity(rarity);

  return (
    <p
      className={cn(
        "text-sm px-1 rounded-sm font-display font-semibold flex items-center gap-x-0.5 uppercase group relative overflow-hidden ",
        options.class,
        rarity >= 250 && "shake-animate"
      )}
    >
      {options.label}
      {rarity >= 250 && (
        <div className="absolute inset-0 flex h-full w-full justify-center animate-shine">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      )}
    </p>
  );
}
