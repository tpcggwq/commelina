import React, { useState, useEffect } from 'react'; // Import useEffect
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../hooks/useApp';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once on mount

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[selectedColor],
      quantity: quantity
    });
  };

  // Galeri için örnek görseller (otomatik)
  const galleryImages = (product as any).images && (product as any).images.length > 0
    ? (product as any).images as string[] 
    : [
        product.image,
        product.image.replace('600', '601'),
        product.image.replace('600', '602'),
        product.image.replace('600', '603'),
      ];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="luxury-bg pt-24 pb-12">
      {/* Spotlight Efekti */}
      <div className="luxury-spotlight"></div>
      {/* Lüks Blur Spotlar */}
      <div className="luxury-spot gold" style={{width:'320px',height:'320px',left:'-80px',top:'-80px'}}></div>
      <div className="luxury-spot blue" style={{width:'400px',height:'400px',right:'-120px',bottom:'-120px'}}></div>
      <div className="container mx-auto px-6 max-w-7xl glass-panel gold-border">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red hover:text-teal-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-10 h-10 group-hover:-translate-x-1 transition-transform" />
          
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img: string, i: number) => (
                <div
                  key={i}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow border-2 ${selectedImage === img ? 'border-teal-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-medium font-medium rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-medium text-gray-500 ml-1">(4.8)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <p className="text-xl text-red mb-6">
                {product.description}
              </p>
              
              <div className="text-4xl font-bold text-teal-600 mb-8">
                ₺{product.price}
              </div>
            </div>

        

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete ekle
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg transition-all ${
                  isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-red hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-3 bg-gray-50 text-red hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-red">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
                <Shield className="w-6 h-6 text-teal-600" />
                <div>
                 <div className="font-medium text-red">Garanti Kalite</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
                <Truck className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-medium text-red">ücretsiz kargo</div>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
