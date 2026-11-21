import './App.css'
import type { Product } from './types'
import data from "./data.json";
import { useCart } from './cart/CartContext';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import OrderConfirmedModal from './components/OrderConfirmedModal';
import { useState } from 'react';

const products: Product[] = data;

function App() {
  const { cart, dispatch } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const orderTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10 lg:grid-cols-[1fr_24rem] lg:p-20">
      <section>
        <h1 className="mb-8 text-4xl font-bold">Desserts</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              quantity={cart.find(item => item.product.name === product.name)?.quantity ?? 0}
              onAdd={() => { dispatch({ type: "addItem", product: product }) }}
              onDecrease={() => { dispatch({ type: "decreaseItem", name: product.name }) }}
            />
          ))}
        </div>
      </section>

      <Cart
        items={cart}
        totalQuantity={totalQuantity}
        orderTotal={orderTotal}
        onRemove={(name) => { dispatch({ type: "removeItem", name }) }}
        onConfirm={() => { setIsOrderConfirmed(!isOrderConfirmed) }}
      />

      <OrderConfirmedModal
        isOpen={isOrderConfirmed}
        items={cart}
        orderTotal={orderTotal}
        onStartNewOrder={() => {
          dispatch({ type: "startNewOrder" });
          setIsOrderConfirmed(!isOrderConfirmed)
        }}
      />
    </main>
  )
}

export default App
