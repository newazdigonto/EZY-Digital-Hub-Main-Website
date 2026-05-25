import { MessageSquareCode, Star, Quote } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY, TESTIMONIALS } from "../data";

interface ClientsLoveProps {
  language: Language;
}

export default function ClientsLove({ language }: ClientsLoveProps) {
  const dict = DICTIONARY[language];

  return (
    <section id="clients-love-section" className="py-20 lg:py-28 bg-[#0d0d0d] text-white px-4 md:px-6 relative">
      {/* Background visual light circle */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff8c00]/5 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/15 to-orange-500/5 border border-orange-500/10 px-4 py-1 rounded-full text-[#ff8c00] text-[10px] font-black uppercase tracking-widest select-none">
            <MessageSquareCode className="w-4 h-4" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white ${language === "bn" ? "font-siliguri leading-tight" : ""}`}>
            {dict.clientsLoveTitle}
          </h2>
          <p className={`text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
            {dict.clientsLoveSub}
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="rounded-3xl p-6 md:p-8 hover:border-[#ff8c00]/35 transition-all duration-300 flex flex-col justify-between relative group glow-box"
            >
              {/* Elegant quote design mark overlay background */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/[0.02] group-hover:text-orange-500/[0.04] transition-colors pointer-events-none" />

              <div className="space-y-6">
                {/* Visual Stars */}
                <div className="flex space-x-1">
                  {[...Array(test.rating)].map((_, sidx) => (
                    <Star key={sidx} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                {/* Content */}
                <p className={`text-sm sm:text-base text-gray-300 italic leading-relaxed ${language === "bn" ? "font-siliguri text-sm sm:text-base leading-relaxed" : ""}`}>
                  "{language === "en" ? test.contentEn : test.contentBn}"
                </p>
              </div>

              {/* Author Metadata */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center space-x-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-white/10"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-black text-white">{test.name}</h4>
                  <div className={`text-[10px] text-gray-500 font-bold uppercase ${language === "bn" ? "font-siliguri" : ""}`}>
                    {language === "en" ? test.roleEn : test.roleBn} @{" "}
                    <span className="text-gray-400">{test.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Google Reviews badge score */}
        <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-2xl p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 glow-box">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-black text-white font-mono">4.9/5</div>
            <div>
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest text-gray-500 block mt-1 ${language === "bn" ? "font-siliguri font-semibold" : ""}`}>
                Average rating across our Bangladeshi & international corporate portfolios
              </span>
            </div>
          </div>
          <span className="bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-500/25 select-none shrink-0">
            100% VERIFIED CLIENTS
          </span>
        </div>

      </div>
    </section>
  );
}
