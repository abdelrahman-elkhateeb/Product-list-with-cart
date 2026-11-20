import type { CartItem } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { IconRemove } from "./icons";

type CartProps = {
  items: CartItem[];
  totalQuantity: number;
  orderTotal: number;
  onRemove: (name: string) => void;
  onConfirm: () => void;
};

export default function Cart({ items, totalQuantity, orderTotal, onRemove, onConfirm }: CartProps) {
  return (
    <aside className="h-fit rounded-xl bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold text-brand">Your Cart ({totalQuantity})</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p className="text-sm font-semibold text-rose-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.name} className="flex items-center justify-between border-b border-rose-100 py-4">
                <div>
                  <p className="mb-2 text-sm font-semibold">{product.name}</p>
                  <p className="flex gap-2 text-sm">
                    <span className="font-semibold text-brand">{quantity}x</span>
                    <span className="text-rose-500">@ {formatPrice(product.price)}</span>
                    <span className="font-semibold text-rose-500">{formatPrice(product.price * quantity)}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(product.name)}
                  aria-label={`Remove ${product.name}`}
                  className="grid size-5 cursor-pointer place-items-center rounded-full border border-rose-400 text-rose-400 transition hover:border-rose-900 hover:text-rose-900"
                >
                  <IconRemove />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between py-6">
            <span className="text-sm">Order Total</span>
            <span className="text-2xl font-bold">{formatPrice(orderTotal)}</span>
          </div>

          <p className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 p-4 text-sm">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <span>
              This is a <strong className="font-semibold">carbon-neutral</strong> delivery
            </span>
          </p>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full cursor-pointer rounded-full bg-brand py-4 font-semibold text-white transition hover:bg-brand-dark"
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
}
