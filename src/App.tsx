import React from 'react';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { useApp } from './hooks/useApp';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentView, selectedProduct, setCurrentView, setSelectedProduct } = useApp();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'product':
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'cart':
        return <Cart onBack={() => setCurrentView('home')} />;
      default:
        return (
          <>
            <Hero />
            <ProductGrid
              onProductSelect={(product) => {
                setSelectedProduct(product);
                setCurrentView('product');
              }}
            />
          </>
        );
    }
  };

  return (
    <CartProvider>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50">
        <Header onViewChange={setCurrentView} />
        {renderView()}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;