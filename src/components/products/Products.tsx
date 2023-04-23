import React, { useState } from "react";
import Product from "./product/Product";
import "./products.scss";
import ProductImg from "../../assets/Images/others/Product-Img.png";
import ProductIm2 from "../../assets/Images/others/Product-Img-2.png";
import { IProducts } from "../../types/products";
import Pagination from "../../lib/Pagination";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
export default function Products() {
  const totalPages = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const products: IProducts[] = [
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 1",
      price: 200000,
      oldPrice: 290000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 2",
      price: 200000,
    },
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 3",
      price: 200000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 4",
      price: 200000,
    },
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 5",
      price: 200000,
      oldPrice: 290000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 6",
      price: 200000,
    },
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 7",
      price: 200000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 8",
      price: 200000,
      oldPrice: 290000,
    },
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 9",
      price: 200000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 10",
      price: 200000,
    },
    {
      img: ProductIm2,
      category: "alcoholic",
      name: "Product 11",
      price: 200000,
      oldPrice: 290000,
    },
    {
      img: ProductImg,
      category: "grape",
      name: "Product 12",
      price: 200000,
      oldPrice: 290000,
    },
  ];
  return (
    <>
      <article className="products">
        {products.map((product, index) => (
          <Product
            key={index}
            img={product.img}
            category={product.category}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
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
    </>
  );
}
