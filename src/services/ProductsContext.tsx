/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState, useEffect } from "react";
import { IProducts } from "../types/products";

type ProductsContextType = {
  products: IProducts[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  totalPages: number;
  getNumberOfPages: (limit: number) => void;
  fetchProducts: (
    limit?: number,
    page?: number,
    sort?: string,
    filter?: { field?: string; operator?: string; value?: string }
  ) => void;
  getProduct: (id: string) => Promise<IProducts | undefined>;
  searchProducts: () => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  setSearchTerm: () => {},
  totalPages: 0,
  getNumberOfPages: () => {},
  fetchProducts: () => {},
  getProduct: () => {
    return new Promise(() => {});
  },
  searchProducts: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

type ProductsProviderProps = {
  children: React.ReactNode;
};

function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getNumberOfPages(10);
  }, []);

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

    setIsLoading(false);
  };

  async function fetchProducts(
    limit?: number,
    page?: number,
    sort?: string,
    filter?: { field?: string; operator?: string; value?: string }
  ) {
    try {
      setIsLoading(true);

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

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      if (responseJson.status === "fail") {
        throw new Error(responseJson.message);
      }

      setProducts(responseJson.data.wineProducts);
      setIsLoading(false);
      setError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const getProduct = async (id: string): Promise<IProducts | undefined> => {
    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/${id}`,
      // `http://localhost:3000/api/v1/wine/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.status === "success") {
      setIsLoading(false);
      return data.data.wineProduct;
    }
  };

  async function searchProducts() {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://doakbackend.cyclic.app/api/v1/wine/search?search=${searchTerm}`,
        // `http://localhost:3000/api/v1/wine/search?query=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message);
      }

      if (responseJson.status === "fail") {
        throw new Error(responseJson.message);
      }

      setProducts(responseJson.data.wineProducts);
      setIsLoading(false);
      setError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        totalPages,
        getNumberOfPages,
        fetchProducts,
        getProduct,
        searchProducts,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  return useContext(ProductsContext);
}

export { ProductsProvider, useProducts };
