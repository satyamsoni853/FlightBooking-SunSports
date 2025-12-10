"use client";
import React from "react";
import { Wifi, Coffee, Tv, Battery, Plane } from "lucide-react";
import { motion } from "framer-motion";

const PopularRoutesPage = () => {
  const routes = [
    {
      id: 1,
      airline: "Emirates",
      logoText: "EK",
      logoColor: "bg-red-600",
      from: "New York (JFK)",
      to: "Dubai (DXB)",
      duration: "12h 30m",
      departure: "10:45 AM",
      arrival: "11:15 PM",
      price: "$1,240",
      description:
        "Experience the height of luxury on our flagship A380 service to Dubai. Enjoy award-winning inflight entertainment, gourmet meals prepared by world-class chefs, and our renowned hospitality. Economy Class offers spacious seating with adjustable headrests, while our Business and First Class cabins define premium travel.",
      amenities: ["Free Wi-Fi", "Gourmet Meals", "Live TV", "Power Outlets"],
      image: "/destination-1.jpg", // Placeholder, we can look for real images later or use colors
    },
    {
      id: 2,
      airline: "Delta",
      logoText: "DL",
      logoColor: "bg-[#2B2B6A]",
      from: "London (LHR)",
      to: "New York (JFK)",
      duration: "08h 15m",
      departure: "02:20 PM",
      arrival: "05:35 PM",
      price: "$890",
      description:
        "Fly trans-atlantic in comfort with Delta One suites available on select flights. Enjoy a seamless travel experience with Priority Boarding and superior service. Our modernized fleet ensures a smooth journey with state-of-the-art cabin pressure comfort and reduced noise levels.",
      amenities: ["Wi-Fi", "Meals", "Movies", "USB Power"],
    },
    {
      id: 3,
      airline: "Qatar Airways",
      logoText: "QR",
      logoColor: "bg-purple-700",
      from: "Doha (DOH)",
      to: "Sydney (SYD)",
      duration: "16h 30m",
      departure: "08:15 PM",
      arrival: "05:45 PM (+1)",
      price: "$1,560",
      description:
        "Discover the world's best business class, Qsuite, offering privacy and luxury like never before. Our long-haul service to Sydney is designed for rest and relaxation, featuring mood lighting and our bespoke Oryx One entertainment system with over 4,000 options.",
      amenities: [
        "Super Wi-Fi",
        "A la carte Dining",
        "4K Screens",
        "Privacy Doors",
      ],
    },
    {
      id: 4,
      airline: "Singapore Air",
      logoText: "SQ",
      logoColor: "bg-yellow-600",
      from: "Singapore (SIN)",
      to: "Tokyo (NRT)",
      duration: "06h 50m",
      departure: "09:30 AM",
      arrival: "05:20 PM",
      price: "$920",
      description:
        "Impeccable service awaits you on our route to Tokyo. Savor authentic Japanese cuisine or international favorites. Our cabins are designed with ergonomics in mind to ensure you arrive refreshed and ready to explore the neon-lit streets of Tokyo.",
      amenities: ["Wi-Fi", "Asian Cuisine", "Blockbusters", "AC Power"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-[#2B2B6A] overflow-hidden rounded-b-[50px] shadow-2xl">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B6A] to-purple-900 opacity-90"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-400 font-bold tracking-widest uppercase mb-4 text-sm"
          >
            Discover More
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Popular Routes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 text-lg max-w-2xl font-light"
          >
            Explore our most sought-after destinations with comprehensive
            details to help you plan your perfect journey.
          </motion.p>
        </div>
      </div>

      {/* Routes List */}
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8 -mt-20 relative z-20">
        {routes.map((route, index) => (
          <RouteCard key={route.id} route={route} index={index} />
        ))}
      </div>
    </div>
  );
};

interface RouteData {
  id: number;
  airline: string;
  logoText: string;
  logoColor: string;
  from: string;
  to: string;
  duration: string;
  departure: string;
  arrival: string;
  price: string;
  description: string;
  amenities: string[];
  logo?: string;
  bgImage?: string;
}

const RouteCard = ({ route, index }: { route: RouteData; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 overflow-hidden relative group"
    >
      {/* Decorative background blotch */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors duration-500" />

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Left: General Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 ${route.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
            >
              {route.logoText}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {route.airline}
              </h3>
              <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                Flight Information
              </p>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <span className="text-3xl font-extrabold text-[#2B2B6A] dark:text-purple-400">
                {route.price}
              </span>
              <span className="text-xs text-gray-400">avg. per person</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100 dark:border-gray-700">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {route.departure}
              </div>
              <div className="text-sm font-semibold text-gray-500">
                {route.from}
              </div>
            </div>

            <div className="flex flex-col items-center flex-1 px-4">
              <div className="text-xs text-gray-400 mb-2 font-mono">
                {route.duration}
              </div>
              <div className="w-full flex items-center gap-2">
                <div className="h-[2px] w-full bg-gray-300 dark:bg-gray-600 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                <Plane className="w-5 h-5 text-purple-500 rotate-90" />
              </div>
              <div className="text-xs text-green-500 mt-2 font-bold uppercase tracking-wider">
                Non-stop
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {route.arrival}
              </div>
              <div className="text-sm font-semibold text-gray-500">
                {route.to}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-3">
            {route.amenities.map((amenity: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold flex items-center gap-1.5"
              >
                {getAmenityIcon(amenity)}
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Description & CTA */}
        <div className="lg:w-1/3 flex flex-col justify-between space-y-6 lg:border-l border-gray-100 dark:border-gray-700 lg:pl-8">
          <div className="space-y-3">
            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span className="w-1 h-6 bg-yellow-400 rounded-full"></span>
              Flight Experience
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {route.description}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#2B2B6A] hover:bg-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 group/btn"
          >
            <span>Book This Flight</span>
            <Plane className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const getAmenityIcon = (name: string) => {
  if (name.includes("Wi-Fi")) return <Wifi className="w-3 h-3" />;
  if (
    name.includes("Meal") ||
    name.includes("Dining") ||
    name.includes("Cuisine")
  )
    return <Coffee className="w-3 h-3" />;
  if (name.includes("TV") || name.includes("Movie") || name.includes("4K"))
    return <Tv className="w-3 h-3" />;
  if (name.includes("Power")) return <Battery className="w-3 h-3" />;
  return <Plane className="w-3 h-3" />;
};

export default PopularRoutesPage;
