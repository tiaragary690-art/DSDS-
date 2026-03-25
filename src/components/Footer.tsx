import { MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
                LT
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wider">隆腾全屋定制</h2>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Longteng Custom</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              致力于为每一个家庭提供高品质、环保、个性化的全屋定制解决方案，让家成为您最温暖的港湾。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">快速链接</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">首页</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">关于我们</a></li>
              <li><a href="#categories" className="text-gray-400 hover:text-primary transition-colors text-sm">定制空间</a></li>
              <li><a href="#process" className="text-gray-400 hover:text-primary transition-colors text-sm">服务流程</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-primary transition-colors text-sm">案例展示</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-6">联系我们</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium mb-1">公司地址</p>
                  <p className="text-sm text-gray-400">河南省郑州市新郑市华阳路14-04<br />隆腾全屋定制工厂</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-medium mb-1">营业时间</p>
                  <p className="text-sm text-gray-400">周一至周日<br />09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 郑州隆腾全屋定制. 保留所有权利.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
            <a href="#admin" className="hover:text-white transition-colors opacity-30 hover:opacity-100">管理登录</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
