import { cn } from "../../../lib/cn";
import Card from "../../ui/card";

interface Props {
  title: string;
  value: string;
  className?: string;
  classNameValue?: string;
}

export default function CardDark({
  title,
  value,
  className,
  classNameValue,
}: Props) {
  return (
    <Card className={cn("bg-card-dark w-44", className)}>
      <p className="text-xs uppercase text-text-secondary font-display font-semibold">
        {title}
      </p>
      <p className={cn("text-sm", classNameValue)}>{value}</p>
    </Card>
  );
}
