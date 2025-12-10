"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plane, MapPin, Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/10 text-sm font-medium text-[#2B2B6A] dark:text-purple-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Explore the world with us
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#2B2B6A] dark:text-white">
            Discover Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Next Adventure
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            Experience the thrill of travel with our premium flight booking
            service. We offer the best deals for your dream destinations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/flights/results">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#2B2B6A] dark:bg-white text-white dark:text-[#2B2B6A] rounded-full font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2"
              >
                Book a Flight <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/popular-routes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-[#2B2B6A] dark:text-white rounded-full font-bold flex items-center gap-2 hover:bg-white dark:hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-5 h-5" /> Popular Routes
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Image/Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] hidden lg:block"
        >
          {/* Abstract Plane Visual */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <Plane
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-[#2B2B6A] dark:text-white drop-shadow-2xl"
                strokeWidth={0.5}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
