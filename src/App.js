import './App.css';
import { useState } from 'react';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/Cart/CartProvider';
import ErrorHandler from './components/UI/ErrorHandler/ErrorHandler';

function App() {
  const [isShowCart, setShowCart] = useState(false);

  const onShowCart = () => setShowCart(true);
  const onHideCart = () => setShowCart(false);

  return (
    <CartProvider>
      <ErrorHandler>
        {isShowCart && <Cart onClose={onHideCart} />}
        <Header onShowCart={onShowCart} />
        <main>
          <ErrorHandler>
            <Meals />
          </ErrorHandler>
        </main>
      </ErrorHandler>
    </CartProvider>
  );
}

export default App;
