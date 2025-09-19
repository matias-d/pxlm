import Button from "../ui/button";
import PxlCard from "./pxl-card";
import Error from "../ui/error";
import { cn } from "@/lib/cn";

interface Props {
  items: number[];
  className?: string;
  loading: boolean;
  error: boolean;
  renderLoading: () => React.ReactNode;
}

export default function PxlList({
  items,
  loading,
  className,
  renderLoading,
  error,
}: Props) {
  if (loading) return renderLoading();

  if (error)
    return (
      <Error
        action={() => (
          <Button asChild className="h-12 text-sm ">
            Try again
          </Button>
        )}
        title="505 | A network error has occurred"
      />
    );
  return (
    <section className={cn("grid grid-cols-4 gap-4", className)}>
      {items.map((pxl) => (
        <PxlCard key={pxl} />
      ))}
    </section>
  );
}
