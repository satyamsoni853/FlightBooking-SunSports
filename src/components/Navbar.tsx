"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../app/ThemeContext";
import { useAuth } from "@/context/AuthContext";
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
  LogIn,
} from "lucide-react";

// 1. Custom Golden Shadow Utility
const GOLDEN_SHADOW = "inset 0 6px 20px 0 rgba(218, 165, 32, 0.3)";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights/results" },

    { name: "Hotels", href: "/hotels" },
    { name: "Popular Routes", href: "/popular-routes" },
  ];

  const profileLinks = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "My Orders", href: "/orders", icon: ShoppingBag },
    { name: "My Offers", href: "/offers", icon: Tag },
  ];

  // 2. Glass Effect (Now with rounded corners)
  const glassEffect = isDarkMode
    ? "bg-black/60 backdrop-blur-xl border-b border-white/10 supports-[backdrop-filter]:bg-black/40"
    : "bg-white/70 backdrop-blur-xl border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/50";

  const goldenShadowStyle = {
    boxShadow: GOLDEN_SHADOW,
  };

  const glassDropdown = isDarkMode
    ? "bg-[#1a1a1a]/85 border border-white/10 text-white shadow-lg"
    : "bg-white/85 border border-gray-200/50 text-gray-800 shadow-xl";

  return (
    <header className="w-full fixed top-0 z-50 flex justify-center p-2">
      <nav
        // Applied rounded-xl here
        className={`w-full max-w-[1600px] transition-all duration-300 ${glassEffect} rounded-3xl`}
        style={goldenShadowStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo (Removed text title) */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-3 group"
            >
              <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/travel-logo.png"
                  alt="Travel Logo"
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-md"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-yellow-400 hover:bg-white/10"
                      : "text-gray-600 hover:text-yellow-700 hover:bg-gray-100/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-white/10 text-yellow-400 hover:bg-white/20 border border-white/10"
                    : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 border border-gray-200/50"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDarkMode ? "sun" : "moon"}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Profile Dropdown or Login Button */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 overflow-hidden border-[3px] border-white/20 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full bg-white/20"
                    />
                    <span className="text-xs font-bold pr-1">{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-4 w-64 rounded-2xl py-2 backdrop-blur-2xl z-50 ${glassDropdown}`}
                      >
                        <div
                          className={`px-5 py-4 border-b ${
                            isDarkMode
                              ? "border-gray-800/50"
                              : "border-gray-100/10"
                          }`}
                        >
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {user.email}
                          </p>
                          <p className="text-[10px] uppercase font-bold text-purle-500 mt-1 bg-purple-100 dark:bg-purple-900/30 inline-block px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-300">
                            {user.role}
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
                                  isDarkMode
                                    ? "text-purple-400"
                                    : "text-purple-500"
                                }`}
                              />
                              {item.name}
                            </Link>
                          ))}
                        </div>

                        <div
                          className={`border-t pt-2 pb-2 px-2 ${
                            isDarkMode
                              ? "border-gray-800/50"
                              : "border-gray-100/10"
                          }`}
                        >
                          <button
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg text-red-500 transition-colors ${
                              isDarkMode
                                ? "hover:bg-red-500/10"
                                : "hover:bg-red-50/50"
                            }`}
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2B2B6A] hover:bg-purple-800 text-white font-bold text-sm shadow-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Theme Toggle Button (Mobile) */}
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
                className={`p-2 rounded-md transition-colors ${
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
              transition={{ duration: 0.2 }}
              // Applied rounded-b-lg (only bottom corners)
              className={`md:hidden overflow-hidden ${glassEffect} rounded-b-lg`}
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Navigation */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block text-base font-medium px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-white/10 hover:text-yellow-400"
                        : "text-gray-700 hover:bg-gray-50/50 hover:text-yellow-700"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Profile Links */}
                <div className="pt-4 mt-2 border-t border-gray-200/10 dark:border-gray-800/50">
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2 mb-2 flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      {profileLinks.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                            isDarkMode
                              ? "text-gray-300 hover:bg-white/10"
                              : "text-gray-700 hover:bg-gray-50/50"
                          }`}
                          onClick={toggleMobileMenu}
                        >
                          <item.icon className="w-4 h-4 text-purple-500" />
                          {item.name}
                        </Link>
                      ))}
                      <button
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 w-full text-left rounded-lg transition-colors ${
                          isDarkMode
                            ? "hover:bg-red-900/10"
                            : "hover:bg-red-50/50"
                        }`}
                        onClick={() => {
                          logout();
                          toggleMobileMenu();
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={toggleMobileMenu}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#2B2B6A] text-white font-bold rounded-xl"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
