import Button from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { getAttempts } from "@/hooks/create/useCreate";
import { Clock, RotateCcw } from "lucide-react";

interface Props {
  onGeneratePXL: (isTry: boolean) => void;
}

export default function ButtonTry({ onGeneratePXL }: Props) {
  const attempts = getAttempts();

  return (
    <div className="flex items-center gap-x-2">
      {attempts.count >= 3 ? (
        <p className="text-xs text-orange-400 font-semibold">MAX</p>
      ) : (
        <p className="text-xs text-text-secondary">
          <b className="text-accent">{attempts.count}</b> try:{" "}
        </p>
      )}

      {attempts.count >= 3 && (
        <Tooltip
          content="Please wait to try again"
          contentClassName="bg-card-super-light text-xs whitespace-nowrap"
        >
          <button
            onClick={() => onGeneratePXL(true)}
            className="opacity-50 hover:opacity-100 tra  p-4 cursor-pointer bg-blue-500/20  text-blue-500 rounded-md"
          >
            <Clock size={18} />
          </button>
        </Tooltip>
      )}

      {attempts.count < 3 && (
        <Tooltip
          content="Generate again"
          contentClassName="bg-card-super-light text-xs"
        >
          <Button
            onClick={() => onGeneratePXL(true)}
            className="h-12 ring-offset-0  cursor-pointer bg-accent/20 text-accent rounded-md"
          >
            <RotateCcw size={18} />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
