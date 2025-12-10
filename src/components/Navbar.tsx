"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../app/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  User,
  LogOut,
  ShoppingBag,
  Tag,
  Menu,
  X,
} from "lucide-react";

// Custom golden shadow utility
const GOLDEN_SHADOW = "0 4px 15px 0 rgba(184, 134, 11, 0.4)"; // DarkGoldenrod shadow

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights/results" },
    { name: "Popular Routes", href: "/popular-routes" },
  ];

  const profileLinks = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "My Orders", href: "/orders", icon: ShoppingBag },
    { name: "My Offers", href: "/offers", icon: Tag },
  ];

  // Glass Effect and Golden Shadow application
  const glassEffect = isDarkMode
    ? `bg-black/60 backdrop-blur-xl border-b border-white/10 supports-[backdrop-filter]:bg-black/40`
    : `bg-white/60 backdrop-blur-xl border-b border-white/20 supports-[backdrop-filter]:bg-white/40`;
  
  const goldenShadowStyle = {
    boxShadow: GOLDEN_SHADOW,
  };

  const glassDropdown = isDarkMode
    ? "bg-[#1a1a1a]/85 border border-white/10 text-white"
    : "bg-white/85 border border-white/50 text-gray-800";


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${glassEffect}`}
      style={goldenShadowStyle} // Apply the golden box shadow
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - SIZE INCREASED (w-14 h-14) */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110"> 
              <Image
                src="/travel-logo.png" 
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
            {/* Added a text title */}
            
          </Link>

          {/* Desktop Navigation - GOLDEN HOVER EFFECT ADDED HERE */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group overflow-hidden ${
                  isDarkMode
                    // Dark mode: initial text is gray, hover makes it golden (using text-yellow-500 for a bright gold look) and gives a subtle background.
                    ? "text-gray-300 hover:text-yellow-500 hover:bg-white/10"
                    // Light mode: initial text is dark gray, hover makes it golden (using text-yellow-700 for better contrast) and gives a subtle background.
                    : "text-gray-600 hover:text-yellow-700 hover:bg-gray-100/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-white/10 text-yellow-400 hover:bg-white/20 border border-white/10"
                  : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 border border-gray-200/50"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 overflow-hidden border-[3px] border-white/20 hover:scale-105 transition-transform duration-300"
              >
                <User className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-4 w-64 rounded-2xl shadow-2xl py-2 ring-1 ring-black ring-opacity-5 backdrop-blur-2xl ${glassDropdown}`}
                  >
                    <div className="px-5 py-4 border-b border-gray-100/10 dark:border-gray-800/50">
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        john.doe@example.com
                      </p>
                    </div>

                    <div className="py-2 px-2">
                      {profileLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                            isDarkMode
                              ? "hover:bg-white/10 text-gray-300 hover:text-white"
                              : "hover:bg-purple-50/50 text-gray-600 hover:text-purple-700"
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <item.icon
                            className={`w-4 h-4 ${
                              isDarkMode ? "text-purple-400" : "text-purple-500"
                            }`}
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100/10 dark:border-gray-800/50 pt-2 pb-2 px-2">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-red-500 transition-colors ${
                          isDarkMode ? "hover:bg-red-500/10" : "hover:bg-red-50/50"
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 text-yellow-400"
                  : "bg-gray-100/50 text-gray-600"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                isDarkMode
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100/50"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${glassEffect}`}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation - GOLDEN HOVER EFFECT ADDED HERE */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block text-base font-medium px-4 py-2 rounded-lg ${
                    isDarkMode
                      // Dark mode: initial text is gray, hover makes it golden.
                      ? "text-gray-300 hover:bg-white/10 hover:text-yellow-500"
                      // Light mode: initial text is dark gray, hover makes it golden.
                      : "text-gray-700 hover:bg-gray-50/50 hover:text-yellow-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200/10 dark:border-gray-800/50">
                {profileLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-white/10"
                        : "text-gray-700 hover:bg-gray-50/50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-purple-500" />
                    {item.name}
                  </Link>
                ))}
                <button 
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 w-full text-left rounded-lg rounded-t-none ${
                    isDarkMode ? "hover:bg-red-900/10" : "hover:bg-red-50/50"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;