import { cn } from "../../lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Card({ children, className, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className={cn("bg-card rounded-md border border-border p-4", className)}
    >
      {children}
    </article>
  );
}
