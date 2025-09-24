import {
  getAttempts,
  MAX_TRIES,
  getTimeUntilNextTry,
} from "@/hooks/create/attemps";
import { Tooltip } from "@/components/ui/tooltip";
import { formatTime } from "@/utils/format-time";
import { Clock, RotateCcw } from "lucide-react";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Props {
  onGeneratePXL: (isTry: boolean) => void;
}

export default function ButtonTry({ onGeneratePXL }: Props) {
  const [attempts, setAttempts] = useState(getAttempts());
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextTry());
  const remaining = Math.max(0, MAX_TRIES - attempts.count);
  const canTryAgain = remaining > 0 || timeLeft === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const newAttempts = getAttempts();
      const newTimeLeft = getTimeUntilNextTry();

      setAttempts(newAttempts);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTooltipContent = () => {
    if (remaining > 0) {
      return `Generate again ${attempts.count}/3`;
    }

    if (timeLeft > 0) {
      return `Try again in ${formatTime(timeLeft)}`;
    }

    return "Try again";
  };

  const getButtonIcon = () => {
    if (remaining > 0 || timeLeft === 0) {
      return remaining > 0 ? (
        <RotateCcw size={18} />
      ) : (
        <RotateCcw size={18} className="text-text-secondary" />
      );
    }

    return <Clock size={18} className="text-text-secondary" />;
  };

  const getButtonClassName = () => {
    const baseClasses =
      "h-12 ring-offset-0 cursor-pointer bg-card-dark shadow-none text-text-primary rounded-md flex items-center justify-center";

    if (!canTryAgain) {
      return `${baseClasses} opacity-50 cursor-not-allowed hover:ring-accent-tertiary`;
    }

    if (remaining > 0) {
      return `${baseClasses} hover:ring-accent-firthy`;
    }

    return `${baseClasses} hover:ring-accent-firthy`;
  };

  return (
    <div className="flex items-center gap-x-2 accent">
      <Tooltip
        content={getTooltipContent()}
        contentClassName="text-xs whitespace-nowrap"
      >
        <Button
          onClick={() => canTryAgain && onGeneratePXL(true)}
          className={getButtonClassName()}
          disabled={!canTryAgain}
        >
          {getButtonIcon()}
        </Button>
      </Tooltip>
    </div>
  );
}
