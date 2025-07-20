import React, { useState, useEffect } from 'react'; // Import useEffect
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Shield, Truck } from 'lucide-react'; // Removed RotateCcw as it was unused
import { Product } from '../hooks/useApp';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  // Initialize selectedColor to 0, or handle cases where product.colors might be empty
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return null;

  // Determine the selected color based on the index
  const selectedColor = product.colors && product.colors.length > selectedColorIndex
    ? product.colors[selectedColorIndex]
    : 'Default Color'; // Fallback if colors array is empty or index is out of bounds

  const handleAddToCart = () => {
    // Ensure product.colors exists and has items before accessing
    if (product.colors && product.colors.length > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor, // Use the determined selectedColor
        quantity: quantity
      });
    } else {
      // Handle case where no colors are available (e.g., show a message)
      console.warn("Cannot add to cart: Product has no colors defined.");
      // Optionally, you could add to cart without a color or show a user-friendly message
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: 'N/A', // Or some other default
        quantity: quantity
      });
    }
  };

  // Gallery images logic
  const galleryImages = (product.images && product.images.length > 0)
    ? product.images as string[]
    : [
        product.image,
        // Fallback images - assumes the URL contains '600' and replacing it generates valid new images
        product.image.replace('600', '601'),
        product.image.replace('600', '602'),
        product.image.replace('600', '603'),
      ].filter(Boolean); // Filter out any potential null/undefined if replace fails unexpectedly

  // Initialize selectedImage state after galleryImages is determined
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  // Update selectedImage if galleryImages changes (e.g., if product changes)
  useEffect(() => {
    if (galleryImages.length > 0 && selectedImage !== galleryImages[0]) {
      setSelectedImage(galleryImages[0]);
    }
  }, [galleryImages, selectedImage]);


  return (
    <div className="luxury-bg pt-24 pb-12 min-h-screen"> {/* Added min-h-screen for better layout */}
      {/* Spotlight Efekti */}
      <div className="luxury-spotlight"></div>
      {/* Lüks Blur Spotlar */}
      <div className="luxury-spot gold" style={{width:'320px',height:'320px',left:'-80px',top:'-80px'}}></div>
      <div className="luxury-spot blue" style={{width:'400px',height:'400px',right:'-120px',bottom:'-120px'}}></div>
      <div className="container mx-auto px-6 max-w-7xl glass-panel gold-border rounded-xl p-8 lg:p-12 shadow-2xl"> {/* Added rounded-xl, p-8, shadow-2xl */}
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors mb-8 group" // Changed to text-red-500 for clarity
        >
          <ArrowLeft className="w-10 h-10 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xl font-semibold">Geri Dön</span> {/* Added text for back button */}
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

              <p className="text-xl text-gray-300 mb-6"> {/* Changed text-red to text-gray-300 for description */}
                {product.description}
              </p>

              <div className="text-4xl font-bold text-teal-600 mb-8">
                ₺{product.price}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Renk Seçimi:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out ${
                        selectedColorIndex === index
                          ? 'border-teal-500 ring-4 ring-teal-300 ring-opacity-50 scale-110'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }} // Ensure color name is valid CSS color
                      onClick={() => setSelectedColorIndex(index)}
                      title={color} // Add title for accessibility
                    >
                      {/* Optional: Add a checkmark icon if selected */}
                      {selectedColorIndex === index && (
                        <span className="block w-full h-full flex items-center justify-center text-white text-xl">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"> {/* Adjusted for better mobile layout */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white"> {/* Added bg-white */}
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-l-lg text-gray-800 font-bold text-xl"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium text-lg text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-r-lg text-gray-800 font-bold text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete ekle
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg transition-all ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600' // Adjusted colors for better contrast
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"> {/* Adjusted colors */}
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300"> {/* Changed text-red to text-gray-300 */}
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
                 <div className="font-medium text-gray-800">Garanti Kalite</div> {/* Changed text-red to text-gray-800 */}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
                <Truck className="w-6 h-6 text-teal-600" />
                <div>
                  <div className="font-medium text-gray-800">Ücretsiz Kargo</div> {/* Changed text-red to text-gray-800 */}
                </div>
              </div>

              {/* Added a third guarantee for completeness */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
                <RotateCcw className="w-6 h-6 text-teal-600" /> {/* Using RotateCcw now */}
                <div>
                  <div className="font-medium text-gray-800">30 Gün İade</div>
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
