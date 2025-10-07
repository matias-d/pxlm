import Button from "@/components/ui/button";
import { Dot, Frown } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex-col gap-y-6 max-container flex items-center justify-center py-4">
      <Frown className="size-16 text-text-secondary" />
      <h1 className="font-bold text-4xl text-text-secondary flex items-center">
        404 <Dot className="size-12" />{" "}
        <span className="text-text-primary">PAGE NOT FOUND</span>
      </h1>
      <div>
        <Button className="px-6" asChild>
          <Link to="/marketplace">Go to marketplace</Link>
        </Button>
      </div>
    </main>
  );
}
