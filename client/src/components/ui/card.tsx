import { cn } from "../../lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <article
      className={cn("bg-card rounded-md border border-border p-4", className)}
    >
      {children}
    </article>
  );
}
