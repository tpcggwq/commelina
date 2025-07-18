import React from 'react';
import { Waves, Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import BubbleBackground from './BubbleBackground';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden pt-0">
      {/* Üst geçiş için gradient overlay */}
      <div className="absolute left-0 right-0 top-0 h-16 z-10 pointer-events-none" style={{background: 'linear-gradient(to top, rgba(30,41,59,0) 0%, #101522 100%)'}} />
      {/* Animasyonlu Dalga SVG */}
      <div className="relative w-full" style={{height:'60px', zIndex: 2}}>
        <svg viewBox="0 0 1440 60" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="footerwave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
          <g>
            <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="60" dur="8s" repeatCount="indefinite" />
            <path d="M0,40 C360,60 1080,0 1440,40 V60 H0 V40 Z" fill="url(#footerwave)" fillOpacity="0.7" />
          </g>
        </svg>
      </div>
      {/* Kabarcıklar tüm footerı kaplasın */}
      <BubbleBackground zIndex={1} />
      {/* İçerik */}
      <div className="px-6 py-12">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Marka ve Slogan */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="w-8 h-8 text-teal-400 animate-bounce-slow" />
              <h3 className="text-2xl font-bold">Commelina Home</h3>
            </div>
            <p className="text-gray-300 mb-2">
              Mükemmel tatiliniz için tasarlanmış lüks plaj havluları. Premium kalite, şık tasarım.
            </p>
            {/* İletişim Bilgileri */}
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-300" />
                <span>commelina@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-300" />
                <span>+90 555 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-cyan-300" />
                <a href="https://instagram.com/commelina_home" target="_blank" rel="noopener noreferrer" className="hover:underline">@commelina_home</a>
              </div>
            </div>
          </div>
          {/* Hızlı Bağlantılar */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Koleksiyonlar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beden Rehberi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Bakım Talimatları</a></li>
            </ul>
          </div>
          {/* Sosyal Medya ve Animasyon */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Bizi Takip Edin</h4>
            <div className="flex gap-4">
              <a href="#" className="group">
                <Facebook className="w-7 h-7 text-cyan-300 group-hover:animate-wiggle" />
              </a>
              <a href="https://instagram.com/commelina_home" target="_blank" rel="noopener noreferrer" className="group">
                <Instagram className="w-7 h-7 text-cyan-300 group-hover:animate-wiggle" />
              </a>
              <a href="#" className="group">
                <Twitter className="w-7 h-7 text-cyan-300 group-hover:animate-wiggle" />
              </a>
            </div>
            <style>{`
              @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                20% { transform: rotate(-10deg); }
                40% { transform: rotate(10deg); }
                60% { transform: rotate(-8deg); }
                80% { transform: rotate(8deg); }
              }
              .animate-wiggle { animation: wiggle 0.7s ease-in-out; }
              .animate-bounce-slow { animation: bounce 2.5s infinite; }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}</style>
          </div>
          {/* Hareketli Slogan */}
          <div className="flex flex-col items-center md:items-end justify-between h-full">
            <div className="overflow-hidden w-full">
              <div className="whitespace-nowrap animate-marquee text-cyan-200 text-lg font-semibold">
                Denizden ilham alan tasarımlar, Commelina Home ile plaj çantanızda! &nbsp;•&nbsp; Plaj keyfi, kalite ve şıklık bir arada! &nbsp;•&nbsp; Hayalinizdeki tatil için en güzel havlular burada!
              </div>
            </div>
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .animate-marquee {
                animation: marquee 18s linear infinite;
              }
            `}</style>
          </div>
        </div>
        {/* Alt Kısım */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <span>© 2024 Commelina Home. Tüm hakları saklıdır.</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">Çerezler</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;