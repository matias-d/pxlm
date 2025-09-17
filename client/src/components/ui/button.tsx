import { cn } from "../../lib/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  classNameContainer?: string;
}

export default function Button({
  asChild,
  className,
  children,
  classNameContainer,
  ...props
}: ButtonProps) {
  const classes = cn("btn-primary", className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      <span className={cn("relative", classNameContainer)}>{children}</span>
    </button>
  );
}
