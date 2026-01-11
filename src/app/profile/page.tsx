"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  CreditCard,
  Ticket,
  Heart,
  Bell,
  Shield,
  LogOut,
  Camera,
  Edit2,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "bookings", label: "Bookings", icon: Ticket },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const bookings = [
    {
      id: "B123",
      destination: "London to Tokyo",
      status: "Upcoming",
      date: "Dec 20, 2025",
      price: "$1,240",
    },
    {
      id: "B120",
      destination: "Paris to New York",
      status: "Completed",
      date: "Oct 15, 2024",
      price: "$890",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-28 pb-20 px-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/4 space-y-6"
        >
          <div className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 dark:border-white/10 text-center relative overflow-hidden group">
            {/* Profile Header Background */}
            <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-brand-blue to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity" />

            <div className="relative pt-4">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-brand-blue to-purple-800 flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                  {user?.name?.[0].toUpperCase() || "U"}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:text-purple-500 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-sm text-gray-500 font-bold mb-4">
                {user?.role?.toUpperCase() || "Traveler"}
              </p>
            </div>

            <nav className="flex flex-col gap-2 mt-8 text-left">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-4"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 min-h-[600px]"
        >
          <div className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/20 dark:border-white/10 h-full">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 uppercase">
                        Account Overview
                      </h1>
                      <p className="text-gray-500 font-medium">
                        Manage your personal information and security.
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl">
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 group hover:border-purple-500/50 transition-colors">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                        Contact Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-brand-blue dark:text-blue-400">
                            <Mail size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-gray-400">
                              Email Address
                            </p>
                            <p className="font-bold">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600">
                            <Phone size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-gray-400">
                              Phone Number
                            </p>
                            <p className="font-bold">+1 (555) 000-0000</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                          <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-500/10 text-pink-600">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-gray-400">
                              Location
                            </p>
                            <p className="font-bold">New York, USA</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-linear-to-br from-brand-blue to-blue-600 text-white shadow-lg shadow-blue-500/20">
                        <Ticket size={24} className="mb-4" />
                        <p className="text-4xl font-black">2</p>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                          Active Bookings
                        </p>
                      </div>
                      <div className="p-6 rounded-3xl bg-linear-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20">
                        <Heart size={24} className="mb-4" />
                        <p className="text-4xl font-black">12</p>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                          Wishlist Items
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
                    Recent Bookings
                  </h2>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-brand-blue dark:text-purple-400 font-black">
                            {booking.id}
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 dark:text-white uppercase text-sm tracking-widest">
                              {booking.destination}
                            </h4>
                            <p className="text-xs text-gray-500 font-bold">
                              {booking.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              booking.status === "Upcoming"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                          <p className="font-black text-lg text-gray-900 dark:text-white">
                            {booking.price}
                          </p>
                          <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
                    System Settings
                  </h2>
                  <div className="grid gap-6">
                    {[
                      {
                        icon: Bell,
                        title: "Notifications",
                        desc: "Manage your alerts and marketing emails",
                      },
                      {
                        icon: Shield,
                        title: "Security",
                        desc: "Password, 2FA, and account access",
                      },
                      {
                        icon: CreditCard,
                        title: "Billing",
                        desc: "Saved cards and payment history",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm text-gray-400 group-hover:text-brand-blue dark:group-hover:text-purple-400 transition-colors">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 font-bold">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-300" size={20} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
