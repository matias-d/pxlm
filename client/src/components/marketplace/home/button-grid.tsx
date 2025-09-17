import { LayoutGrid, TableProperties } from "lucide-react";
import { useState } from "react";

export default function ButtonGrid() {
  const [view, setView] = useState<"grid" | "tabla">("grid");

  const onView = () => setView((prev) => (prev === "grid" ? "tabla" : "grid"));

  return (
    <button
      onClick={onView}
      className="bg-card-light h-14 px-4 rounded-md text-text-secondary border-2  border-border hover:text-text-primary transition-colors cursor-pointer"
    >
      {view === "grid" ? (
        <LayoutGrid size={26} />
      ) : (
        <TableProperties size={26} />
      )}
    </button>
  );
}
