/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";
import backendURL from "../api";

// Define the shape of the cart item
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

// Define the shape of the context
interface CartContextProps {
  cartItems: CartItem[] | null;
  isLoading: boolean;
  getCart: () => Promise<boolean>;
  addToCart: (item: CartItem) => Promise<boolean>;
  updateCart: (item: CartItem) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<boolean>;
  getTotalCartPrice: () => number;
  quantityChange: (id: string, quantity: number) => void;
  error: string | null;
}

// Create the initial context
const initialCartContext: CartContextProps = {
  cartItems: [] as CartItem[] | null,
  isLoading: false,
  getCart: () => {
    return new Promise(() => {});
  },
  addToCart: () => {
    return new Promise(() => {});
  },
  updateCart: () => {
    return new Promise(() => {});
  },
  removeFromCart: () => {
    return new Promise(() => {});
  },
  getTotalCartPrice: () => 0,
  quantityChange: () => {},
  error: null,
};

// Create the context
export const CartContext = createContext<CartContextProps>(initialCartContext);

type CartProviderProps = {
  children: React.ReactNode;
};

// Create the provider component
const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCart = async () => {
    try {
      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      const response = await fetch(`${backendURL}/api/v1/wine/cart/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        const cartData = data.data.cart;
        setCartItems(cartData);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  const addToCart = async (item: CartItem) => {
    try {
      setIsLoading(true);

      setCartItems((prevItems) => {
        const updatedItems = Array.isArray(prevItems) ? [...prevItems] : [];

        const existingItem = updatedItems.find(
          (prevItem) => prevItem.id === item.id
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          updatedItems.push(item);
        }

        return updatedItems;
      });

      const { id: productId, quantity, price } = item;

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${backendURL}/api/v1/wine/cart/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price,
            quantity,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  const updateCart = async (item: CartItem) => {
    try {
      setIsLoading(true);

      const { id: productId, quantity, price } = item;

      // Get jwt Bear token from local storage
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${backendURL}/api/v1/wine/cart/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price,
            quantity,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setCartItems((prevItems) => {
          if (prevItems) {
            return prevItems.map((prevItem) =>
              prevItem.id === item.id ? { ...prevItem, quantity } : prevItem
            );
          }

          return [];
        });
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);

      const deleteItem = async (id: string) => {
        try {
          // Get jwt Bear token from local storage
          const token = localStorage.getItem("jwt");

          const response = await fetch(`${backendURL}/api/v1/wine/cart/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          setIsLoading(false);

          if (data.status === "success") {
            return true;
          } else {
            return false;
          }
        } catch (error: any) {
          setIsLoading(false);
          setError(error.message);
          return false;
        }
      };

      const res = await deleteItem(itemId);

      if (res) {
        setCartItems((prevItems) => {
          if (prevItems) {
            return prevItems.filter((item) => item.id !== itemId);
          }

          return [];
        });
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  function getTotalCartPrice(): number {
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  const quantityChange = async (id: string, quantity: number) => {
    const item = cartItems
      ? cartItems.find((item) => item.id === id)
      : undefined;

    if (item) {
      const updatedItem = { ...item, quantity };
      const res = await updateCart(updatedItem);

      if (res) {
        setCartItems((prevItems) => {
          if (prevItems) {
            return prevItems.map((prevItem) =>
              prevItem.id === id ? updatedItem : prevItem
            );
          }
          return [];
        });
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        isLoading,
        cartItems,
        getCart,
        updateCart,
        addToCart,
        removeFromCart,
        getTotalCartPrice,
        quantityChange,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
