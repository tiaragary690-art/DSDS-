import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // The popup is now disabled from showing automatically as requested.
    // If you want to enable it again, uncomment the code below.
    /*
    const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenLeadPopup', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    */
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
            source: 'lead_popup',
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      
      // Close popup after 3 seconds of showing success message
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error saving to Supabase:', err);
      if (err.code === '42P01') {
        setError('数据库表不存在，请在 Supabase 后台创建 bookings 表。');
      } else if (err.code === '42501') {
        setError('权限不足，请在 Supabase 后台开启 RLS 并添加插入政策。');
      } else {
        setError('提交失败，请重试。');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Header Image/Banner Area */}
            <div className="h-24 bg-primary/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              <h3 className="text-xl font-bold text-primary-dark relative z-10">
                隆腾全屋定制
              </h3>
            </div>

            <div className="p-5 sm:p-6 pt-2">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">获取免费设计方案</h4>
                    <p className="text-xs text-gray-500">
                      留下您的联系方式，我们的资深设计师将为您提供一对一专属定制服务
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                        您的姓名
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                        联系电话
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        pattern="[0-9]{11}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                        placeholder="请输入您的11位手机号码"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          正在提交...
                        </>
                      ) : (
                        '立即获取免费方案'
                      )}
                    </button>

                    {error && (
                      <p className="text-red-500 text-[10px] text-center mt-1">{error}</p>
                    )}
                    
                    <p className="text-[10px] text-center text-gray-400 mt-3">
                      * 我们承诺严格保密您的个人信息
                    </p>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">提交成功！</h4>
                  <p className="text-gray-500 text-xs">
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
