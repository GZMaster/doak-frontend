import React, { useState, useEffect } from "react";
import Product from "./product/Product";
import { useProducts } from "../../services/ProductsContext";
import { useLoading } from "../../services/LoadingContext";
import "./products.scss";
import ProductImg from "../../assets/Images/others/Product-Img.png";
import ProductIm2 from "../../assets/Images/others/Product-Img-2.png";
import Pagination from "../../lib/Pagination";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";

export default function Products() {
  const {
    products,
    fetchProducts,
    getNumberOfPages,
    totalPages,
    isLoading,
    currentPage,
    setCurrentPage,
  } = useProducts();
  const { setIsLoading, LoadingComponent } = useLoading();
  const [limit] = useState(12);
  const isPageWide = UseMediaQuery("(min-width: 769px)");

  useEffect(() => {
    getNumberOfPages(limit);
  }, [currentPage, limit]);

  useEffect(() => {
    fetchProducts(limit, currentPage);
  }, [currentPage, limit]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const randomImage = () => {
    const images = [ProductImg, ProductIm2];
    const random = Math.floor(Math.random() * images.length);
    return images[random];
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {isLoading && <LoadingComponent />}
      <article className="products">
        {products &&
          products.map((product, index) => (
            <Product
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              summary={product.summary}
              description={product.description}
              image={randomImage()}
              categories={product.categories}
              quantity={product.quantity}
            />
          ))}
      </article>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={totalPages}
        showIcon
        size={isPageWide ? "large" : "small"}
        showText={isPageWide ? true : false}
      />
    </div>
  );
}
