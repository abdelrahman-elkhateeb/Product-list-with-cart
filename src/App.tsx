import { useReducer } from 'react'
import './App.css'
import { cartReducer } from './cart/carReducer'

function App() {
  const [cart,dispatch] = useReducer(cartReducer)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
