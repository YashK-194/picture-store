import React from "react";
import "./ShoppingCart.css";
import { EMPTY_CART_MESSAGE, SEPOLIA_ETHERSCAN_URL } from "../utils/constants";

const ShoppingCart = ({
  cartItems,
  onRemoveFromCart,
  totalPrice,
  onCheckout,
  isProcessing,
  txStatus,
  txHash,
  isWalletConnected,
}) => {
  // Determine if the status message is an error
  const isError = txStatus && txStatus.toLowerCase().includes("error");

  // Format price to display as "0.0000001 ETH" in the cart
  const formatPrice = (price) => {
    return `${price.toFixed(7)} ETH`;
  };

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
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
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
              <span>{formatPrice(totalPrice)}</span>
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
                ? `Pay ${formatPrice(totalPrice)}`
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

            {txHash && (
              <div className="tx-hash-container">
                <a
                  href={`${SEPOLIA_ETHERSCAN_URL}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-hash-link"
                >
                  View on Etherscan
                </a>
              </div>
            )}

            {!isWalletConnected &&
              cartItems.length > 0 &&
              !txStatus &&
              !txHash && (
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
