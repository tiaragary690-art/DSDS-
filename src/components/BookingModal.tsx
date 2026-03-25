
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Phone, User, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-booking-modal', handleOpen);

    // Show popup automatically after 3 seconds if not already seen in this session
    const hasSeenBooking = sessionStorage.getItem('hasSeenBookingModal');
    if (!hasSeenBooking) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenBookingModal', 'true');
      }, 3000);
      return () => {
        window.removeEventListener('open-booking-modal', handleOpen);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener('open-booking-modal', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([
          { 
            name: name.trim(), 
            phone: phone.trim(),
            source: 'booking_modal',
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      
      // Close modal after 3 seconds of showing success message
      setTimeout(() => {
        setIsOpen(false);
        // Reset state after closing
        setTimeout(() => {
          setIsSubmitted(false);
          setName('');
          setPhone('');
        }, 500);
      }, 3000);
    } catch (err: any) {
      console.error('Error saving to Supabase:', err);
      if (err.code === '42P01') {
        setError('数据库表不存在，请在 Supabase 后台创建 bookings 表。');
      } else if (err.code === '42501') {
        setError('权限不足，请在 Supabase 后台开启 RLS 并添加插入政策。');
      } else {
        setError('提交失败，请稍后再试或直接拨打电话联系我们。');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-20"
            >
              <X size={24} />
            </button>

            {/* Decorative Header */}
            <div className="bg-primary p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-white/80" size={20} />
                <span className="text-sm font-medium tracking-widest uppercase opacity-80">预约咨询</span>
              </div>
              <h3 className="text-3xl font-serif font-light">
                开启您的<span className="italic">定制之旅</span>
              </h3>
            </div>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    留下您的联系方式，我们的资深设计师将为您提供一对一专属定制服务，为您打造理想的居住空间。
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400"
                        placeholder="您的姓名"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{11}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400"
                        placeholder="联系电话 (11位手机号)"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          正在提交...
                        </>
                      ) : (
                        '立即预约免费设计'
                      )}
                    </button>

                    {error && (
                      <p className="text-red-500 text-xs text-center mt-2">{error}</p>
                    )}
                    
                    <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>我们承诺严格保密您的个人信息</span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    </div>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-serif font-light text-gray-900 mb-3">预约提交成功！</h4>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    感谢您的信任，我们的专属客服将尽快与您联系，请保持电话畅通。
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
