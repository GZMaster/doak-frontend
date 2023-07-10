/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState, useEffect } from "react";
import { IProducts } from "../types/products";
import backendURL from "../api";

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
  getProductImage: (url: string) => string | undefined;
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
  getProductImage: () => {
    return undefined;
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
    try {
      setIsLoading(true);

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      const res = await fetch(`${backendURL}/api/v1/wine/length`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const numberOfPagesData = await res.json();

      const numberOfPages = Math.ceil(numberOfPagesData.data / limit);

      if (numberOfPages) {
        setTotalPages(numberOfPages);
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  async function fetchProducts(
    limit?: number,
    page?: number,
    sort?: string,
    filter?: { field?: string; operator?: string; value?: string }
  ) {
    try {
      setIsLoading(true);

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      let url = `${backendURL}/api/v1/wine/`;

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
          Authorization: `Bearer ${token}`,
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
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  const getProduct = async (id: string): Promise<IProducts | undefined> => {
    try {
      setIsLoading(true);

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      const response = await fetch(`${backendURL}/api/v1/wine/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === "success") {
        setIsLoading(false);
        return data.data.wineProduct;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getProductImage = (url: string): string | undefined => {
    try {
      setIsLoading(true);

      const imagePath = url.replace("public", "");

      if (imagePath) {
        setIsLoading(false);
        return `${backendURL}${imagePath}`;
      } else {
        setIsLoading(false);
        return;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  async function searchProducts() {
    try {
      setIsLoading(true);

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      if (
        searchTerm === "" ||
        searchTerm === undefined ||
        searchTerm === null ||
        searchTerm === " "
      ) {
        await fetchProducts(12, 1, "name");

        return;
      }

      const response = await fetch(
        `${backendURL}/api/v1/wine/search?search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseJson = await response.json();

      if (!response.ok) {
        setError(responseJson.message);
      }

      if (responseJson.status === "fail") {
        setError(responseJson.message);
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
        getProductImage,
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
