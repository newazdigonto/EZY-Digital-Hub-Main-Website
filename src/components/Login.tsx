import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, Home, ShieldCheck, AlertCircle } from "lucide-react";
import { Language } from "../types";

interface LoginProps {
  language: Language;
  onBackToHome: () => void;
  onLoginSuccess: (username: string, isSuperAdmin: boolean, userPermissions: any) => void;
}

export default function Login({ language, onBackToHome, onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg(language === "en" ? "Fields cannot be blank!" : "ঘরগুলো খালি রাখা যাবে না!");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsSubmitting(false);
      const isSuper =
        username === "@#Superadmin@#" ||
        username.toLowerCase() === "superadmin" ||
        password === "@#Superadmin@#";

      if (isSuper && password === "@#Superadmin@#") {
        // Logged in as Super Admin
        const superPermissions = {
          hero: true,
          about: true,
          services: true,
          portfolio: true,
          reviews: true,
          contact: true,
          users: true,
        };
        onLoginSuccess(username, true, superPermissions);
      } else {
        // Check local storage for other users
        const storedUsersRaw = localStorage.getItem("ezydigital_users");
        const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        const matchedUser = users.find(
          (u: any) =>
            u.username.toLowerCase() === username.toLowerCase() &&
            u.password === password
        );

        if (matchedUser) {
          onLoginSuccess(matchedUser.username, false, matchedUser.permissions);
        } else {
          setErrorMsg(
            language === "en"
              ? "Invalid Username or Password!"
              : "ভুল ইউজারনেম বা পাসওয়ার্ড!"
          );
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#061329] text-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Back navigation in top left corner with white text */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-30 inline-flex items-center gap-2 text-xs font-black uppercase text-white hover:text-orange-400 font-sans tracking-widest cursor-pointer select-none transition-all bg-white/10 hover:bg-white/15 border border-white/10 py-2.5 px-4 rounded-xl"
      >
        <Home className="w-4 h-4 text-white" />
        <span className="text-white">{language === "en" ? "Back to Home Page" : "মূল পাতায় ফিরুন"}</span>
      </button>

      {/* Decorative Brand Circles background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Brand Emblem */}
        <div className="text-center">
          <div className="flex justify-center mb-4 mt-8 sm:mt-0">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700/80 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(247,147,30,0.3)]">
              <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          
          <img
            src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
            alt="Ezy Digital Hub Logo"
            className="h-10 mx-auto w-auto object-contain mb-2"
          />
          <p className="text-[10px] uppercase font-black tracking-widest text-[#F7931E]">
            {language === "en" ? "Secure Administration System" : "সুরক্ষিত প্রশাসন সিস্টেম"}
          </p>
        </div>

        {/* Card wrapper */}
        <div className="bg-[#0D2559]/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-3xl relative overflow-hidden glow-box">
          <h2 className={`text-xl sm:text-2xl font-black text-white text-center mb-6 tracking-tight ${language === "bn" ? "font-siliguri" : ""}`}>
            {language === "en" ? "Admin Access Portal" : "অ্যাডমিন পোর্টাল লগইন"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                {language === "en" ? "Username or Admin Token" : "ইউজারনেম বা অ্যাডমিন টোকেন"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={language === "en" ? "Enter username" : "ইউজারনেম লিখুন"}
                  className="w-full h-12 bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all font-sans"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                {language === "en" ? "Secret Password Key" : "গোপন পাসওয়ার্ড চাবি"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 bg-black/60 border border-white/10 rounded-xl pl-11 pr-12 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all font-sans"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-white transition-colors cursor-pointer select-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button with dark orange gradient theme */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-500 hover:shadow-[0_0_20px_rgba(247,147,30,0.35)] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer select-none"
            >
              {isSubmitting ? (
                <span>{language === "en" ? "AUTHENTICATING..." : "অনুমোদন যাচাই করা হচ্ছে..."}</span>
              ) : (
                <span>{language === "en" ? "Secure Login" : "নিরাপদ লগইন"}</span>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
