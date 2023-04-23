import React, { useState, useEffect } from "react";
import Product from "./product/Product";
import "./products.scss";
import ProductImg from "../../assets/Images/others/Product-Img.png";
import ProductIm2 from "../../assets/Images/others/Product-Img-2.png";
import { IProducts } from "../../types/products";
import Pagination from "../../lib/Pagination";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";

export default function Products() {
  const totalPages = 12;
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    getProducts(12);
  }, []);

  const randomImage = () => {
    const images = [ProductImg, ProductIm2];
    const random = Math.floor(Math.random() * images.length);
    return images[random];
  };

  const getProducts = async (
    limit?: number,
    page?: number,
    sort?: string,
    filter?: { field?: string; operator?: string; value?: string }
  ) => {
    let url = `https://doakbackend.cyclic.app/api/v1/wine/`;

    if (limit) {
      url += `?limit=${limit}`;
    }
    if (page) {
      url += `?page=${page}`;
    }
    if (sort) {
      url += `?sort=${sort}`;
    }
    if (filter) {
      url += `?${filter.field}=${filter.operator}${filter.value}`;
    }

    const product = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const productData = await product.json();

    if (productData) {
      setProducts(productData.data.wineProducts);
    }
  };

  return (
    <>
      <article className="products">
        {products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            price={product.price}
            summary={product.summary}
            description={product.description}
            imageCover={randomImage()}
            images={product.images}
            category={product.category}
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
