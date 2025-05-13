import React from "react";
import "./ShoppingCart.css";
import { EMPTY_CART_MESSAGE } from "../utils/constants";

const ShoppingCart = ({
  cartItems,
  onRemoveFromCart,
  onCheckout,
  totalPrice,
}) => {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">{EMPTY_CART_MESSAGE}</div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => onRemoveFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={onCheckout}
              disabled={cartItems.length === 0}
            >
              Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
