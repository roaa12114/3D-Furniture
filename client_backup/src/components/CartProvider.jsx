import React, { createContext, useState, useEffect } from 'react';

// Create the Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Retrieve cart items from sessionStorage (or return an empty array if none are found)
        const storedCartItems = sessionStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
      });
    
      // Add item to cart
      const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    
        if (existingItem) {
          // Update quantity if item already exists in the cart
          const updatedCartItems = cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          setCartItems(updatedCartItems);
        } else {
          // Add new item to the cart
          const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
          setCartItems(updatedCartItems);
        }
      };
    
      // Remove item from cart
      const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);
      };
    
      // Update item quantity in cart
      const updateCartQuantity = (id, quantity) => {
        const updatedCartItems = cartItems.map((item) =>
          item._id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedCartItems);
      };
    
      // Clear cart
      const clearCart = () => {
        setCartItems([]);
      };
    
      // Effect to store cart items in sessionStorage whenever cartItems state changes
      useEffect(() => {
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);
    
      return (
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
          }}
        >
          {children}
        </CartContext.Provider>
      );
};
