"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/app/ThemeContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "manager" | "agent" | "user">(
    "agent"
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, role);
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-500 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-linear-to-tr from-brand-blue to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
          >
            S
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 ml-1">
              Login As
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["admin", "manager", "agent", "user"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    role === r
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-brand-blue hover:bg-purple-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Forgot your password?{" "}
          <a href="#" className="underline hover:text-purple-500">
            Reset here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
