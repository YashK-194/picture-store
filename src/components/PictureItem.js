import React from "react";
import "./PictureItem.css";
import { PICTURE_STATUS } from "../utils/constants";

const PictureItem = ({ picture, onAddToCart, isAvailable }) => {
  return (
    <div className="picture-item">
      <img src={picture.image} alt={picture.name} />
      <h3>{picture.name}</h3>
      <p className="description">{picture.description}</p>
      <div className="price-buy">
        <span className="price">{picture.price} ETH</span>
        {isAvailable ? (
          <button
            className="buy-button"
            onClick={() => onAddToCart(picture)}
            aria-label={`Buy ${picture.name} for $${picture.price.toFixed(2)}`}
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
