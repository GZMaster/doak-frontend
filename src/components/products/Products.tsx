import React, { useState, useEffect } from "react";
import Product from "./product/Product";
import "./products.scss";
import ProductImg from "../../assets/Images/others/Product-Img.png";
import ProductIm2 from "../../assets/Images/others/Product-Img-2.png";
import { IProducts } from "../../types/products";
import Pagination from "../../lib/Pagination";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";

export default function Products() {
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    getNumberOfPages(limit);
    getProducts(limit, currentPage);
  }, [currentPage, limit]);

  const randomImage = () => {
    const images = [ProductImg, ProductIm2];
    const random = Math.floor(Math.random() * images.length);
    return images[random];
  };

  const getNumberOfPages = async (limit: number) => {
    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/length`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const numberOfPagesData = await res.json();

    const numberOfPages = Math.ceil(numberOfPagesData.data / limit);

    if (numberOfPages) {
      setTotalPages(numberOfPages);
    }

    console.log(numberOfPagesData.data);
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
      url += `&page=${page}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (filter) {
      url += `&${filter.field}=${filter.operator}${filter.value}`;
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <article className="products">
        {products.map((product, index) => (
          <Product
            key={index}
            _id={product._id}
            name={product.name}
            price={product.price}
            summary={product.summary}
            description={product.description}
            imageCover={randomImage()}
            images={product.images}
            categories={product.categories}
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
