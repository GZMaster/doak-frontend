import React from "react";
import "../products.scss";
import { FormatNaira } from "../../../utils/FormatCurrency";
import { IProducts } from "../../../types/products";
import { Link } from "react-router-dom";

export default function Product({
  _id,
  name,
  price,
  imageCover,
  category,
}: IProducts) {
  const formatPrice = FormatNaira(price);
  let formatOldPrice = null;

  const getDiscount = () => {
    const discount = Math.floor(Math.random() * 100);

    if (discount < 20) {
      return discount;
    } else {
      return 20;
    }
  };

  const oldPrice = price + (price * getDiscount()) / 100;

  if (oldPrice) {
    formatOldPrice = FormatNaira(oldPrice);
  }

  return (
    <Link to={`/product/${_id}`} className="product">
      <img src={imageCover} alt={name} className="product-img" />
      <div className="product-wrapper">
        <p className="product-category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">
          {formatPrice}
          {formatOldPrice && (
            <span className="old-price">{formatOldPrice}</span>
          )}
        </p>
        <div className="product-btn">Add to Cart</div>
      </div>
    </Link>
  );
}
