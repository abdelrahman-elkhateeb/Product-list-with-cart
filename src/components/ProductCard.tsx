import type { Product } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { IconDecrement, IconIncrement } from "./icons";

type ProductCardProps = {
  product: Product;
  quantity: number; // 0 = not in the cart
  onAdd: () => void; // "Add to Cart" and the + button
  onDecrease: () => void; // the − button
};

export default function ProductCard({ product, quantity, onAdd, onDecrease }: ProductCardProps) {
  const { image, name, category, price } = product;
  const inCart = quantity > 0;

  return (
    <article>
      <div className="relative mb-9">
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 768px)" srcSet={image.tablet} />
          <img
            src={image.mobile}
            alt={name}
            className={`w-full rounded-lg border-2 object-cover ${inCart ? "border-brand" : "border-transparent"}`}
          />
        </picture>

        {inCart ? (
          <div className="absolute -bottom-5 left-1/2 flex h-11 w-40 -translate-x-1/2 items-center justify-between rounded-full bg-brand px-3 text-white">
            <button
              type="button"
              onClick={onDecrease}
              aria-label={`Decrease ${name}`}
              className="grid size-5 cursor-pointer place-items-center rounded-full border border-white transition hover:bg-white hover:text-brand"
            >
              <IconDecrement />
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Increase ${name}`}
              className="grid size-5 cursor-pointer place-items-center rounded-full border border-white transition hover:bg-white hover:text-brand"
            >
              <IconIncrement />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="absolute -bottom-5 left-1/2 flex h-11 w-40 -translate-x-1/2 cursor-pointer items-center justify-center gap-2 rounded-full border border-rose-400 bg-white text-sm font-semibold text-rose-900 transition hover:border-brand hover:text-brand"
          >
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        )}
      </div>

      <p className="text-sm text-rose-500">{category}</p>
      <h2 className="font-semibold">{name}</h2>
      <p className="font-semibold text-brand">{formatPrice(price)}</p>
    </article>
  );
}
