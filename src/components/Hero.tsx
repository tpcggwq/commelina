import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const waveRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const logoY = useTransform(scrollY, [0, 500], [0, -150]);
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.6]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);

  const bgImgRef = useRef<HTMLImageElement>(null);

  // Optimize scroll event with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          // Parallax image
          if (bgImgRef.current) {
            bgImgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
          // Wave and logo
          const rate = scrolled * -0.5;
          if (waveRef.current) {
            waveRef.current.style.transform = `translateY(${rate}px)`;
          }
          if (logoRef.current) {
            logoRef.current.style.transform = `translateY(${rate * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinemagraph Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="relative w-full h-[120%] -top-[10%] overflow-hidden"
        >
          {/* Lüks gradient overlay */}
          <div className="hero-gradient-overlay" />
          {/* Noise doku */}
          <div className="hero-noise-bg" />
          {/* Parallax dalga SVG */}
          <motion.svg
            className="hero-parallax-wave"
            viewBox="0 0 1200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: [0, -120, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M0,60 Q300,120 600,60 T1200,60 V120 H0Z" fill="#3b82f6" fillOpacity="0.13" />
            <path d="M0,40 Q400,100 800,40 T1200,40 V120 H0Z" fill="#22d3ee" fillOpacity="0.10" />
          </motion.svg>
          <img
            ref={bgImgRef}
            src="https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Beach Background"
            className="w-full h-full object-cover"
            style={{ transition: 'transform 0.1s linear' }}
          />
          
          {/* Animated Overlay Gradients */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 z-20"
          />
        </div>
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-30">
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} bg-teal-300 rounded-full opacity-60`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full h-40 opacity-40">
          {[...Array(3)].map((_, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 1200 120"
              className="absolute w-full h-full"
              animate={{
                x: [0, -50, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{ bottom: `${i * 10}px` }}
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill={`rgba(20, 184, 166, ${0.1 + i * 0.05})`}
              />
            </motion.svg>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-40 text-center px-6 max-w-6xl mx-auto">
        {/* 3D Logo */}
        <motion.div 
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
          className="mb-8"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative inline-block"
          >
            <motion.h1 
              className="hero-wave-text text-6xl md:text-8xl font-extrabold mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(20, 184, 166, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.3)',
                  '0 0 20px rgba(20, 184, 166, 0.3)'
                ]
              }}
            >
              Commelina Home
            </motion.h1>
            {/* Enhanced 3D Shadow */}
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-black opacity-15 blur-sm transform translate-x-3 translate-y-3 -z-10">
              Commelina Home
            </div>
            {/* Glass Reflection Effect */}
            <motion.div 
              className="absolute inset-0 text-6xl md:text-8xl font-bold bg-gradient-to-r from-white/40 to-transparent bg-clip-text text-transparent transform -skew-x-12"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Commelina Home
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-4 font-light backdrop-blur-sm bg-white/10 rounded-full px-8 py-2 inline-block"
            animate={{ 
              boxShadow: [
                '0 8px 32px rgba(20, 184, 166, 0.1)',
                '0 8px 32px rgba(59, 130, 246, 0.2)',
                '0 8px 32px rgba(20, 184, 166, 0.1)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Mükemmel Kaçamağınız İçin Lüks Plaj Havluları
          </motion.p>
          <motion.div 
            className="flex items-center justify-center space-x-2 text-teal-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-medium">Premium Koleksiyon</span>
            <motion.div
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12"
          viewport={{ once: true }}
        >
          <motion.button 
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full shadow-lg overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(20, 184, 166, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 10px 30px rgba(20, 184, 166, 0.2)',
                '0 15px 35px rgba(59, 130, 246, 0.3)',
                '0 10px 30px rgba(20, 184, 166, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            onClick={() => {
              const section = document.getElementById('koleksiyon');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="relative z-10">Koleksiyonu Keşfet</span>
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Water Ripple Animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white opacity-20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <ArrowDown className="w-6 h-6 text-teal-600 mx-auto drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Alt geçiş için gradient overlay */}
      <div className="absolute left-0 right-0 bottom-0 h-32 z-50 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #101522 100%)'}} />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-50"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default Hero;