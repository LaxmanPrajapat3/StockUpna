import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "Smart Investment Assistant",
      desc: "Get answer and guidance through an interactive chat-based assistant",
      src:"../src/assets/Features_Logo_1.png",
    },
    {
      title: "Learning Mode",
      desc: "Explore educational courses and tutorial’s at your own pace",
      src:"",
    },
    {
      title: "Portfolio Analyzer",
      desc: "View insights into your portfolio’s performance and allocation",
      src:"",
    },
    {
      title: "Custom Alerts & Goals",
      desc: "Set investment goals and get notified of key changes in the market",
      src:"",
    },
  ];

  return (
    <section className="w-full  py-16 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <a href=""><motion.div
            key={index}
            className="bg-white shadow p-6 rounded-xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Replace with your actual image path */}
            <div className="mb-4">
              <img alt={item.title} src={item.src} className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </motion.div></a>
        ))}
      </div>
    </section>
  );
}
