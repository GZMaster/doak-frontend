import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatNaira } from "../../utils/FormatCurrency";
import { IProducts } from "../../types/products";
import { useProducts } from "../../services/ProductsContext";
import { useCart } from "../../services/CartContext";
import ProductTab from "../../components/Tabs/ProductTab";
import { useLoading } from "../../services/LoadingContext";
import ToastBar from "../../components/notification/ToastBar";
import "./productPage.scss";
import img from "../../assets/Images/others/Image.png";
import successicon from "../../assets/Images/icons/success-icon.svg";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.productId;
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  // const [size, setSize] = useState("");
  const [showToastBar, setShowToastBar] = useState(false);
  const [product, setProduct] = useState<IProducts>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    if (productId) {
      const product = getProduct(productId);
      product.then((product) => {
        if (product) {
          setProduct(product);
        }
      });
    }

    setIsLoading(false);
  }, [productId]);

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

  const handleAddCart = async ({ id, name, price, quantity }: CartItem) => {
    setIsLoading(true);

    await addToCart({ id, name, price, quantity })
      .then((success) => {
        if (success) {
          setShowToastBar(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity || prevQuantity === 1) {
        return 1;
      }
      return prevQuantity - 1;
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity) {
        return 1;
      }
      return prevQuantity + 1;
    });
  };

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(event.target.value.replace(/\D/, ""));
    if (newQuantity > 100) {
      setQuantity(100);
    } else {
      setQuantity(newQuantity);
    }
  }

  // const options: IOption[] = [
  //   { label: "60cl", value: "60cl" },
  //   { label: "75cl", value: "75cl" },
  //   { label: "125cl", value: "125cl" },
  // ];

  const price = 250000;
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
      {isLoading && <LoadingComponent />}
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
            <p className="product-category">{product?.categories}</p>
            <p>{product?.name}</p>
          </div>
          {/* <div className="product-size">
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
          </div> */}
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
                type="number"
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
            <button
              className="add-to-cart-btn"
              onClick={() => {
                if (product) {
                  const id = product._id;
                  handleAddCart({
                    id,
                    name: product.name,
                    price: product.price,
                    quantity,
                  });
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ProductTab
        productDetails={product?.summary}
        description={product?.description}
      />
    </section>
  );
}
