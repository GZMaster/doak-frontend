import React, { createContext, useContext, useState } from "react";

type Product = {
  name: string;
  description: string;
};

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchResults: Product[];
  isLoading: boolean;
  error: string | null;
};

const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearchTerm: () => {},
  searchResults: [],
  isLoading: false,
  error: null,
});

type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchProducts(searchTerm: string) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doakbackend.cyclic.app/api/v1/wine/?name=${searchTerm}`,
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

      setSearchResults(responseJson.data);

      setIsLoading(false);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults, isLoading, error }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  return useContext(SearchContext);
}
