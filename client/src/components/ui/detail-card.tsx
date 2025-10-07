import { cn } from "@/lib/cn";
import Card from "./card";

interface Props {
  className?: string;
  title: string;
  value: string;
}

export default function DetailCard({ title, value, className }: Props) {
  return (
    <Card className={cn("bg-card-dark  relative", className)}>
      <p className="text-xs uppercase text-text-secondary font-display font-semibold">
        {title}
      </p>

      <p className="text-sm">{value}</p>
    </Card>
  );
}
