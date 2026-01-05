"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Plane,
  ArrowRight,
  Filter,
  Star,
  Clock,
  DollarSign,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  ChevronDown,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// Reusing the same mock data for demo purposes
const ALL_FLIGHTS = [
  {
    id: 1,
    airline: "Emirates",
    logoText: "EK",
    logoColor: "bg-[#d71921]", // Official-ish red
    timeStart: "10:45 AM",
    timeEnd: "11:15 PM",
    placeStart: "JFK",
    placeEnd: "DXB",
    duration: "12h 30m",
    stops: "Non-stop",
    price: "$1,240",
    rating: 4.9,
  },
  {
    id: 2,
    airline: "Delta",
    logoText: "DL",
    logoColor: "bg-[#003a70]", // Delta Blue
    timeStart: "08:20 AM",
    timeEnd: "10:35 PM",
    placeStart: "LHR",
    placeEnd: "JFK",
    duration: "14h 15m",
    stops: "1 Stop",
    price: "$890",
    rating: 4.7,
  },
  {
    id: 3,
    airline: "Qatar Airways",
    logoText: "QR",
    logoColor: "bg-[#5C0632]", // Qatar Maroon
    timeStart: "02:15 PM",
    timeEnd: "06:45 AM",
    placeStart: "DOH",
    placeEnd: "SYD",
    duration: "16h 30m",
    stops: "Non-stop",
    price: "$1,560",
    rating: 5.0,
  },
  {
    id: 4,
    airline: "Singapore Air",
    logoText: "SQ",
    logoColor: "bg-[#F58220]", // Singapore Gold/Orange
    timeStart: "09:30 AM",
    timeEnd: "05:20 PM",
    placeStart: "SIN",
    placeEnd: "NRT",
    duration: "06h 50m",
    stops: "Non-stop",
    price: "$920",
    rating: 4.8,
  },
  {
    id: 5,
    airline: "Lufthansa",
    logoText: "LH",
    logoColor: "bg-[#05164d]", // Lufthansa Blue
    timeStart: "01:00 PM",
    timeEnd: "03:30 PM",
    placeStart: "FRA",
    placeEnd: "LHR",
    duration: "01h 30m",
    stops: "Non-stop",
    price: "$210",
    rating: 4.5,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "Anywhere";
  const to = searchParams.get("to") || "Anywhere";
  const cabinClass = searchParams.get("cabinClass") || "Economy";
  const travelers =
    (Number(searchParams.get("adults")) || 1) +
    (Number(searchParams.get("children")) || 0);

  // Filter State
  const [maxPrice, setMaxPrice] = React.useState(2000);
  const [selectedTimes, setSelectedTimes] = React.useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState("Price: Low to High");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = React.useState(false);

  // Filter Logic
  const filteredFlights = React.useMemo(() => {
    return ALL_FLIGHTS.filter((flight) => {
      // Price Filter
      const priceVal = parseInt(flight.price.replace(/[$,]/g, ""));
      if (priceVal > maxPrice) return false;

      // Time Filter
      if (selectedTimes.length > 0) {
        const timeParts = flight.timeStart.match(/(\d+):(\d+) (AM|PM)/);
        if (timeParts) {
          let hours = parseInt(timeParts[1]);
          const ampm = timeParts[3];
          if (ampm === "PM" && hours !== 12) hours += 12;
          if (ampm === "AM" && hours === 12) hours = 0;

          const isMorning = hours >= 5 && hours < 12;
          const isAfternoon = hours >= 12 && hours < 17;
          const isEvening = hours >= 17 && hours < 21;
          const isNight = hours >= 21 || hours < 5;

          const match =
            (selectedTimes.includes("Morning") && isMorning) ||
            (selectedTimes.includes("Afternoon") && isAfternoon) ||
            (selectedTimes.includes("Evening") && isEvening) ||
            (selectedTimes.includes("Night") && isNight);
          if (!match) return false;
        }
      }
      return true;
    });
  }, [maxPrice, selectedTimes]);

  const flights = filteredFlights;

  // Mock Date Strip Data
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
      price: `$${800 + i * 50}`,
      isActive: i === 0,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] pt-32 px-4 pb-20 transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic Animated Background */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Search Header */}
        <div className="mb-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 shadow-sm"
          >
            <Plane className="w-4 h-4 text-purple-500" />
            <span>
              Found {flights.length} {cabinClass} Flights • {travelers} Traveler
              {travelers > 1 ? "s" : ""}
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-6 text-2xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight text-center md:text-left"
            >
              <span className="relative">
                {from.split("(")[0]}
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-purple-500/20 rounded-full blur-sm"></span>
              </span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 md:w-12 md:h-12 text-gray-300 dark:text-gray-700 max-md:rotate-90" />
              </motion.div>
              <span className="relative text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">
                {to.split("(")[0]}
              </span>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-3">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400 hidden md:inline">
                Sort By:
              </span>
              <div className="relative z-30">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-white hover:border-purple-500 transition-colors"
                >
                  <span>{sortOption}</span>
                  <ChevronDown className="w-4 h-4 text-purple-500" />
                </button>
                <div className="relative">
                  {isSortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      {[
                        "Price: Low to High",
                        "Price: High to Low",
                        "Duration: Shortest",
                        "Departure time",
                        "Arrival time",
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortOption(opt);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                            sortOption === opt
                              ? "bg-[#2B2B6A] text-white dark:bg-yellow-400 dark:text-black"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-purple-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>
        </div>

        {/* Date Carousel */}
        <div className="mb-8 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {dates.map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center w-24 h-20 rounded-2xl border transition-all ${
                  item.isActive
                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-purple-500/50"
                }`}
              >
                <span className="text-xs font-bold opacity-80">
                  {item.date}
                </span>
                <span
                  className={`text-sm font-black ${
                    item.isActive
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {item.price}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden lg:block w-1/4 h-fit sticky top-32"
          >
            <FilterContent
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
            />
          </motion.div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#111] p-6 overflow-y-auto shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <FilterContent
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedTimes={selectedTimes}
                  setSelectedTimes={setSelectedTimes}
                />
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full mt-8 py-3 bg-purple-600 text-white font-bold rounded-xl"
                >
                  Apply Filters
                </button>
              </motion.div>
            </div>
          )}

          {/* Results List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-5"
          >
            {flights.map((flight) => (
              <FlightResultCard key={flight.id} data={flight} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Extracted Filter Content with Props
interface FilterContentProps {
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  selectedTimes: string[];
  setSelectedTimes: (val: React.SetStateAction<string[]>) => void;
}

const FilterContent = ({
  maxPrice,
  setMaxPrice,
  selectedTimes,
  setSelectedTimes,
}: FilterContentProps) => {
  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 font-bold text-lg text-gray-800 dark:text-white">
          <Filter className="w-5 h-5 text-purple-500" /> Filters
        </div>
        <button
          onClick={() => {
            setMaxPrice(2000);
            setSelectedTimes([]);
          }}
          className="text-xs font-bold text-gray-400 hover:text-purple-500 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Price Range Filter */}
        <div>
          <h4 className="font-bold mb-4 text-sm text-gray-900 dark:text-gray-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" /> Max Price: $
            {maxPrice}
          </h4>
          <input
            type="range"
            min="200"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
            <span>$200</span>
            <span>$2,000</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/10"></div>

        {/* Departure Time Filter */}
        <div>
          <h4 className="font-bold mb-4 text-sm text-gray-900 dark:text-gray-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Departure Time
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Morning", icon: <Sunrise className="w-4 h-4" /> },
              { label: "Afternoon", icon: <Sun className="w-4 h-4" /> },
              { label: "Evening", icon: <Sunset className="w-4 h-4" /> },
              { label: "Night", icon: <Moon className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = selectedTimes.includes(item.label);
              return (
                <button
                  key={item.label}
                  onClick={() => toggleTime(item.label)}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                    isActive
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-purple-500/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/10"></div>

        <div>
          <h4 className="font-bold mb-4 text-sm text-gray-900 dark:text-gray-200">
            Stops
          </h4>
          <div className="space-y-3">
            {["Non-stop", "1 Stop", "2+ Stops"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-md group-hover:border-purple-500 transition-colors">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-full h-full cursor-pointer"
                  />
                  <div className="absolute hidden peer-checked:block w-3 h-3 bg-purple-500 rounded-sm"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/10"></div>

        <div>
          {/* Reusing existing sections but keeping them static for now as requested specific filters */}
          <h4 className="font-bold mb-4 text-sm text-gray-900 dark:text-gray-200">
            Cabin Class
          </h4>
          {/* Same checkbox logic for class */}
          <div className="space-y-3">
            {["Economy", "Premium Economy", "Business", "First Class"].map(
              (opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-md group-hover:border-purple-500 transition-colors">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-full h-full cursor-pointer"
                    />
                    <div className="absolute hidden peer-checked:block w-3 h-3 bg-purple-500 rounded-sm"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {opt}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchFlightData {
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
  rating: number;
}

const FlightResultCard = ({ data }: { data: SearchFlightData }) => {
  const router = useRouter();
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative bg-white dark:bg-[#0f0f0f] rounded-3xl p-1 shadow-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="bg-white/50 dark:bg-[#121212] backdrop-blur-md rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-white/5 relative z-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Left: Airline */}
        <div className="w-full md:w-32 flex flex-row md:flex-col items-center gap-4">
          <div
            className={`w-16 h-16 ${data.logoColor} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-6 transition-transform duration-300`}
          >
            {data.logoText}
          </div>
          <div className="text-left md:text-center">
            <div className="font-bold text-gray-900 dark:text-white leading-tight">
              {data.airline}
            </div>
            <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold mt-1">
              <Star className="w-3 h-3 fill-current" /> {data.rating}
            </div>
          </div>
        </div>

        {/* Center: Flight Path */}
        <div className="flex-1 w-full flex items-center justify-between gap-4">
          <div className="text-center min-w-[80px]">
            <div className="text-3xl font-black text-gray-900 dark:text-white">
              {data.timeStart}
            </div>
            <div className="text-sm font-bold text-gray-400 mt-1">
              {data.placeStart}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {data.duration}
            </div>

            {/* Animated Flight Path Line */}
            <div className="w-full h-[2px] bg-gray-200 dark:bg-gray-800 relative">
              <div className="absolute top-1/2 left-0 right-0 h-full -translate-y-1/2 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"
                />
              </div>
              <div className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full left-0 top-1/2 -translate-y-1/2" />
              <div className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full right-0 top-1/2 -translate-y-1/2" />

              {/* Plane Icon Moving */}
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -translate-y-1/2"
              >
                <Plane className="w-5 h-5 text-purple-500 rotate-90" />
              </motion.div>
            </div>

            <div
              className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                data.stops === "Non-stop"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}
            >
              {data.stops}
            </div>
          </div>

          <div className="text-center min-w-[80px]">
            <div className="text-3xl font-black text-gray-900 dark:text-white">
              {data.timeEnd}
            </div>
            <div className="text-sm font-bold text-gray-400 mt-1">
              {data.placeEnd}
            </div>
          </div>
        </div>

        {/* Right: Price & CTA */}
        <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center gap-4 pl-0 md:pl-8 md:border-l border-gray-100 dark:border-white/10">
          <div className="text-right">
            <div className="text-xs text-gray-400 font-medium mb-1">
              Total Price
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {data.price}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/flights/booking?flightId=${data.id}`)}
            className="w-full md:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm shadow-xl hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
          >
            Select <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResults;
