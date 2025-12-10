"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plane,
  Calendar,
  Search,
  MapPin,
  ArrowRight,
  X,
  Clock,
  Wifi,
  Coffee,
  Tv,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AIRPORTS } from "@/constants/airports";

// --- Data ---
const POPULAR_FLIGHTS = [
  {
    id: 1,
    airline: "Emirates",
    logoText: "EK",
    logoColor: "bg-red-600",
    timeStart: "10:45 AM",
    timeEnd: "11:15 PM",
    placeStart: "JFK",
    placeEnd: "DXB",
    duration: "12h 30m",
    stops: "Non-stop",
    price: "$1,240",
    description:
      "Experience the height of luxury on our flagship A380 service to Dubai. Enjoy award-winning inflight entertainment, gourmet meals prepared by world-class chefs, and our renowned hospitality. Economy Class offers spacious seating with adjustable headrests, while our Business and First Class cabins define premium travel. Includes complimentary chauffeur-drive service for Business and First Class passengers.",
    amenities: [
      "Free Wi-Fi",
      "Gourmet Meals",
      "Live TV",
      "Power Outlets",
      "20kg Baggage",
    ],
    delay: 0.1,
  },
  {
    id: 2,
    airline: "Delta",
    logoText: "DL",
    logoColor: "bg-[#2B2B6A]",
    timeStart: "08:20 AM",
    timeEnd: "10:35 PM",
    placeStart: "LHR",
    placeEnd: "JFK",
    duration: "14h 15m",
    stops: "1 Stop",
    price: "$890",
    description:
      "Fly trans-atlantic in comfort with Delta. Our modernized fleet ensures a smooth journey with state-of-the-art cabin pressure comfort and reduced noise levels. Enjoy a seamless travel experience with Priority Boarding and superior service.",
    amenities: ["Wi-Fi", "Snacks & Meals", "Movies", "USB Power"],
    delay: 0.2,
  },
  {
    id: 3,
    airline: "Qatar",
    logoText: "QR",
    logoColor: "bg-purple-700",
    timeStart: "02:15 PM",
    timeEnd: "06:45 AM",
    placeStart: "DOH",
    placeEnd: "SYD",
    duration: "16h 30m",
    stops: "Non-stop",
    price: "$1,560",
    description:
      "Discover the world's best business class, Qsuite, offering privacy and luxury like never before. Our long-haul service to Sydney is designed for rest and relaxation, featuring mood lighting and our bespoke Oryx One entertainment system with over 4,000 options.",
    amenities: [
      "Super Wi-Fi",
      "A la carte Dining",
      "4K Screens",
      "Privacy Doors",
      "Luxury Kit",
    ],
    delay: 0.3,
  },
];

const FlightsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("one-way");
  const [selectedFlight, setSelectedFlight] = useState<
    (typeof POPULAR_FLIGHTS)[0] | null
  >(null);

  // Search State
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<typeof AIRPORTS>([]);
  const [toSuggestions, setToSuggestions] = useState<typeof AIRPORTS>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Click outside to close suggestions
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInput = (query: string, type: "from" | "to") => {
    if (type === "from") {
      setFromQuery(query);
      if (query.length > 0) {
        const filtered = AIRPORTS.filter(
          (a) =>
            a.city.toLowerCase().includes(query.toLowerCase()) ||
            a.name.toLowerCase().includes(query.toLowerCase()) ||
            a.code.toLowerCase().includes(query.toLowerCase()) ||
            a.country.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6); // Show at least 5 (using 6 here)
        setFromSuggestions(filtered);
        setShowFromSuggestions(true);
      } else {
        setShowFromSuggestions(false);
      }
    } else {
      setToQuery(query);
      if (query.length > 0) {
        const filtered = AIRPORTS.filter(
          (a) =>
            a.city.toLowerCase().includes(query.toLowerCase()) ||
            a.name.toLowerCase().includes(query.toLowerCase()) ||
            a.code.toLowerCase().includes(query.toLowerCase()) ||
            a.country.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);
        setToSuggestions(filtered);
        setShowToSuggestions(true);
      } else {
        setShowToSuggestions(false);
      }
    }
  };

  const handleSelectAirport = (
    airport: (typeof AIRPORTS)[0],
    type: "from" | "to"
  ) => {
    const text = `${airport.city} (${airport.code})`;
    if (type === "from") {
      setFromQuery(text);
      setShowFromSuggestions(false);
    } else {
      setToQuery(text);
      setShowToSuggestions(false);
    }
  };

  const handleSearchSubmit = () => {
    // Navigate to results page with query params
    const params = new URLSearchParams();
    if (fromQuery) params.append("from", fromQuery);
    if (toQuery) params.append("to", toQuery);
    router.push(`/flights/results?${params.toString()}`);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 transition-colors duration-300 relative overflow-hidden">
      {/* Animated Background - Deep Purple/Black Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2B2B6A]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <div className="relative h-[600px] w-full bg-gradient-to-r from-[#2B2B6A] to-purple-900 overflow-hidden rounded-b-[50px] shadow-2xl">
        {/* Animated Particles/Gradient Overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"
        />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="text-center text-white px-4 max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="px-4 py-1.5 rounded-full border border-yellow-400/50 text-yellow-400 text-xs font-bold tracking-widest uppercase bg-black/30 backdrop-blur-sm">
                Premium Travel
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
            >
              Explore the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                World
              </span>{" "}
              Without Limits
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl opacity-90 font-light max-w-2xl mx-auto"
            >
              Experience the future of flight booking. Luxury, speed, and
              comfort delivered to your screen.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Plane Animation */}
        <motion.div
          className="absolute bottom-20 right-[10%] opacity-20 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Plane className="w-64 h-64 text-white" />
        </motion.div>
      </div>

      {/* Glassmorphic Search Widget */}
      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-20">
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 dark:bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 border border-white/20 dark:border-gray-800"
        >
          {/* Tabs */}
          <div className="flex justify-center md:justify-start gap-4 mb-8">
            {["one-way", "round-trip", "multi-city"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "text-black dark:text-black"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#2B2B6A] dark:hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-yellow-400 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* From */}
            <div className="md:col-span-3 space-y-2 relative" ref={fromRef}>
              <label className="text-xs font-bold text-yellow-500 uppercase tracking-wide ml-1">
                From
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2B2B6A] dark:group-focus-within:text-purple-400 transition-colors">
                  <Plane className="w-5 h-5 rotate-[-45deg]" />
                </div>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={fromQuery}
                  onChange={(e) => handleSearchInput(e.target.value, "from")}
                  onFocus={() => fromQuery && setShowFromSuggestions(true)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B2B6A] dark:focus:ring-purple-500 dark:text-white font-medium text-gray-700 placeholder-gray-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                />
              </div>
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto"
                  >
                    {fromSuggestions.map((airport) => (
                      <li
                        key={airport.code}
                        onClick={() => handleSelectAirport(airport, "from")}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center group"
                      >
                        <div>
                          <div className="font-bold text-gray-800 dark:text-white">
                            {airport.city}, {airport.country}
                          </div>
                          <div className="text-xs text-gray-400">
                            {airport.name}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                          {airport.code}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Swap Icon (Visual Only) */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center pb-3">
              <button
                onClick={() => {
                  const temp = fromQuery;
                  setFromQuery(toQuery);
                  setToQuery(temp);
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors transform hover:rotate-180 duration-500"
              >
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* To */}
            <div className="md:col-span-3 space-y-2 relative" ref={toRef}>
              <label className="text-xs font-bold text-yellow-500 uppercase tracking-wide ml-1">
                To
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2B2B6A] dark:group-focus-within:text-purple-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={toQuery}
                  onChange={(e) => handleSearchInput(e.target.value, "to")}
                  onFocus={() => toQuery && setShowToSuggestions(true)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B2B6A] dark:focus:ring-purple-500 dark:text-white font-medium text-gray-700 placeholder-gray-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                />
              </div>
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showToSuggestions && toSuggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto"
                  >
                    {toSuggestions.map((airport) => (
                      <li
                        key={airport.code}
                        onClick={() => handleSelectAirport(airport, "to")}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center group"
                      >
                        <div>
                          <div className="font-bold text-gray-800 dark:text-white">
                            {airport.city}, {airport.country}
                          </div>
                          <div className="text-xs text-gray-400">
                            {airport.name}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                          {airport.code}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Departure */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold text-yellow-500 uppercase tracking-wide ml-1">
                Departure
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2B2B6A] dark:group-focus-within:text-purple-400 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B2B6A] dark:focus:ring-purple-500 dark:text-white font-medium text-gray-700 placeholder-gray-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <motion.button
                onClick={handleSearchSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[56px] bg-[#2B2B6A] hover:bg-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Flights Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="h-10 w-2 bg-yellow-400 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            Popular{" "}
            <span className="text-[#2B2B6A] dark:text-purple-400">Routes</span>
          </h2>
          <Link
            href="/popular-routes"
            className="ml-auto flex items-center gap-2 text-[#2B2B6A] dark:text-purple-400 font-bold hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Animated Flight Cards List */}
        <div className="grid gap-6">
          {POPULAR_FLIGHTS.map((flight) => (
            <FlightCard
              key={flight.id}
              data={flight}
              onClick={() => setSelectedFlight(flight)}
            />
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedFlight && (
          <FlightDetailsModal
            flight={selectedFlight}
            onClose={() => setSelectedFlight(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface FlightData {
  id: number;
  airline: string;
  logoText: string;
  logoColor: string;
  timeStart: string;
  timeEnd: string;
  placeStart: string;
  placeEnd: string;
  duration: string;
  stops: string;
  price: string;
  description: string;
  amenities: string[];
  delay?: number;
}

// Extracted & Animated Flight Card Component
const FlightCard = ({
  data,
  onClick,
}: {
  data: FlightData;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: data.delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.01 }}
      onClick={onClick}
      className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-900/20 border border-gray-100 dark:border-gray-800 transition-all duration-300 relative overflow-hidden cursor-pointer"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
        {/* Airline Info */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3 w-24">
          <div
            className={`w-14 h-14 ${data.logoColor} text-white rounded-2xl flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300`}
          >
            <span className="font-bold text-sm tracking-widest">
              {data.logoText}
            </span>
          </div>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {data.airline}
          </span>
        </div>

        {/* Flight Timeline */}
        <div className="flex-grow grid grid-cols-3 gap-4 w-full items-center">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {data.timeStart}
            </div>
            <div className="text-sm font-bold text-gray-400">
              {data.placeStart}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center px-2">
            <div className="text-xs text-gray-400 mb-2 font-medium">
              {data.duration}
            </div>
            <div className="w-full h-[2px] bg-gray-200 dark:bg-gray-700 relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full left-0"></div>
              <div className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full right-0"></div>
              <Plane className="w-5 h-5 text-[#2B2B6A] dark:text-purple-400 transform rotate-90 absolute" />
            </div>
            <div
              className={`text-xs mt-2 font-bold ${
                data.stops === "Non-stop" ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {data.stops}
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {data.timeEnd}
            </div>
            <div className="text-sm font-bold text-gray-400">
              {data.placeEnd}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex flex-col items-center md:items-end gap-3 min-w-[140px] pl-6 md:border-l border-gray-100 dark:border-gray-800">
          <div className="text-3xl font-extrabold text-yellow-500 dark:text-yellow-400">
            {data.price}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm shadow-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Modal Component ---
const FlightDetailsModal = ({
  flight,
  onClose,
}: {
  flight: FlightData;
  onClose: () => void;
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto border border-gray-200 dark:border-gray-700 relative flex flex-col">
          {/* Header Image / Pattern */}
          <div className="h-32 bg-[#2B2B6A] relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B6A] to-purple-800 opacity-90"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-8 flex items-end gap-4">
              <div
                className={`w-16 h-16 ${flight.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white dark:border-gray-900`}
              >
                {flight.logoText}
              </div>
              <div className="mb-1">
                <h2 className="text-2xl font-bold text-white">
                  {flight.airline}
                </h2>
                <p className="text-purple-200 text-sm font-medium">
                  Flight Details
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Route Info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="text-center md:text-left">
                <span className="text-3xl font-bold text-gray-800 dark:text-white block">
                  {flight.timeStart}
                </span>
                <span className="text-gray-500 font-medium">
                  {flight.placeStart}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  <span>{flight.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-[2px] bg-gray-300 dark:bg-gray-600"></div>
                  <Plane className="w-5 h-5 text-purple-500 rotate-90" />
                  <div className="w-16 h-[2px] bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <span className="text-green-500 text-xs font-bold uppercase mt-1">
                  {flight.stops}
                </span>
              </div>

              <div className="text-center md:text-right">
                <span className="text-3xl font-bold text-gray-800 dark:text-white block">
                  {flight.timeEnd}
                </span>
                <span className="text-gray-500 font-medium">
                  {flight.placeEnd}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
                Flight Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {flight.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Onboard Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {flight.amenities.map((item: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    {item.includes("Wi-Fi") && <Wifi className="w-4 h-4" />}
                    {item.includes("Meal") && <Coffee className="w-4 h-4" />}
                    {item.includes("Movie") || item.includes("TV") ? (
                      <Tv className="w-4 h-4" />
                    ) : null}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 rounded-b-3xl">
            <div>
              <span className="block text-sm text-gray-500">
                Total Price per person
              </span>
              <span className="text-3xl font-extrabold text-[#2B2B6A] dark:text-purple-400">
                {flight.price}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full md:w-auto px-8 py-3 bg-[#2B2B6A] hover:bg-purple-800 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Book This Flight
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FlightsPage;
