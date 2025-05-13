import React from "react";
import "./App.css";
import PictureList from "./components/PictureList";
import ShoppingCart from "./components/ShoppingCart";
import picturesData from "./data/picturesData";
import useCart from "./hooks/useCart";
import { APP_TITLE, APP_DESCRIPTION } from "./utils/constants";

function App() {
  const {
    cartItems,
    soldPictures,
    addToCart,
    removeFromCart,
    checkout,
    totalPrice,
  } = useCart();

  return (
    <div className="App">
      <header className="App-header">
        <h1>{APP_TITLE}</h1>
        <p>{APP_DESCRIPTION}</p>
      </header>

      <div className="store-container">
        <PictureList
          pictures={picturesData}
          onAddToCart={addToCart}
          soldPictures={soldPictures}
        />

        <ShoppingCart
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onCheckout={checkout}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}

export default App;
