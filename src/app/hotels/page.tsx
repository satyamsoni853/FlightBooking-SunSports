"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";

// Mock Data for Hotels
const HOTELS = [
  {
    id: 1,
    name: "The Royal Atlantis",
    location: "Dubai, UAE",
    rating: 5,
    reviews: 1240,
    price: "$850",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Pool", "Spa", "Beach Access"],
  },
  {
    id: 2,
    name: "Grand Plaza Hotel",
    location: "New York, USA",
    rating: 4.5,
    reviews: 890,
    price: "$420",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["City View", "Gym", "Bar"],
  },
  {
    id: 3,
    name: "Santorini Cliff Suites",
    location: "Santorini, Greece",
    rating: 5,
    reviews: 2100,
    price: "$1,200",
    image:
      "https://images.unsplash.com/photo-1570213489059-0ecd667eca19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Infinity Pool", "Sunset View", "Breakfast"],
  },
  {
    id: 4,
    name: "Kyoto Ryokan Inn",
    location: "Kyoto, Japan",
    rating: 4.8,
    reviews: 560,
    price: "$350",
    image:
      "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Onsen", "Garden", "Tea Ceremony"],
  },
];

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
      {/* Hero Search Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1571896349842-68c894913dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Hero Hotel"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 w-full max-w-5xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white text-center mb-8 drop-shadow-lg"
          >
            Find Your Perfect Stay
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1a1a1a] p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="flex-1 w-full md:w-auto relative group">
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-blue font-bold text-gray-900 dark:text-white"
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
              />
            </div>

            <div className="flex-1 w-full md:w-auto grid grid-cols-2 gap-4">
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-blue font-bold text-gray-900 dark:text-white"
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkIn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-blue font-bold text-gray-900 dark:text-white"
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkOut: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="w-full md:w-40 relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-blue font-bold text-gray-900 dark:text-white appearance-none cursor-pointer"
                value={searchParams.guests}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, guests: e.target.value })
                }
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4+">4+ Guests</option>
              </select>
            </div>

            <button className="w-full md:w-auto px-8 py-4 bg-brand-blue hover:bg-purple-800 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-purple-500/30">
              Search
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hotel Listings */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Popular Destinations
            </h2>
            <p className="text-gray-500">
              Explore our top-rated stays around the world
            </p>
          </div>
          <button className="text-brand-blue dark:text-purple-400 font-bold hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOTELS.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-[#111] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {hotel.rating}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <MapPin className="w-3 h-3" />
                      {hotel.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 my-4">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      {hotel.price}
                    </span>
                    <span className="text-gray-500 text-xs"> / night</span>
                  </div>
                  <button className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-brand-blue dark:text-purple-400 group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
