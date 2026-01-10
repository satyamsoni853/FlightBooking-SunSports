"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../app/ThemeContext";
import { FOOTER_LINKS } from "@/constants";
import { motion, Variants } from "framer-motion";
import { Facebook, Twitter, Instagram, Plane } from "lucide-react"; // Using Lucide icons for consistency

const Footer = () => {
  const { isDarkMode } = useTheme();

  // Theme-aware classes
  const footerBgClass = isDarkMode ? "bg-black" : "bg-gray-50";
  const textColorClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const titleColor = isDarkMode ? "text-white" : "text-brand-blue";

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer
      className={`relative w-full pt-20 pb-28 overflow-hidden ${footerBgClass} ${textColorClass} transition-colors duration-500`}
    >
      {/* Animated Background - Consistent with other pages */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-blue/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Decorative Object - Animated Plane */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[5%] top-[10%] opacity-10 pointer-events-none z-0"
      >
        <Plane className="w-64 h-64 text-brand-blue dark:text-purple-500" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 lg:gap-16"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between">
          {/* Left Column: Brand & Social */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 lg:w-1/3"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-48 h-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/sunsportslogo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-base leading-relaxed opacity-80 max-w-sm">
              Sunspots connects travelers to extraordinary destinations with
              exclusive deals and effortless planning for every type of
              adventure.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
              {[
                { icon: Facebook, href: "/" },
                { icon: Twitter, href: "/" },
                { icon: Instagram, href: "/" },
              ].map((Item, index) => (
                <motion.a
                  key={index}
                  href={Item.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full ${
                    isDarkMode
                      ? "bg-gray-800 text-white hover:bg-purple-600"
                      : "bg-white text-gray-700 hover:bg-brand-blue hover:text-white"
                  } shadow-md transition-all duration-300`}
                >
                  <Item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Links Grid */}
          <motion.div
            variants={itemVariants}
            className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-5">
                <h3
                  className={`text-lg font-bold ${titleColor} uppercase tracking-wider`}
                >
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`text-sm sm:text-base transition-all duration-200 hover:pl-2 inline-block ${
                          isDarkMode
                            ? "text-gray-400 hover:text-yellow-400"
                            : "text-gray-600 hover:text-yellow-500"
                        }`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: Copyright */}
        <motion.div
          variants={itemVariants}
          className="w-full pt-8 mt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm sm:text-base opacity-70 text-yellow-600 dark:text-yellow-400">
              Copyright &copy; 2020. Sunspots Holidays. All rights reserved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
