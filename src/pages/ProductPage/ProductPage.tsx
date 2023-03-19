import React from "react";
import "./productPage.scss";
import img from "../../assets/Images/others/Image.png";
import { useState } from "react";
import { FormatNaira } from "../../utils/FormatCurrency";
interface IOption {
  label: string;
  value: string;
}
export default function ProductPage() {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("1");

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity || prevQuantity === "1") {
        return "1";
      }
      return String(parseInt(prevQuantity, 10) - 1);
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity) {
        return "1";
      }
      return String(parseInt(prevQuantity, 10) + 1);
    });
  };
  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = event.target.value.replace(/\D/g, ""); // remove non-digit characters
    if (Number(newQuantity) > 100) {
      setQuantity("100");
    } else {
      setQuantity(newQuantity);
    }
  }
  const options: IOption[] = [
    { label: "60cl", value: "60cl" },
    { label: "75cl", value: "75cl" },
    { label: "125cl", value: "125cl" },
  ];
  const price = 200000;
  const oldPrice = 290000;
  const formatPrice = FormatNaira(price);
  let formatOldPrice = null;
  let discountPercentage = null;
  if (oldPrice) {
    formatOldPrice = FormatNaira(oldPrice);
    discountPercentage = ((oldPrice - price) / oldPrice) * 100;
  }

  return (
    <section className="single-product">
      <div className="product-wrapper">
        <div className="product-image">
          <img src={img} alt="product" />
        </div>
        <div className="product-details">
          <div className="product-brand">
            <p className="product-category">BRANDY</p>
            <p>Hennessy VS Cognac ORIGINAL 70cl X6</p>
          </div>
          <div className="product-size">
            <p>BOTTLE SIZE</p>
            <form>
              {options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name="size"
                    value={option.value}
                    checked={size === option.value}
                    onChange={handleSizeChange}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </form>
          </div>
          <div className="product-quantity">
            <p>QUANTITY</p>
            <div className="quantity-controls">
              <button
                className="decrease-quantity"
                onClick={handleQuantityDecrease}
              >
                -
              </button>
              <input
                type="text"
                name="quantity"
                value={quantity}
                maxLength={3}
                onChange={handleQuantityChange}
              />
              <button
                className="increase-quantity"
                onClick={handleQuantityIncrease}
              >
                +
              </button>
            </div>
          </div>
          <div className="product-price">
            <p>PRICE:</p>
            <p className="current-price">
              {formatPrice}
              {formatOldPrice && (
                <>
                  <span className="old-price">{formatOldPrice}</span>
                  <span className="discount">{`-${discountPercentage}%`}</span>
                </>
              )}
            </p>
            <button className="add-to-cart-btn" type="submit">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
