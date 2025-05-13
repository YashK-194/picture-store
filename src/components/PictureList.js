import React from "react";
import PictureItem from "./PictureItem";
import "./PictureList.css";

const PictureList = ({ pictures, onAddToCart, soldPictures }) => {
  return (
    <div className="picture-list">
      <h2>Available Pictures</h2>
      <div className="pictures-grid">
        {pictures.map((picture) => (
          <PictureItem
            key={picture.id}
            picture={picture}
            onAddToCart={onAddToCart}
            isAvailable={!soldPictures.includes(picture.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureList;
