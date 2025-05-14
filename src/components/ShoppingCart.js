import React from "react";
import "./ShoppingCart.css";
import { EMPTY_CART_MESSAGE } from "../utils/constants";

const ShoppingCart = ({
  cartItems,
  onRemoveFromCart,
  totalPrice,
  onCheckout,
  isProcessing,
  txStatus,
  isWalletConnected,
}) => {
  // Determine if the status message is an error
  const isError = txStatus && txStatus.toLowerCase().includes("error");

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
                  <p className="cart-item-price">{item.price} ETH</p>
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
              <span>{totalPrice.toFixed(4)} ETH</span>
            </div>

            <button
              onClick={onCheckout}
              disabled={
                !isWalletConnected ||
                isProcessing ||
                !totalPrice ||
                totalPrice <= 0
              }
              className="pay-button"
            >
              {isProcessing
                ? "Processing..."
                : isWalletConnected
                ? `Pay ${totalPrice.toFixed(4)} ETH`
                : "Connect Wallet to Pay"}
            </button>

            {txStatus && (
              <p
                className={`transaction-status ${
                  isError ? "error-status" : ""
                }`}
              >
                {txStatus}
              </p>
            )}

            {!isWalletConnected && cartItems.length > 0 && !txStatus && (
              <p className="wallet-warning">
                Please connect your wallet to complete purchase
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
