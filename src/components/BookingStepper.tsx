"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, CreditCard, CheckCircle2 } from "lucide-react";

interface BookingStepperProps {
  currentStep: 1 | 2 | 3;
}

const BookingStepper = ({ currentStep }: BookingStepperProps) => {
  const steps = [
    { id: 1, name: "Flight Info", icon: CheckCircle2 },
    { id: 2, name: "Passenger", icon: User },
    { id: 3, name: "Payment", icon: CreditCard },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 px-4">
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />

        {/* Active Line */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width:
              currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
          }}
          className="absolute top-1/2 left-0 h-[2px] bg-linear-to-r from-brand-blue to-purple-500 -translate-y-1/2 z-0"
        />

        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isActive
                    ? "rgb(147, 51, 234)"
                    : "rgb(243, 244, 246)",
                  borderColor: isActive
                    ? "rgb(147, 51, 234)"
                    : "rgb(229, 231, 235)",
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isActive
                    ? "text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-400 dark:bg-gray-900 dark:border-gray-800"
                }`}
              >
                <step.icon size={20} className="md:w-6 md:h-6" />
              </motion.div>
              <div className="absolute -bottom-7 md:-bottom-8 whitespace-nowrap">
                <span
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
