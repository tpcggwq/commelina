import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Waves } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ViewType } from '../hooks/useApp';

interface HeaderProps {
  onViewChange: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-gradient-to-r from-[#101522] to-[#1e293b]`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onViewChange('home')}
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <Waves className="w-8 h-8 text-teal-600 group-hover:text-teal-700 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="text-2xl font-bold text-white">
              Commelina Home
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById('about');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="material-symbols-outlined text-lg">home</span>
              Ana Sayfa
            </a>
            <a
              href="#"
              className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById('koleksiyon');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="material-symbols-outlined text-lg">stacks</span>
              Koleksiyonlar
            </a>
            <a
              href="#"
              className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById('contact');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="material-symbols-outlined text-lg">call</span>
              İletişim
            </a>
          </nav>

          {/* Cart & Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('cart')}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors group flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-2xl text-white group-hover:text-cyan-200 transition-colors">shopping_cart_checkout</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-[#101522]/95 backdrop-blur-md rounded-lg border border-cyan-900 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const section = document.getElementById('about');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="material-symbols-outlined text-lg">home</span>
                Ana Sayfa
              </a>
              <a
                href="#"
                className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const section = document.getElementById('koleksiyon');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="material-symbols-outlined text-lg">stacks</span>
                Koleksiyonlar
              </a>
              <a
                href="#"
                className="text-white hover:text-cyan-200 transition-colors font-medium flex items-center gap-1"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const section = document.getElementById('contact');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="material-symbols-outlined text-lg">call</span>
                İletişim
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;