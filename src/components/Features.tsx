import React from "react";

const Features = () => {
  const features = [
    {
      title: "Best Prices",
      description:
        "We offer the most competitive prices for your flights, guaranteed.",
      icon: "💰",
    },
    {
      title: "Global Coverage",
      description:
        "Fly to any corner of the world with our extensive network of partners.",
      icon: "🌍",
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is here to help you anytime, anywhere.",
      icon: "🎧",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide an exceptional travel experience from booking to landing.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
