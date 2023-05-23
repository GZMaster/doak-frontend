/* eslint-disable @typescript-eslint/no-empty-function */
import { promises } from "dns";
import React, { createContext, useState } from "react";

// Define the shape of the cart item
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

// Define the shape of the context
interface CartContextProps {
  cartItems: CartItem[];
  isLoading: boolean;
  getCart: () => void;
  addToCart: (item: CartItem) => Promise<boolean>;
  updateCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  getTotalCartPrice: () => number;
  quantityChange: (id: number, quantity: number) => void;
}

// Create the initial context
const initialCartContext: CartContextProps = {
  cartItems: [],
  isLoading: false,
  getCart: () => {},
  addToCart: () => {
    return new Promise(() => {});
  },
  updateCart: () => {},
  removeFromCart: () => {},
  getTotalCartPrice: () => 0,
  quantityChange: () => {},
};

// Create the context
export const CartContext = createContext<CartContextProps>(initialCartContext);

type CartProviderProps = {
  children: React.ReactNode;
};

// Create the provider component
const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCart = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/`,
      // `http://localhost:3000/api/v1/wine/cart/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      const cartData = data.data.cart;
      setCartItems(cartData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return null;
    }
  };

  const deleteItem = async (id: string) => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/${id}`,
      // `http://localhost:3000/api/v1/wine/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setIsLoading(false);

    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  };

  const addToCart = async (item: CartItem) => {
    setIsLoading(true);

    setCartItems((prevItems) => [...prevItems, item]);

    const { id: productId, quantity, price } = item;

    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/${productId}`,
      // `http://localhost:3000/api/v1/wine/cart/${productId}`,
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
  };

  const updateCart = async (item: CartItem) => {
    setIsLoading(true);

    setCartItems((prevItems) => [...prevItems, item]);

    const { id: productId, quantity, price } = item;

    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/${productId}`,
      // `http://localhost:3000/api/v1/wine/cart/${productId}`,
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
      setIsLoading(false);
      return true;
    }
  };

  const removeFromCart = (itemId: number) => {
    deleteItem(itemId.toString()).then((res) => {
      if (res) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      }
    });
  };

  const getTotalCartPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const quantityChange = (id: number, quantity: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      updateCart(item);
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
