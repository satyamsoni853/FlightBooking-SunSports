"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  CreditCard,
  Landmark,
  Check,
  Lock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const FlightPayment = () => {
  const [activeTab, setActiveTab] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful! Your booking is confirmed. (Demo)");
      window.location.href = "/";
    }, 2000);
  };

  const tabs = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
    { id: "sepa", label: "SEPA Direct Debit", icon: Landmark },
    { id: "sofort", label: "Sofort / Klarna", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background - Matches SearchResults */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-green-200 dark:border-green-800"
          >
            <Lock className="w-3 h-3" /> Secure SSL Payment
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-gray-900 dark:text-white mb-2"
          >
            Complete Your Payment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500"
          >
            Choose your preferred payment method
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 flex flex-col items-center gap-2 text-xs font-bold transition-all relative ${
                  activeTab === tab.id
                    ? "text-[#2B2B6A] dark:text-white"
                    : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                <tab.icon
                  className={`w-6 h-6 transition-colors ${
                    activeTab === tab.id ? "text-purple-500" : ""
                  }`}
                />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2B2B6A] to-purple-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Form */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400">
                        Card Number
                      </label>
                      <div className="relative group">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-400">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "sepa" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm mb-4 border border-blue-100 dark:border-blue-800">
                      Pay securely via Direct Debit from your bank account
                      anywhere in the Eurozone.
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400">
                        Account Holder
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400">
                        IBAN
                      </label>
                      <div className="relative group">
                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="text"
                          placeholder="DE00 0000 0000 0000 0000 00"
                          className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "sofort" && (
                  <div className="space-y-4 text-center py-8">
                    <ShieldCheck className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      Pay with Sofort / Klarna
                    </h3>
                    <p className="text-gray-500 text-sm">
                      You will be redirected to Sofort to complete your payment
                      securely via your online banking.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 grayscale opacity-60">
              <div className="font-bold text-xs text-gray-400">VISA</div>
              <div className="font-bold text-xs text-gray-400">Mastercard</div>
              <div className="font-bold text-xs text-gray-400">PayPal</div>
              <div className="font-bold text-xs text-gray-400">Stripe</div>
            </div>

            {/* Pay Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePay}
              disabled={loading}
              className="w-full mt-6 py-4 bg-gradient-to-r from-[#2B2B6A] to-purple-800 text-white font-bold rounded-xl shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Pay Securely <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-8">
          By clicking &quot;Pay Securely&quot; you agree to our Terms &
          Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default FlightPayment;
