import './App.css';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';

function App() {
  const [isShowCart, setShowCart] = useState(false);

  const onShowCart = () => setShowCart(true);
  const onHideCart = () => setShowCart(false);

  return (
    <div>
      {isShowCart && <Cart onClose={onHideCart} />}
      <Header onShowCart={onShowCart} />
      <main>
        <Meals />
      </main>
    </div>
  );
}

export default App;
