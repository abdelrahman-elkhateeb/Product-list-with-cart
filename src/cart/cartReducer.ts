import type { CartAction, CartItem } from "../types";



export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "startNewOrder":
      return [];

    case "decreaseItem": {
      const item = state.find(item => item.product.name === action.name);
      if (!item) return state;

      if (item.quantity > 1) {
        return state.map(item => item.product.name === action.name ? { ...item, quantity: item.quantity - 1 } : item)
      } else {
        return state.filter(item => item.product.name !== action.name);
      }
    }

    case "addItem": {
      const exists = state.some(item => item.product.name === action.product.name);

      if (exists) {
        return state.map(item => item.product.name === action.product.name ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...state, { product: action.product, quantity: 1 }];
      }
    }

    case "removeItem": return state.filter(item => item.product.name !== action.name);
    
    default:
      return state;
  }
}