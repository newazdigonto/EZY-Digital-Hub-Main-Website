import { Palette, Layout, TrendingUp, Video, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY, SERVICES } from "../data";

interface ServicesProps {
  language: Language;
}

export default function Services({ language }: ServicesProps) {
  const dict = DICTIONARY[language];

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return Palette;
      case "Layout":
        return Layout;
      case "TrendingUp":
        return TrendingUp;
      case "Video":
        return Video;
      default:
        return Layers;
    }
  };

  return (
    <section id="services-section" className="py-20 lg:py-28 bg-[#0d0d0d] text-white px-4 md:px-6 relative">
      {/* Visual background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff8c00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/15 to-orange-500/5 border border-orange-500/10 px-4 py-1 rounded-full text-[#ff8c00] text-[10px] font-black uppercase tracking-widest select-none">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Active Expertises</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white ${language === "bn" ? "font-siliguri leading-tight" : ""}`}>
            {dict.innovativeSols}
          </h2>
          <p className={`text-sm sm:text-base text-gray-400 font-mono uppercase tracking-widest ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
            {dict.exploreGrid}
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((srv) => {
            const IconComponent = getIcon(srv.icon);
            return (
              <div
                key={srv.id}
                className="rounded-3xl p-6 md:p-8 hover:border-[#ff8c00]/45 transition-all duration-300 flex flex-col justify-between group glow-box"
              >
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/5 group-hover:bg-[#ff8c00]/15 border border-white/10 group-hover:border-orange-500/30 rounded-2xl flex items-center justify-center text-white group-hover:text-orange-500 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-black text-white ${language === "bn" ? "font-siliguri" : ""}`}>
                      {language === "en" ? srv.titleEn : srv.titleBn}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-sm text-gray-400 leading-relaxed ${language === "bn" ? "font-siliguri text-sm leading-relaxed" : ""}`}>
                    {language === "en" ? srv.descEn : srv.descBn}
                  </p>

                  <div className="w-full h-[1px] bg-white/10"></div>
                  
                  {/* Detailed Subservices */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                      Core Operations:
                    </span>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {srv.subservices.map((sub, sidx) => (
                        <li key={sidx} className="flex items-center space-x-2 text-xs text-gray-300 font-semibold uppercase hover:text-white transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Performance Badge */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Architecture status</span>
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider select-none">
                    GPU Optimized
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
