import { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openBookingModal } from '../utils/booking';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '关于隆腾', href: '#about' },
    { name: '全屋定制', href: '#categories' },
    { name: '服务流程', href: '#process' },
    { name: '案例展示', href: '#gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-serif font-bold text-2xl">
            LT
          </div>
          <div>
            <h1 className={`text-2xl font-bold tracking-wider ${isScrolled ? 'text-ink' : 'text-white'}`}>
              隆腾全屋定制
            </h1>
            <p className={`text-[12px] uppercase tracking-widest ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>
              Longteng Custom
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={openBookingModal}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              isScrolled 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20' 
                : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
            }`}
          >
            <Calendar size={16} />
            立即预约
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 ${isScrolled ? 'text-ink' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg py-6 px-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full bg-primary text-white py-4 rounded-xl font-medium mt-2 flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              立即预约免费设计
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
