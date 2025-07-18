import React, { useState } from 'react';
import BubbleBackground from './BubbleBackground';
import { Heart, Star, Eye, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../hooks/useApp';

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = [
    { key: 'all', label: 'Hepsi' },
    { key: 'Kırmızı', label: 'Kırmızı' },
    { key: 'Sarı', label: 'Sarı' },
    { key: 'Mavi', label: 'Mavi' },
    { key: 'Yeşil', label: 'Yeşil' },
    { key: 'Turuncu', label: 'Turuncu' },
    { key: 'Gri', label: 'Gri ' },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Kırmızı plaj havlusu',
      price: 1700,
      image: 'https://i.imgur.com/Kzmx4wQ.jpeg?auto=compress&cs=tinysrgb&w=600',
      images: [
        'https://i.imgur.com/Kzmx4wQ.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/rE10YHB.jpeg',
        'https://i.imgur.com/msQUaYV.jpeg',
        'https://i.imgur.com/G0ckRcn.jpeg'
      ],
      category: 'Kırmızı',
      description: 'Premium cotton blend with ocean-inspired design',
      features: ['100% Premium Cotton', 'Quick-Dry Technology', 'UV Protection'],
      colors: ['Ocean Blue', 'Seafoam Green', 'Coral Pink'],
      size: '180cm x 90cm'
    },
    {
      id: '2',
      name: 'Sarı plaj havlusu',
      price: 1700,
      image: 'https://i.imgur.com/tD4Xk6n.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://i.imgur.com/tD4Xk6n.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://i.imgur.com/PiubS5v.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/msQUaYV.jpeg',
        'https://i.imgur.com/NHgM8z6.jpeg'
      ],
      category: 'Sarı',
      description: 'Vibrant tropical patterns for beach lovers',
      features: ['Microfiber Blend', 'Sand-Resistant', 'Compact Travel Size'],
      colors: ['Tropical Green', 'Sunset Orange', 'Palm Yellow'],
      size: '160cm x 80cm'
    },
    {
      id: '3',
      name: 'Mavi plaj havlusu',
      price: 1700,
      image: 'https://i.imgur.com/0MaQfjs.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://i.imgur.com/0MaQfjs.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://i.imgur.com/dwYNmxS.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/rpREnTW.jpeg',
        'https://i.imgur.com/NHgM8z6.jpeg'
      ],
      category: 'Mavi',
      description: 'High-performance towel for active lifestyles',
      features: ['Ultra-Absorbent', 'Antibacterial', 'Lightweight'],
      colors: ['Athletic Blue', 'Sport Grey', 'Energy Red'],
      size: '150cm x 75cm'
    },
    {
      id: '4',
      name: 'Yeşil plaj havlusu',
      price: 1700,
      image: 'https://i.imgur.com/vsqCs9I.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://i.imgur.com/vsqCs9I.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://i.imgur.com/KcxGrNG.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/msQUaYV.jpeg',
        'https://i.imgur.com/NHgM8z6.jpeg'
      ],
      category: 'Yeşil',
      description: 'Playful designs perfect for little ones',
      features: ['Soft Cotton', 'Fun Patterns', 'Machine Washable'],
      colors: ['Rainbow', 'Ocean Animals', 'Mermaid Dreams'],
      size: '120cm x 60cm'
    },
    {
      id: '5',
      name: 'Turuncu Plaj Havlusu',
      price: 1700,
      image: 'https://i.imgur.com/r78zT5m.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://i.imgur.com/r78zT5m.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://i.imgur.com/fHXDsEF.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/msQUaYV.jpeg',
        'https://i.imgur.com/NHgM8z6.jpeg'
      ],
      category: 'Turuncu',
      description: 'Clean lines and sophisticated design',
      features: ['Egyptian Cotton', 'Minimalist Design', 'Premium Finish'],
      colors: ['Pure White', 'Coastal Grey', 'Sand Beige'],
      size: '200cm x 100cm'
    },
    {
      id: '6',
      name: 'Gri Plaj Havlusu',
      price: 1700,
      image: 'https://i.imgur.com/eibDTZb.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://i.imgur.com/eibDTZb.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://i.imgur.com/eATco2Z.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://i.imgur.com/msQUaYV.jpeg',
        'https://i.imgur.com/NHgM8z6.jpeg'
      ],
      category: 'Gri',
      description: 'Classic striped patterns with modern twist',
      features: ['Cotton Blend', 'Fade-Resistant', 'Easy Care'],
      colors: ['Navy Stripes', 'Teal Stripes', 'Coral Stripes'],
      size: '170cm x 85cm'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = async (category: string) => {
    if (category === selectedCategory) return;
    
    setIsTransitioning(true);
    
    // Simulate category transition animation
    setTimeout(() => {
      setSelectedCategory(category);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 400);
  };

  // Kategoriye göre gradient class döndüren fonksiyon
  const getCategoryGradient = (key: string, selected: boolean) => {
    if (key === 'all' || key === 'Hepsi') {
      return selected
        ? 'bg-gradient-to-r from-cyan-900 to-cyan-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-cyan-200 to-cyan-50 text-cyan-900 shadow-md hover:bg-gradient-to-r hover:from-cyan-300 hover:to-cyan-100 hover:text-cyan-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'sarı') {
      return selected
        ? 'bg-gradient-to-r from-yellow-700 to-yellow-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-yellow-200 to-yellow-50 text-yellow-900 shadow-md hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-100 hover:text-yellow-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'kırmızı') {
      return selected
        ? 'bg-gradient-to-r from-red-800 to-red-300 text-white shadow-lg'
        : 'bg-gradient-to-r from-red-200 to-red-50 text-red-900 shadow-md hover:bg-gradient-to-r hover:from-red-300 hover:to-red-100 hover:text-red-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'mavi') {
      return selected
        ? 'bg-gradient-to-r from-blue-900 to-blue-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-blue-200 to-blue-50 text-blue-900 shadow-md hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-100 hover:text-blue-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'yeşil') {
      return selected
        ? 'bg-gradient-to-r from-green-800 to-green-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-green-200 to-green-50 text-green-900 shadow-md hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 hover:text-green-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'turuncu') {
      return selected
        ? 'bg-gradient-to-r from-orange-700 to-orange-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-orange-200 to-orange-50 text-orange-900 shadow-md hover:bg-gradient-to-r hover:from-orange-300 hover:to-orange-100 hover:text-orange-800 hover:shadow-lg';
    }
    if (key.toLowerCase() === 'gri') {
      return selected
        ? 'bg-gradient-to-r from-gray to-gray-200 text-white shadow-lg'
        : 'bg-gradient-to-r from-gray-200 to-gray-50 text-gray-900 shadow-md hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-100 hover:text-gray-800 hover:shadow-lg';
    }
    return 'bg-white text-gray-600';
  };

  // Kategoriye uygun gradient background döndüren fonksiyon (sadece badge için)
  const getCategoryBadgeGradient = (category: string) => {
    switch (category) {
      case 'Kırmızı':
        return 'linear-gradient(to right, #b91c1c, #fca5a5)';
      case 'Sarı':
        return 'linear-gradient(to right, #ca8a04, #fde68a)';
      case 'Mavi':
        return 'linear-gradient(to right, #1e3a8a, #93c5fd)';
      case 'Yeşil':
        return 'linear-gradient(to right, #065f46, #6ee7b7)';
      case 'Turuncu':
        return 'linear-gradient(to right, #ea580c, #fdba74)';
      case 'Gri':
        return 'linear-gradient(to right, #334155, #cbd5e1)';
      default:
        return 'linear-gradient(to right, #06b6d4, #a7f3d0)';
    }
  };

  return (
    <section id="koleksiyon" className="luxury-bg py-20 px-6 relative overflow-hidden">
      {/* Alt geçiş için gradient overlay */}
      <div className="absolute left-0 right-0 bottom-0 h-16 z-10 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(30,41,59,0) 0%, #101522 100%)'}} />
      {/* Kabarcıklar arka plan */}
      <BubbleBackground zIndex={1} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-5"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#14B8A6' : '#3B82F6'} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.1, 0.05],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="collection-animated-title text-4xl md:text-5xl font-extrabold mb-4"
            animate={{
              textShadow: [
                '0 0 20px rgba(20, 184, 166, 0.1)',
                '0 0 30px rgba(59, 130, 246, 0.2)',
                '0 0 20px rgba(20, 184, 166, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent relative">
              Koleksiyonumuz
            </span>
            {/* Dalga SVG */}
            <svg className="collection-wave-svg" viewBox="0 0 600 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,16 Q100,24 200,16 T400,16 T600,16 V24 H0Z" fill="#3b82f6" fillOpacity="0.18" />
              <path d="M0,8 Q120,20 240,8 T480,8 T600,8 V24 H0Z" fill="#22d3ee" fillOpacity="0.13" />
            </svg>
          </motion.h2>
          {/* Parlayan slogan */}
          <motion.p 
            className="text-lg text-cyan-600 max-w-2xl mx-auto font-semibold mb-2"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: false }}
          >
            Yaza özel yepyeni koleksiyonlar burada! ✨
          </motion.p>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Özenle seçilmiş premium plaj havlusu koleksiyonumuzu keşfedin
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${getCategoryGradient(category.key, selectedCategory === category.key)}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category.key && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${getCategoryGradient(category.key, true)}`}
                  layoutId="activeCategory"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                {category.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="transition"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
            >
              {/* Ocean Wave Transition Effect */}
              <div className="col-span-full flex items-center justify-center">
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                  <motion.div
                    className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full"
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product: Product, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25 + index * 0.08 }}
                  viewport={{ once: false }}
                  className="relative glass-panel gold-border overflow-hidden group"
                  style={{ minHeight: '420px', background: 'rgba(30,41,59,0.55)' }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Kart arkasında spotlight */}
                  <div className="luxury-spotlight" style={{width:'220px',height:'120px',left:'50%',top:'60%',transform:'translate(-50%,-50%)',zIndex:1}}></div>
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Water Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, borderRadius: '50%' }}
                      whileHover={{ 
                        scale: 2, 
                        borderRadius: '0%',
                        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)'
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Floating Action Buttons */}
                    <AnimatePresence>
                      {hoveredProduct === product.id && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="absolute top-4 right-4 flex flex-col gap-2"
                        >
                          <motion.button 
                            className="p-2 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                          </motion.button>
                          <motion.button 
                            onClick={() => onProductSelect(product)}
                            className="p-2 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-5 h-5 text-gray-600 hover:text-teal-600" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span
                        className="px-3 py-1 text-white text-sm font-medium rounded-full shadow-lg"
                        style={{ background: getCategoryBadgeGradient(product.category) }}
                      >
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    </motion.div>

                    {/* Enhanced Multi-Layer Wave Effect (Daha Belirgin) */}
                    <div className="absolute left-0 w-full h-20 overflow-hidden pointer-events-none" style={{zIndex:2, bottom: '-28px'}}>
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 1440 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'block', position: 'absolute', bottom: 0, left: 0 }}
                      >
                        <defs>
                          <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#a7f3d0" />
                          </linearGradient>
                          <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#fff" />
                          </linearGradient>
                        </defs>
                        <g>
                          <path fill="url(#wave1)" fillOpacity="0.95">
                            <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="80" dur="6s" repeatCount="indefinite" />
                            <animate attributeName="d" dur="6s" repeatCount="indefinite"
                              values="M0,60 C360,120 1080,0 1440,60 V100 H0 V60 Z;
                                      M0,70 C360,110 1080,10 1440,70 V100 H0 V70 Z;
                                      M0,60 C360,120 1080,0 1440,60 V100 H0 V60 Z" />
                          </path>
                          <path fill="url(#wave2)" fillOpacity="0.7">
                            <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-100" dur="9s" repeatCount="indefinite" />
                            <animate attributeName="d" dur="9s" repeatCount="indefinite"
                              values="M0,80 C400,20 1040,100 1440,80 V100 H0 V80 Z;
                                      M0,90 C400,30 1040,110 1440,90 V100 H0 V90 Z;
                                      M0,80 C400,20 1040,100 1440,80 V100 H0 V80 Z" />
                          </path>
                        </g>
                      </svg>
                      {/* Altı tamamen beyaz kapatıcı kaldırıldı */}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      {product.name}
                    </motion.h3>
                    <p className="text-white/80 mb-4">{product.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4 text-white">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                      <span className="text-sm text-white/70 ml-2">(4.8)</span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <motion.span 
                        className="text-2xl font-bold text-cyan-300"
                        animate={{
                          textShadow: [
                            '0 0 10px rgba(20, 184, 166, 0.3)',
                            '0 0 20px rgba(20, 184, 166, 0.5)',
                            '0 0 10px rgba(20, 184, 166, 0.3)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ₺{product.price}
                      </motion.span>
                      <motion.button
                        onClick={() => onProductSelect(product)}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 10px 25px rgba(20, 184, 166, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Detayları Gör</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductGrid;