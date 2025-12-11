"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Gauge, Users, Fuel, ArrowRight } from "lucide-react";

// Mock Data for Cars
const CARS = [
  {
    id: 1,
    name: "Tesla Model 3",
    type: "Electric Sedan",
    location: "Los Angeles, CA",
    price: "$85",
    features: ["Autopilot", "Long Range", "Supercharging"],
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    passengers: 5,
    transmission: "Auto",
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class",
    type: "Luxury Sedan",
    location: "Miami, FL",
    price: "$120",
    features: ["Leather Seats", "Sunroof", "Premium Sound"],
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    passengers: 5,
    transmission: "Auto",
  },
  {
    id: 3,
    name: "Range Rover Sport",
    type: "Luxury SUV",
    location: "London, UK",
    price: "$180",
    features: ["4WD", "Panoramic Roof", "Heated Seats"],
    image:
      "https://images.unsplash.com/photo-1606169996660-8f921d7b386e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    passengers: 7,
    transmission: "Auto",
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    type: "Sports Car",
    location: "Monaco",
    price: "$350",
    features: ["Convertible", "Sport Mode", "Turbo"],
    image:
      "https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    passengers: 2,
    transmission: "Auto",
  },
];

export default function CarsPage() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    pickUpDate: "",
    dropOffDate: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500">
      {/* Hero Search Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Hero Car"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 w-full max-w-5xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white text-center mb-8 drop-shadow-lg"
          >
            Drive Your Dream
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1a1a1a] p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="flex-1 w-full md:w-auto relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Pick-up Location"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-500 font-bold text-gray-900 dark:text-white"
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
              />
            </div>

            <div className="flex-1 w-full md:w-auto grid grid-cols-2 gap-4">
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-500 font-bold text-gray-900 dark:text-white"
                  value={searchParams.pickUpDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      pickUpDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-500 font-bold text-gray-900 dark:text-white"
                  value={searchParams.dropOffDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      dropOffDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-purple-500/30">
              Search
            </button>
          </motion.div>
        </div>
      </div>

      {/* Car Listings */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Vehicles
            </h2>
            <p className="text-gray-500">Select from our premium fleet</p>
          </div>
          <button className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARS.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-[#111] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  {car.type}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <MapPin className="w-3 h-3" />
                      {car.location}
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 my-4 border-y border-gray-100 dark:border-gray-800 py-4">
                  <div className="flex flex-col items-center justify-center text-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {car.passengers} Seats
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1 border-x border-gray-100 dark:border-gray-800">
                    <Gauge className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {car.transmission}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center gap-1">
                    <Fuel className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Petrol
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      {car.price}
                    </span>
                    <span className="text-gray-500 text-xs"> / day</span>
                  </div>
                  <button className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
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
