/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";
import backendURL from "../api";

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
  getCart: () => Promise<boolean>;
  addToCart: (item: CartItem) => Promise<boolean>;
  updateCart: (item: CartItem) => Promise<boolean>;
  removeFromCart: (itemId: number) => Promise<boolean>;
  getTotalCartPrice: () => number;
  quantityChange: (id: number, quantity: number) => void;
}

// Create the initial context
const initialCartContext: CartContextProps = {
  cartItems: [],
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
  };

  const deleteItem = async (id: string) => {
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
  };

  const addToCart = async (item: CartItem) => {
    setIsLoading(true);

    setCartItems((prevItems) => {
      if (prevItems.find((prevItem) => prevItem.id === item.id)) {
        return prevItems.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...prevItem, quantity: prevItem.quantity + item.quantity };
          }
          return prevItem;
        });
      }

      return [...prevItems, item];
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
  };

  const updateCart = async (item: CartItem) => {
    setIsLoading(true);

    setCartItems((prevItems) => [...prevItems, item]);

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
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  const removeFromCart = async (itemId: number) => {
    deleteItem(itemId.toString())
      .then((res) => {
        if (res) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return true;
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
