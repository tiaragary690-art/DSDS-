import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import EditableImage from './EditableImage';

const categories = [
  {
    id: 'category-living-room',
    title: '客厅定制',
    subtitle: 'Living Room',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000',
    description: '电视柜、茶几、展示柜，打造舒适待客空间。',
  },
  {
    id: 'category-bedroom',
    title: '卧室定制',
    subtitle: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000',
    description: '衣柜、床头柜、梳妆台，营造静谧休憩之所。',
  },
  {
    id: 'category-kitchen',
    title: '厨房定制',
    subtitle: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000',
    description: '整体橱柜、岛台、收纳系统，让烹饪成为享受。',
  },
  {
    id: 'category-study',
    title: '书房定制',
    subtitle: 'Study Room',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000',
    description: '书柜、书桌、榻榻米，静心阅读的私密角落。',
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-serif font-light mb-4"
            >
              全屋定制空间
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-1 bg-primary rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600"
            >
              无论您喜欢现代简约、北欧风情还是新中式，我们都能为您量身打造。
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#gallery"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
          >
            探索更多案例 <ArrowRight size={20} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/9]"
            >
              <EditableImage
                id={category.id}
                defaultSrc={category.image}
                alt={category.title}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 pointer-events-none">
                <p className="text-primary font-serif italic text-sm mb-2">{category.subtitle}</p>
                <h3 className="text-2xl font-medium text-white mb-3">{category.title}</h3>
                <p className="text-gray-300 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
