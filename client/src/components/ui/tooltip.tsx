import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

interface Props {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  disabled?: boolean;
}

export const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 300,
  className = "",
  contentClassName = "",
  arrow = true,
  disabled = false,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let newPosition = position;

      // Check if tooltip fits in the preferred position
      const spaceTop = triggerRect.top;
      const spaceBottom = viewport.height - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewport.width - triggerRect.right;

      // Adjust position based on available space
      if (position === "top" && spaceTop < tooltipRect.height + 10) {
        newPosition = "bottom";
      } else if (
        position === "bottom" &&
        spaceBottom < tooltipRect.height + 10
      ) {
        newPosition = "top";
      } else if (position === "left" && spaceLeft < tooltipRect.width + 10) {
        newPosition = "right";
      } else if (position === "right" && spaceRight < tooltipRect.width + 10) {
        newPosition = "left";
      }

      setActualPosition(newPosition);
    }
  }, [isVisible, position]);

  const getTooltipClasses = () => {
    const baseClasses =
      "absolute z-30 text-center px-3 py-2 text-xs font-display font-medium text-text-primary/80 bg-card-super-light rounded-md shadow-lg pointer-events-none transition-all  transform";

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
      bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
      left: "right-full top-1/2 -translate-y-1/2 -translate-x-2",
      right: "left-full top-1/2 -translate-y-1/2 translate-x-2",
    };

    const visibilityClasses = isVisible
      ? "opacity-100 visible scale-100"
      : "opacity-0 invisible scale-95";

    return cn(
      baseClasses,
      positionClasses[actualPosition],
      visibilityClasses,
      contentClassName
    );
  };

  const getArrowClasses = () => {
    if (!arrow) return "hidden";

    const arrowClasses = {
      top: `top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-card-super-light`,
      bottom: `bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-card-super-light`,
      left: `left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-card-super-light`,
      right: `right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-card-super-light`,
    };

    return cn("absolute w-0 h-0 border-4", arrowClasses[actualPosition]);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!content || disabled) {
    return children;
  }

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={triggerRef}
    >
      {children}

      <div ref={tooltipRef} className={getTooltipClasses()} role="tooltip">
        {content}
        <div className={getArrowClasses()} />
      </div>
    </div>
  );
};
