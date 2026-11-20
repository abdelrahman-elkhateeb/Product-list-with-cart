import type { CartItem } from "../types";
import { formatPrice } from "../utils/formatPrice";

type OrderConfirmedModalProps = {
  isOpen: boolean;
  items: CartItem[];
  orderTotal: number;
  onStartNewOrder: () => void;
};

export default function OrderConfirmedModal({ isOpen, items, orderTotal, onStartNewOrder }: OrderConfirmedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/50 md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-xl bg-white p-6 md:max-w-lg md:rounded-xl md:p-10"
      >
        <img src="/assets/images/icon-order-confirmed.svg" alt="" className="mb-6" />
        <h2 id="order-confirmed-title" className="mb-2 text-4xl font-bold">Order Confirmed</h2>
        <p className="mb-8 text-rose-500">We hope you enjoy your food!</p>

        <div className="mb-8 rounded-lg bg-rose-50 px-6">
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.name} className="flex items-center gap-4 border-b border-rose-100 py-4">
                <img src={product.image.thumbnail} alt="" className="size-12 rounded" />
                <div className="min-w-0 flex-1">
                  <p className="mb-2 truncate text-sm font-semibold">{product.name}</p>
                  <p className="flex gap-2 text-sm">
                    <span className="font-semibold text-brand">{quantity}x</span>
                    <span className="text-rose-500">@ {formatPrice(product.price)}</span>
                  </p>
                </div>
                <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between py-6">
            <span className="text-sm">Order Total</span>
            <span className="text-2xl font-bold">{formatPrice(orderTotal)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="w-full cursor-pointer rounded-full bg-brand py-4 font-semibold text-white transition hover:bg-brand-dark"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
