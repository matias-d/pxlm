/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classNameContainer?: string;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  loading?: boolean;
  progress?: number;
}

export default function Button({
  classNameContainer,
  className,
  children,
  progress,
  asChild,
  loading,
  ...props
}: ButtonProps) {
  const classes = cn("btn btn-primary", className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      {
        className: cn(classes, (children.props as any).className),
        ...props,
      }
    );
  }

  return (
    <button className={classes} {...props}>
      {loading && (
        <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-spin ">
          <LoaderCircle className="size-7" />
        </span>
      )}

      {progress !== undefined && loading && (
        <div
          className="absolute left-0 top-0 h-full bg-black/25 duration-300 transition-all ease-in-out"
          style={{ width: `${progress}%` }}
        />
      )}

      <span
        className={cn(
          "opacity-100 transition-opacity",
          classNameContainer,
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
    </button>
  );
}
