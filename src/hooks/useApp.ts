import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  features: string[];
  colors: string[];
  size: string;
}

export type ViewType = 'home' | 'product' | 'cart';

export const useApp = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return {
    currentView,
    selectedProduct,
    setCurrentView,
    setSelectedProduct,
  };
};