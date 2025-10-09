import Drawer from "../marketplace/home/purchase/drawer";
import useDrawer from "@/hooks/useDrawer";
import useCart from "@/hooks/useCart";
import Button from "../ui/button";
import { cn } from "@/lib/cn";

export default function PxlCart() {
  const { isOpen, onOpenDrawer, closeDrawer } = useDrawer();
  const { active, clearCart, cart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);
  return (
    <>
      <div
        className={cn(
          "fixed bottom-0  left-0 w-full h-[100px] md:h-[56px] bg-card z-40 border-t border-border transition-all duration-400 ease-in-out",
          active ? "bottom-0" : "-bottom-full"
        )}
      >
        <section className="max-container p-2 flex md:flex-row flex-col lg:items-center gap-2 md:gap-4">
          <div className="flex items-center">
            {cart.map((item, i) => (
              <img
                key={item.tokenId}
                src={item.image}
                className={cn(
                  "size-9 lg:size-10 rounded-sm border border-border",
                  i > 0 && "-ml-2"
                )}
                alt={`PXL Media #${item.tokenId}`}
              />
            ))}
          </div>
          <span className="w-[1px] h-8 bg-border hidden md:block"></span>
          <div className="flex items-center justify-between md:gap-4 ">
            <div className="flex items-center gap-x-4">
              <Button onClick={onOpenDrawer} className="text-xs h-4 font-bold">
                Buy {cart.length} now
              </Button>
              <p className="text-text-primary/90 text-sm">
                {totalPrice.toFixed(4)} TBNB
              </p>
            </div>
            <span className="w-[1px] h-8 bg-border hidden md:block"></span>
            <Button
              onClick={() => {
                closeDrawer();
                clearCart();
              }}
              className="text-xs h-4 font-bold btn-secondary px-2"
            >
              Clear
            </Button>
          </div>
        </section>
      </div>
      <Drawer items={cart} onOpen={onOpenDrawer} open={isOpen} />
    </>
  );
}
