import type { IPxl } from "@/interfaces/pxl";
import { cartReducer, initialState } from "./reducer/cart/cart-reducer";
import { createContext, useReducer } from "react";
import PxlCart from "@/components/widgets/pxl-cart";

interface ICartContext {
  cart: IPxl[];
  baseCart: IPxl[];
  active: boolean;
  addCart: (pxl: IPxl) => void;
  inCart: (tokenId: number) => boolean;
  removeCart: (tokenId: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<ICartContext>({
  cart: [],
  baseCart: [],
  active: false,
  addCart: () => {},
  inCart: () => false,
  removeCart: () => {},
  clearCart: () => {},
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // === Actions ===
  const addCart = (pxl: IPxl) => {
    dispatch({ type: "SET_CART", payload: pxl });
  };

  const removeCart = (tokenId: number) => {
    dispatch({ type: "REMOVE_CART", payload: tokenId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART", payload: null });
  };

  // === Util reducer functions ===
  const inCart = (tokenId: number) => {
    const found = state.cart.some((item) => item.tokenId === tokenId);
    return found;
  };

  // const onLoading = (value: boolean) =>
  //   dispatch({ type: "SET_LOADING", payload: value });

  // const onError = (value: boolean) =>
  //   dispatch({ type: "SET_ERROR", payload: value });

  return (
    <CartContext.Provider
      value={{
        baseCart: state.baseCart,
        active: state.active,
        cart: state.cart,
        removeCart,
        clearCart,
        addCart,
        inCart,
      }}
    >
      {children}
      <PxlCart />
    </CartContext.Provider>
  );
}
