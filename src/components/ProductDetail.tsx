import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ShoppingCart,
  Shield,
  RotateCcw,
  Truck,
} from "lucide-react";
import { Product } from "../hooks/useApp";
import { useCart } from "../contexts/CartContext";

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    // reset selection when product changes
    setSelectedColorIndex(0);
    setQuantity(1);
    setIsLiked(false);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft /> Geri
        </button>
        <div className="mt-8 text-gray-700">Ürün seçilmedi.</div>
      </div>
    );
  }

  const add = () => {
    const color = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex] : "";
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color,
      quantity,
    });
  };

  return (
    <div className="luxury-bg pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-700 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 rounded-xl p-6 shadow-xl">
          {/* Left: Images */}
          <div>
            <div className="rounded-xl overflow-hidden border">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover" />
              ) : (
                <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
              )}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3">
              {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, idx) => (
                <button key={idx} className="w-20 h-20 rounded-md overflow-hidden border" onClick={() => {
                  // simple thumbnail click: swap main image by reordering the images array (local state would be better)
                  // For simplicity, we'll replace the main image by moving selected to front using a temporary approach:
                  const imgs = product.images ?? [product.image];
                  const newImgs = [...imgs];
                  const popped = newImgs.splice(idx, 1);
                  newImgs.unshift(popped[0]);
                  // Note: product is read-only; to properly change main image you would lift state up.
                  // This is a safe UI-only visual trick — leaving actual image swap to app-level logic.
                  (document.querySelector('img[alt="'+product.name+'"]') as HTMLImageElement | null)?.setAttribute('src', newImgs[0]);
                }}>
                  <img src={img} alt={product.name + "-" + idx} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="py-4 px-2">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold">{product.price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 mr-1" />
                <span>4.8</span>
                <span className="text-sm text-gray-500 ml-2">(120)</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Renk</div>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c + i}
                      onClick={() => setSelectedColorIndex(i)}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColorIndex === i ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                      aria-label={"Renk " + c}
                      title={c}
                    >
                      <span className="sr-only">{c}</span>
                      <div style={{ background: c }} className="w-full h-full rounded-full" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded">
                <button className="px-3" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <div className="px-4">{quantity}</div>
                <button className="px-3" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>

              <button onClick={add} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded">
                <ShoppingCart className="w-4 h-4" /> Sepete Ekle
              </button>

              <button onClick={() => setIsLiked(l => !l)} className={`p-2 rounded ${isLiked ? "bg-red-100 text-red-500" : "bg-gray-100"}`}>
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ul className="mb-4 list-disc ml-5 text-gray-700">
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            )}

            {/* Support / Policies */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 border rounded">
                <Shield className="w-5 h-5" />
                <div className="text-xs">Garanti</div>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded">
                <Truck className="w-5 h-5" />
                <div className="text-xs">Ücretsiz Kargo</div>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded">
                <RotateCcw className="w-5 h-5" />
                <div className="text-xs">30 Gün İade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
