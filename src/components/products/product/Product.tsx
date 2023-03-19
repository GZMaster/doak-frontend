import "../products.scss";
import { FormatNaira } from "../../../utils/FormatCurrency";
import { IProducts } from "../../../types/products";

export default function Product({
  img,
  category,
  name,
  price,
  oldPrice,
}: IProducts) {
  const formatPrice = FormatNaira(price);
  let formatOldPrice = null;
  if (oldPrice) {
    formatOldPrice = FormatNaira(oldPrice);
  }
  return (
    <div className="product">
      <img src={img} alt={name} className="product-img" />
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
    </div>
  );
}
