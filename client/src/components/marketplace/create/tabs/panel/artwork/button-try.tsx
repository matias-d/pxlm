import Button from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { getAttempts } from "@/hooks/create/useCreate";
import { Clock, RotateCcw } from "lucide-react";

interface Props {
  onGeneratePXL: (isTry: boolean) => void;
}

export default function ButtonTry({ onGeneratePXL }: Props) {
  const attempts = getAttempts();
  const maxAttempts = 3;
  const remaining = Math.max(0, maxAttempts - attempts.count);

  return (
    <div className="flex items-center gap-x-2">
      {remaining === 0 ? (
        <p className="text-xs text-orange-400 font-semibold">MAX</p>
      ) : (
        <p className="text-xs text-text-secondary">
          {remaining} {remaining === 1 ? "try" : "tries"} left
        </p>
      )}

      {remaining === 0 && (
        <Tooltip
          content="Please wait to try again"
          contentClassName="bg-card-super-light text-xs whitespace-nowrap"
        >
          <button
            onClick={() => onGeneratePXL(true)}
            className="opacity-50 hover:opacity-100 p-4 cursor-pointer bg-blue-500/20 text-blue-500 rounded-md"
          >
            <Clock size={18} />
          </button>
        </Tooltip>
      )}

      {remaining > 0 && (
        <Tooltip
          content="Generate again"
          contentClassName="bg-card-super-light text-xs"
        >
          <Button
            onClick={() => onGeneratePXL(true)}
            className="h-12 ring-offset-0 cursor-pointer bg-accent/20 text-accent rounded-md"
          >
            <RotateCcw size={18} />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
