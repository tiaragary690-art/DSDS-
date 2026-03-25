import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import EditableImage from './EditableImage';
import { openBookingModal } from '../utils/booking';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          id="hero-bg"
          defaultSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
          alt="Modern living room interior"
          className="w-full h-full"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl uppercase tracking-[0.2em] mb-6 text-gray-200 font-medium"
        >
          郑州隆腾全屋定制
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight mb-8 max-w-4xl"
        >
          为您打造<br />
          <span className="italic font-normal">理想的家</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl font-light"
        >
          从设计到安装，我们提供一站式全屋定制解决方案。环保材质，精湛工艺，让您的生活空间焕然一新。
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={openBookingModal}
            className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-primary-dark transition-all hover:scale-105 shadow-xl shadow-primary/20"
          >
            <Calendar size={18} />
            免费预约设计
            <ArrowRight size={16} />
          </button>
          <a
            href="#gallery"
            className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
          >
            查看案例
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
