import './App.css';
import { useState } from 'react';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './context/CartProvider';

function App() {
  const [isShowCart, setShowCart] = useState(false);

  const onShowCart = () => setShowCart(true);
  const onHideCart = () => setShowCart(false);

  return (
    <CartProvider>
      {isShowCart && <Cart onClose={onHideCart} />}
      <Header onShowCart={onShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
