import { motion } from 'motion/react';
import { PhoneCall, Ruler, PenTool, Factory, Truck, Wrench } from 'lucide-react';

const steps = [
  {
    icon: <PhoneCall size={24} />,
    title: '在线预约',
    desc: '拨打热线或在线留言',
  },
  {
    icon: <Ruler size={24} />,
    title: '免费量房',
    desc: '专业团队上门测量',
  },
  {
    icon: <PenTool size={24} />,
    title: '方案设计',
    desc: '出具3D效果图及报价',
  },
  {
    icon: <Factory size={24} />,
    title: '工厂生产',
    desc: '精细加工，严格质检',
  },
  {
    icon: <Truck size={24} />,
    title: '物流配送',
    desc: '安全送达客户家中',
  },
  {
    icon: <Wrench size={24} />,
    title: '上门安装',
    desc: '专业师傅安装调试',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-light mb-4"
        >
          服务流程
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-1 bg-primary mx-auto rounded-full mb-16"
        />

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4 transition-all duration-300 group-hover:border-primary group-hover:text-primary group-hover:shadow-lg group-hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
