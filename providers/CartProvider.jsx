"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  const addToCart = (recipe) => {
    setCart(prev => {
      const newCart = [...prev, recipe];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (recipeId) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.idMeal !== recipeId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 