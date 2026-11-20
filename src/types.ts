export type Product = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  },
  name: string;
  category: string;
  price: number;
}

export type CartItem = {
  product: Product;
  quantity: number;
}

export type CartAction =
  | { type: "addItem"; product: Product }
  | { type: "decreaseItem"; name: string }
  | { type: "removeItem"; name: string }
  | { type: "startNewOrder" };