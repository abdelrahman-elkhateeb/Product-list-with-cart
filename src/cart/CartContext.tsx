import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react"
import type { CartAction, CartItem } from "../types";
import { cartReducer } from "./cartReducer";

type CartContextValue = {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | null>(null);


export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>")
  return ctx;
}