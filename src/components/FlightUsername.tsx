"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Mock data lookup (since we don't have a real backend/state manager for this demo)
interface MockFlightData {
  airline: string;
  from: string;
  to: string;
  time: string;
  price: string;
  logoColor: string;
  duration: string;
}

const MOCK_FLIGHTS: Record<string, MockFlightData> = {
  "1": {
    airline: "Emirates",
    from: "JFK",
    to: "DXB",
    time: "10:45 AM - 11:15 PM",
    price: "$1,240",
    logoColor: "bg-[#d71921]",
    duration: "12h 30m",
  },
  // ... (rest of mock data relies on inference which fits strict Record)
  "2": {
    airline: "Delta",
    from: "LHR",
    to: "JFK",
    time: "08:20 AM - 10:35 PM",
    price: "$890",
    logoColor: "bg-[#003a70]",
    duration: "14h 15m",
  },
  "3": {
    airline: "Qatar Airways",
    from: "DOH",
    to: "SYD",
    time: "02:15 PM - 06:45 AM",
    price: "$1,560",
    logoColor: "bg-[#5C0632]",
    duration: "16h 30m",
  },
  "4": {
    airline: "Singapore Air",
    from: "SIN",
    to: "NRT",
    time: "09:30 AM - 05:20 PM",
    price: "$920",
    logoColor: "bg-[#F58220]",
    duration: "06h 50m",
  },
  "5": {
    airline: "Lufthansa",
    from: "FRA",
    to: "LHR",
    time: "01:00 PM - 03:30 PM",
    price: "$210",
    logoColor: "bg-[#05164d]",
    duration: "01h 30m",
  },
};

const FlightUsername = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId") || "1";
  const flight = MOCK_FLIGHTS[flightId as string] || MOCK_FLIGHTS["1"];

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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors bg-white/50 dark:bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Results
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Col: Flight Summary (Sticky) */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 dark:border-white/10 sticky top-24"
            >
              <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">
                Flight Details
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${flight.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md`}
                  >
                    {flight.airline.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {flight.airline}
                    </div>
                    <div className="text-xs text-gray-500">Economy Class</div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 relative">
                  {/* Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 dark:bg-gray-800"></div>

                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-purple-500 mt-1"></div>
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">
                        {flight.from}
                      </div>
                      <div className="text-xs text-gray-500">Departure</div>
                    </div>
                  </div>

                  <div className="pl-8 py-2 text-xs text-gray-400 font-mono">
                    {flight.duration}
                  </div>

                  <div className="flex gap-4 items-start relative z-10">
                    <div className="w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-blue-500 mt-1"></div>
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">
                        {flight.to}
                      </div>
                      <div className="text-xs text-gray-500">Arrival</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-500">Total Price</div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      {flight.price}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Col: Passenger Form */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 dark:border-white/10"
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2B2B6A] to-purple-600 dark:from-white dark:to-purple-300 mb-8">
                Passenger Details
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/flights/payment");
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="e.g. John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="e.g. Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Passport Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="A12345678"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-[#2B2B6A] text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Confirm Booking
                  </motion.button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By clicking Confirm Booking, you agree to our Terms of Use
                    and Privacy Policy.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightUsername;
