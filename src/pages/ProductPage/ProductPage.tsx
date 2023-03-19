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
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  const options: IOption[] = [
    { label: "60cl", value: "60cl" },
    { label: "75cl", value: "75cl" },
    { label: "125cl", value: "125cl" },
  ];
  let price = 200000;
  let oldPrice = 290000;
  const formatPrice = FormatNaira(price);
  let formatOldPrice = null;
  if (oldPrice) {
    formatOldPrice = FormatNaira(oldPrice);
  }
  return (
    <section className="single-product">
      <div className="wrapper">
        <div className="top">
          <div className="left">
            <img src={img} alt="" />
          </div>
          <div className="right">
            <div className="detail">
              <p>BRANDY</p>
              <p>Hennessy VS Cognac ORIGINAL 70cl X6</p>
            </div>
            <div className="detail">
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
                    {option.label}
                  </label>
                ))}
              </form>
            </div>
            <div className="detail">
              <p>QUANTITY</p>
              <div>
                <button onClick={handleQuantityDecrease}>-</button>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  min="1"
                  max="100"
                  onChange={(event) =>
                    setQuantity(parseInt(event.target.value))
                  }
                />
                <button onClick={handleQuantityIncrease}>+</button>
              </div>
            </div>
            <div className="detail">
              <p>PRICE:</p>
              <p className="product-price">
                {formatPrice}
                {formatOldPrice && (
                  <span className="old-price">{formatOldPrice}</span>
                )}
              </p>
              <button type="submit">Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="bot"></div>
      </div>
    </section>
  );
}
