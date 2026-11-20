import './App.css'
import type { Product } from './types'
import data from "./data.json";
import { useCart } from './cart/CartContext';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import OrderConfirmedModal from './components/OrderConfirmedModal';

const products: Product[] = data;

function App() {
  const { cart, dispatch } = useCart();

  // TODO: derive these from `cart` (no new state!)
  const totalQuantity = 0;
  const orderTotal = 0;

  const isOrderConfirmed = false;

  return (
    <main className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10 lg:grid-cols-[1fr_24rem] lg:p-20">
      <section>
        <h1 className="mb-8 text-4xl font-bold">Desserts</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              quantity={()} // TODO: this product's quantity in the cart (0 if not in it)
              onAdd={() => { dispatch({ type: "addItem", product: product }) }} // TODO: dispatch addItem
              onDecrease={() => { dispatch({ type: "decreaseItem", name: product.name }) }} // TODO: dispatch decreaseItem
            />
          ))}
        </div>
      </section>

      <Cart
        items={cart}
        totalQuantity={totalQuantity}
        orderTotal={orderTotal}
        onRemove={() => {dispatch({type:"removeItem",})}} // TODO: dispatch removeItem
        onConfirm={() => { }} // TODO: open the modal
      />

      <OrderConfirmedModal
        isOpen={isOrderConfirmed}
        items={cart}
        orderTotal={orderTotal}
        onStartNewOrder={() => { }} // TODO: dispatch startNewOrder + close the modal
      />
    </main>
  )
}

export default App
