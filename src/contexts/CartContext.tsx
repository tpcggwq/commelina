import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity: number }) => void;
  removeFromCart: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity: number }) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === newItem.id && item.color === newItem.color
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id && item.color === newItem.color
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...currentItems, { ...newItem, quantity: newItem.quantity }];
    });
  };

  const removeFromCart = (id: string, color: string) => {
    setItems(currentItems =>
      currentItems.filter(item => !(item.id === id && item.color === color))
    );
  };

  const updateQuantity = (id: string, color: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};