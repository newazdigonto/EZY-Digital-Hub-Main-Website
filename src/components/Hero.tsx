import { useState, useEffect } from "react";
import { Users, ArrowRight } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface HeroProps {
  language: Language;
  onExploreWorks: () => void;
  onOurServices: () => void;
}

export default function Hero({ language, onExploreWorks, onOurServices }: HeroProps) {
  const dict = DICTIONARY[language];
  
  const [customHero, setCustomHero] = useState<any>(null);
  useEffect(() => {
    const saved = localStorage.getItem("ezydigital_edited_hero");
    if (saved) {
      setCustomHero(JSON.parse(saved));
    }
  }, []);

  // Exactly the image URLs specified in the user request
  const sliderImages = [
    {
      src: "https://ezydigitalhub.com/wp-content/uploads/2026/04/DSC_2784.webp",
      alt: "Active workspace workspace",
    },
    {
      src: "https://ezydigitalhub.com/wp-content/uploads/2026/04/DSC_2802.webp",
      alt: "Workplace branding review",
    },
    {
      src: "https://ezydigitalhub.com/wp-content/uploads/2026/04/Branding-logo-post.webp",
      alt: "Elegant branding conceptual guidelines",
    },
    {
      src: "https://ezydigitalhub.com/wp-content/uploads/2026/04/Business-growth.webp",
      alt: "Strategic business scaling metrics",
    },
    {
      src: "https://ezydigitalhub.com/wp-content/uploads/2026/04/Website.webp",
      alt: "Responsive UI/UX responsive design mockup",
    }
  ];

  return (
    <section id="hero" className="w-full relative min-h-[85vh] lg:min-h-screen bg-[#0a0a0a] text-white overflow-hidden py-16 lg:py-24 flex items-center">
      {/* Dynamic ambient blur graphics */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/3 h-64 bg-orange-500/10 blur-[130px] z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/4 h-64 bg-orange-500/5 blur-[110px] z-0 pointer-events-none"></div>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content Left Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1 rounded-full select-none">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className={`text-[10px] font-bold tracking-widest uppercase text-orange-500 ${language === "bn" ? "font-siliguri" : ""}`}>
                Digital Excellence Redefined
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white ${language === "bn" ? "font-siliguri leading-tight text-4xl sm:text-6xl" : ""}`}>
              {customHero ? (
                language === "en" ? customHero.titleEn : customHero.titleBn
              ) : (
                language === "en" ? (
                  <>
                    Empowering Your <br className="hidden sm:block" />
                    <span className="ez-gradient-text font-black">
                      Digital Presence
                    </span>
                  </>
                ) : (
                  <>
                    আপনার <span className="ez-gradient-text font-black">ডিজিটাল উপস্থিতি</span> শক্তিশালী করা
                  </>
                )
              )}
            </h1>

            <p className={`text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed ${language === "bn" ? "font-siliguri text-base sm:text-lg" : ""}`}>
              {customHero ? (
                language === "en" ? customHero.descEn : customHero.descBn
              ) : (
                dict.heroDesc
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreWorks}
                className="bg-orange-600 hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] text-white font-extrabold px-8 py-3.5 rounded-xl flex items-center group transition-all duration-300 text-xs sm:text-sm cursor-pointer select-none"
              >
                <span className={language === "bn" ? "font-siliguri font-black" : ""}>{dict.exploreWorks}</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onOurServices}
                className="border border-white/20 hover:border-orange-500 hover:bg-white/5 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 text-xs sm:text-sm cursor-pointer select-none"
              >
                <span className={language === "bn" ? "font-siliguri font-black" : ""}>{dict.ourServices}</span>
              </button>
            </div>
          </div>

          {/* Hero Slider Right Column */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2">
            
            {/* Happy clients card badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#161616]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl z-20 select-none glow-box">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-none">98%</div>
                  <div className={`text-[9px] text-gray-400 font-extrabold uppercase tracking-widest font-sans mt-0.5 ${language === "bn" ? "font-siliguri" : ""}`}>
                    {dict.happyClients}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider window frame */}
            <div className="w-full max-w-[420px] aspect-square overflow-hidden rounded-[24px] border border-white/10 shadow-3xl relative bg-black/60 z-10 glow-box">
              <div className="flex w-[500%] h-full animate-[marqueeSlider_22s_infinite_cubic-bezier(0.7,0,0.3,1)]" style={{ willChange: "transform" }}>
                {sliderImages.map((image, i) => (
                  <div key={i} className="w-[20%] h-full shrink-0 relative group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">
                          Ezy Live Works
                        </span>
                        <p className="text-white font-bold text-xs max-w-sm sm:max-w-md">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background design elements */}
          </div>

        </div>
      </div>
    </section>
  );
}
