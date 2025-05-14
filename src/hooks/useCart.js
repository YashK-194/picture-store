import { useState } from "react";
import { PURCHASE_SUCCESS_MESSAGE } from "../utils/constants";

/**
 * Custom hook to manage shopping cart functionality
 * @returns {Object} Cart state and methods
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [soldPictures, setSoldPictures] = useState([]);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

  /**
   * Add a picture to the shopping cart
   * @param {Object} picture - Picture to add to cart
   */
  const addToCart = (picture) => {
    // Check if the picture is already in the cart
    if (!cartItems.find((item) => item.id === picture.id)) {
      setCartItems([...cartItems, picture]);
    }
  };

  /**
   * Remove a picture from the shopping cart
   * @param {number} pictureId - ID of picture to remove
   */
  const removeFromCart = (pictureId) => {
    setCartItems(cartItems.filter((item) => item.id !== pictureId));
  };

  /**
   * Process checkout of items in cart - now separated from blockchain transaction
   * Called after successful blockchain transaction
   */
  const completePurchase = () => {
    if (cartItems.length > 0) {
      // Add all cart items to sold pictures list
      const soldIds = cartItems.map((item) => item.id);
      setSoldPictures([...soldPictures, ...soldIds]);

      // Clear the cart
      setCartItems([]);
      
      // Reset purchase state
      setIsPurchaseComplete(true);
      
      // Show confirmation message
      alert(PURCHASE_SUCCESS_MESSAGE);
      
      // Reset the purchase complete flag after a short delay
      setTimeout(() => setIsPurchaseComplete(false), 1000);
    }
  };

  return {
    cartItems,
    soldPictures,
    addToCart,
    removeFromCart,
    completePurchase,
    isPurchaseComplete,
    setIsPurchaseComplete,
    totalPrice: cartItems.reduce((total, item) => total + item.price, 0),
  };
};

export default useCart;
