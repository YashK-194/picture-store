import React from "react";
import "./PictureItem.css";
import { PICTURE_STATUS } from "../utils/constants";

const PictureItem = ({ picture, onAddToCart, isAvailable }) => {
  // Format price to display as "0.0000001 ETH (1e-7)"
  const formatPrice = (price) => {
    if (price < 0.000001) {
      return `${price.toFixed(7)} ETH (${price.toExponential(0)})`;
    }
    return `${price.toFixed(7)} ETH`;
  };

  return (
    <div className="picture-item">
      <img src={picture.image} alt={picture.name} />
      <h3>{picture.name}</h3>
      <p className="description">{picture.description}</p>
      <div className="price-buy">
        <span className="price">{formatPrice(picture.price)}</span>
        {isAvailable ? (
          <button
            className="buy-button"
            onClick={() => onAddToCart(picture)}
            aria-label={`Buy ${picture.name} for ${formatPrice(picture.price)}`}
          >
            Buy
          </button>
        ) : (
          <span className="sold" aria-label={`${picture.name} is sold`}>
            Sold
          </span>
        )}
      </div>
    </div>
  );
};

export default PictureItem;
