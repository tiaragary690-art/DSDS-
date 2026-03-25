import { motion } from 'motion/react';
import { ShieldCheck, Leaf, PenTool, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Leaf size={32} className="text-primary" />,
    title: '环保材质',
    description: '严选E0级环保板材，从源头把控质量，让您的家人住得安心。',
  },
  {
    icon: <PenTool size={32} className="text-primary" />,
    title: '专业设计',
    description: '资深设计师团队，一对一量身定制，满足您的个性化需求。',
  },
  {
    icon: <Wrench size={32} className="text-primary" />,
    title: '精湛工艺',
    description: '引进德国先进生产设备，细节打磨，确保每一件产品都是精品。',
  },
  {
    icon: <ShieldCheck size={32} className="text-primary" />,
    title: '无忧售后',
    description: '五年质保，终身维护。专业售后团队，快速响应您的需求。',
  },
];

export default function Features() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-light mb-4"
          >
            为什么选择隆腾
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-1 bg-primary mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-gray-600 max-w-2xl mx-auto"
          >
            我们不仅是在做家具，更是在为您打造一个温馨、舒适、健康的家。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
