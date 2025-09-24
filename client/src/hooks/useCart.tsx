import { CartContext } from "@/context/cart-provider";
import { useContext } from "react";

export default function useCart() {
  const context = useContext(CartContext);

  if (!context)
    throw new Error(
      "PROVIDER ERROR: useCart must be used within a CartContext"
    );

  return useContext(CartContext);
}
