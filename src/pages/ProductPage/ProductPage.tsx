import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatNaira } from "../../utils/FormatCurrency";
import ProductTab from "../../components/Tabs/ProductTab";
import ToastBar from "../../components/notification/ToastBar";
import "./productPage.scss";
import img from "../../assets/Images/others/Image.png";
import successicon from "../../assets/Images/icons/success-icon.svg";

interface IOption {
  label: string;
  value: string;
}
export default function ProductPage() {
  const params = useParams();
  const [size, setSize] = useState("");
  const [showToastBar, setShowToastBar] = useState(false);

  console.log(params);

  useEffect(() => {
    let toastTimeout: NodeJS.Timeout | undefined;
    if (showToastBar) {
      toastTimeout = setTimeout(() => {
        setShowToastBar(false);
      }, 3000);
    }
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [showToastBar]);

  const handleAddCart = () => {
    setShowToastBar(true);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const [quantity, setQuantity] = useState("1");
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
    discountPercentage = Math.floor(((oldPrice - price) / oldPrice) * 100);
  }

  return (
    <section className="single-product">
      {showToastBar && (
        <ToastBar
          type="success"
          message="Successfully Added to Cart"
          icon={successicon}
        />
      )}
      <div className="product-wrapper">
        <div className="product-image">
          <img src={img} alt="product" />
        </div>
        <div className="product-details">
          <div className="product-brand">
            <p className="product-category">BRANDY</p>
            <p>Hennessy VS Coginac ORIGINAL 70cl X6</p>
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
            <button className="add-to-cart-btn" onClick={handleAddCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ProductTab />
    </section>
  );
}
