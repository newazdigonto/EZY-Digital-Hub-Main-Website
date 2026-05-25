import { useState } from "react";
import { FolderGit, Check, TrendingUp } from "lucide-react";
import { Language, PortfolioItem } from "../types";
import { DICTIONARY, PORTFOLIO } from "../data";

interface PortfolioProps {
  language: Language;
}

export default function Portfolio({ language }: PortfolioProps) {
  const dict = DICTIONARY[language];
  const [selectedFilter, setSelectedFilter] = useState<"all" | "web" | "branding" | "marketing" | "video">("all");

  const filterTabs = [
    { id: "all", labelEn: "All Projects", labelBn: "সব প্রজেক্ট" },
    { id: "web", labelEn: "Web Architecture", labelBn: "ওয়েব আর্কিটেকচার" },
    { id: "branding", labelEn: "Brand Identity", labelBn: "ব্র্যান্ড আইডেন্টিটি" },
    { id: "marketing", labelEn: "Performance Ads", labelBn: "পারফরম্যান্স অ্যাডস" },
    { id: "video", labelEn: "AI Video & SEO", labelBn: "এআই ভিডিও ও এসইও" }
  ];

  const filteredItems = PORTFOLIO.filter(
    (item) => selectedFilter === "all" || item.category === selectedFilter
  );

  return (
    <section id="portfolio-section" className="py-20 lg:py-28 bg-[#0a0a0a] text-white px-4 md:px-6 relative">
      {/* Background radial soft gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#ff8c00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1350px] mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/15 to-orange-500/5 border border-orange-500/10 px-4 py-1 rounded-full text-[#ff8c00] text-[10px] font-black uppercase tracking-widest select-none">
            <FolderGit className="w-4 h-4" />
            <span>Success Case Stories</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white ${language === "bn" ? "font-siliguri leading-tight" : ""}`}>
            {dict.portfolioTitle}
          </h2>
          <p className={`text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
            {dict.portfolioDesc}
          </p>
        </div>

        {/* Categories Filtre Selector Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 sm:mb-16">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-5 py-3 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all duration-300 select-none cursor-pointer border ${
                selectedFilter === tab.id
                  ? "bg-orange-600 text-white border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  : "bg-white/5 text-gray-300 border-white/5 hover:border-orange-500/30 hover:text-white"
              } ${language === "bn" ? "font-siliguri font-black" : ""}`}
            >
              {language === "en" ? tab.labelEn : tab.labelBn}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between glow-box"
            >
              {/* Media Thumb with Hover Zoom */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-black/40">
                <img
                  src={item.image}
                  alt={item.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Visual Rating/Stat floating banner */}
                {item.stats && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-black text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xl">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.stats}</span>
                  </div>
                )}

                {/* Subcategory Pill */}
                <span className={`absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10 ${language === "bn" ? "font-siliguri" : ""}`}>
                  {language === "en" ? item.categoryLabelEn : item.categoryLabelBn}
                </span>
              </div>

              {/* Text Description Content */}
              <div className="p-6 space-y-4">
                <h4 className={`text-base sm:text-lg font-extrabold text-white leading-tight ${language === "bn" ? "font-siliguri" : ""}`}>
                  {language === "en" ? item.titleEn : item.titleBn}
                </h4>
                
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-2 border-t border-white/5">
                  <span>Audited delivery</span>
                  <span className="text-orange-500 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Checked
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
