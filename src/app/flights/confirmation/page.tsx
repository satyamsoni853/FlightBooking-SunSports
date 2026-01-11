"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Home, Ticket, Download, Mail } from "lucide-react";
import Link from "next/link";

const ConfirmationPage = () => {
  const [refId, setRefId] = useState("");

  useEffect(() => {
    setRefId(Math.random().toString(36).substr(2, 6).toUpperCase());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 pb-20 px-4 transition-colors duration-500 relative overflow-hidden flex items-center justify-center">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white shadow-2xl shadow-green-500/40"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Check size={48} strokeWidth={4} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/20 dark:border-white/10"
        >
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold mb-8">
            Your flight is confirmed. We&apos;ve sent the e-ticket to your
            email.
          </p>

          {/* Booking Info Card */}
          <div className="bg-gray-50 dark:bg-black/40 rounded-3xl p-6 mb-10 border border-dashed border-gray-200 dark:border-gray-800 text-left">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">
                  Booking Reference
                </p>
                <p className="text-xl font-black text-brand-blue dark:text-purple-400 tracking-widest">
                  {refId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">
                  Status
                </p>
                <p className="text-xs font-black text-green-500 uppercase tracking-wider">
                  Confirmed
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Flight
                </p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  EK-202
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">
                  Passenger
                </p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  John Doe
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/profile">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all uppercase text-sm tracking-wider"
              >
                <Ticket size={20} /> View Booking
              </motion.button>
            </Link>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-black rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all uppercase text-sm tracking-wider"
              >
                <Home size={20} /> Back to Home
              </motion.button>
            </Link>
          </div>

          {/* Floating Mini Actions */}
          <div className="flex justify-center gap-6 mt-10">
            <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-widest">
              <Download size={14} /> PDF
            </button>
            <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-brand-blue transition-colors uppercase tracking-widest">
              <Mail size={14} /> Resend
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-gray-400 text-sm font-medium"
        >
          Redirecting you to home in 10 seconds...
        </motion.p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
