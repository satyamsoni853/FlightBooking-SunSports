"use client";
import React from "react";
import { useTheme } from "../app/ThemeContext";

const FlightBookingPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Flight Booking</h1>
        <div
          className={`p-8 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium mb-2"
                >
                  From
                </label>
                <input
                  type="text"
                  id="from"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium mb-2">
                  To
                </label>
                <input
                  type="text"
                  id="to"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                />
              </div>
              <div>
                <label
                  htmlFor="departure"
                  className="block text-sm font-medium mb-2"
                >
                  Departure
                </label>
                <input
                  type="date"
                  id="departure"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                />
              </div>
              <div>
                <label
                  htmlFor="return"
                  className="block text-sm font-medium mb-2"
                >
                  Return
                </label>
                <input
                  type="date"
                  id="return"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                />
              </div>
              <div>
                <label
                  htmlFor="passengers"
                  className="block text-sm font-medium mb-2"
                >
                  Passengers
                </label>
                <input
                  type="number"
                  id="passengers"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                />
              </div>
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium mb-2"
                >
                  Class
                </label>
                <select
                  id="class"
                  className={`w-full p-3 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-200 border-gray-300"
                  } border`}
                >
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;
