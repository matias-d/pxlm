import { useDisableScroll } from "@/hooks/useDisabelScroll";
import Card from "@/components/ui/card";

export default function PXLDetail() {
  useDisableScroll(true);

  return (
    <>
      <div className="fixed inset-0 top-1/2 -translate-y-1/2 max-w-[calc(100vw-8rem)] mx-auto h-[calc(100vh-4rem)] z-30 ">
        <Card className="h-full">HOla</Card>
      </div>
      <div className="fixed inset-0 h-screen w-full bg-black/40 z-20"></div>
    </>
  );
}
