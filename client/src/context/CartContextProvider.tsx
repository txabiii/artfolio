import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../utils/interfaces';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  removeAllFromCart: () => void;
  updateDisplayedQuantity: (product: Product) => void
  updateProductQuantity: (product: Product, quantity: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  updateDisplayedQuantity: () => {},
  updateProductQuantity: () => {},
});

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    const existingCartItem = cartItems.find((item) => item.product.product_id === product.product_id);
    if (existingCartItem) {
      const resultingQuantity = existingCartItem.quantity + quantity;
      if(resultingQuantity === 0) return;
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + quantity,
        displayed_quantity: `${resultingQuantity}`
      };
      const updatedCartItems = cartItems.map((item) => (item.product.product_id === product.product_id ? updatedCartItem : item));
      setCartItems(updatedCartItems);
    } else {
      const newCartItem: CartItem = {
        product,
        quantity,
        displayed_quantity: `${quantity}`,
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const updateDisplayedQuantity = (product: Product) => {
    const cartItem = cartItems.find((item) => item.product.product_id === product.product_id);
    if(cartItem) {
      const updatedCartItem = {
        ...cartItem,
        displayed_quantity: ''
      };
      const updatedCartItems = cartItems.map((item) => (item.product.product_id === product.product_id ? updatedCartItem : item));
      setCartItems(updatedCartItems);
    }
  }

  const updateProductQuantity = (product: Product, quantity: number) => {
    const cartItem = cartItems.find((item) => item.product.product_id === product.product_id);
    if(cartItem) {
      const updatedCartItem = {
        ...cartItem,
        quantity: quantity,
        displayed_quantity: `${quantity}`,
      };
      const updatedCartItems = cartItems.map((item) => (item.product.product_id === product.product_id ? updatedCartItem : item));
      setCartItems(updatedCartItems);
    }
  }

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.product.product_id !== productId);
    setCartItems(updatedCartItems);
  };

  const removeAllFromCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    updateDisplayedQuantity,
    updateProductQuantity
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
