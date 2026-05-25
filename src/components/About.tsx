import { useState, useEffect } from "react";
import { Palette, Layout, TrendingUp, Video, Award, HeartHandshake, Eye, Briefcase } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const dict = DICTIONARY[language];
  
  const [customAbout, setCustomAbout] = useState<any>(null);
  useEffect(() => {
    const saved = localStorage.getItem("ezydigital_edited_about");
    if (saved) {
      setCustomAbout(JSON.parse(saved));
    }
  }, []);

  const stats = [
    {
      id: "s1",
      number: "520+",
      labelEn: "Projects Completed",
      labelBn: "সমাপ্ত প্রজেক্ট",
      descEn: "Successful web architectures & campaign rollouts",
      descBn: "সফল প্রজেক্ট রিলিজ ও ক্যাম্পেইন রান",
      icon: Briefcase
    },
    {
      id: "s2",
      number: "95%",
      labelEn: "Client Retention",
      labelBn: "ক্লায়েন্ট রিটেনশন",
      descEn: "Long-term partnerships build on trusted delivery",
      descBn: "বিশ্বস্ত কাজের মাধ্যমে দীর্ঘমেয়াদী অংশীদারিত্ব",
      icon: HeartHandshake
    },
    {
      id: "s3",
      number: "5+",
      labelEn: "Years of Experience",
      labelBn: "অভিজ্ঞতার বছর",
      descEn: "Continuous innovation in the elite tech landscape",
      descBn: "প্রযুক্তি অঙ্গনে আমাদের অনবদ্য পথচলা",
      icon: Award
    }
  ];

  const coreServicesArray = [
    {
      titleEn: "Logo & Branding",
      titleBn: "লোগো এবং ব্র্যান্ডিং",
      icon: Palette,
      color: "from-orange-500/20 to-transparent",
      iconColor: "text-orange-500"
    },
    {
      titleEn: "Web Development",
      titleBn: "ওয়েব ডেভেলপমেন্ট",
      icon: Layout,
      color: "from-blue-500/20 to-transparent",
      iconColor: "text-blue-500"
    },
    {
      titleEn: "Digital Marketing",
      titleBn: "ডিজিটাল marketing",
      icon: TrendingUp,
      color: "from-green-500/20 to-transparent",
      iconColor: "text-green-500"
    },
    {
      titleEn: "AI Video & Channel-SEO",
      titleBn: "এআই ভিডিও এবং এসইও",
      icon: Video,
      color: "from-purple-500/20 to-transparent",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <>
      <section id="about" className="py-20 lg:py-28 bg-[#0a0a0a] text-white px-4 md:px-6 relative overflow-hidden">
        {/* Subtle grid pattern container overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="max-w-[1240px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content Area Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full select-none">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ${language === "bn" ? "font-siliguri" : ""}`}>
                    {dict.coreConcept}
                  </span>
                </div>
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white ${language === "bn" ? "font-siliguri text-4xl lg:text-5xl" : ""}`}>
                  {dict.elevatingBrands}
                </h2>
                <p className={`text-base sm:text-lg font-bold border-l-4 border-orange-500 pl-4 text-gray-300 ${language === "bn" ? "font-siliguri" : ""}`}>
                  {dict.bdBeyond}
                </p>
              </div>

              <div className={`space-y-6 text-gray-400 text-sm sm:text-base leading-relaxed ${language === "bn" ? "font-siliguri" : ""}`}>
                <p>
                  {customAbout ? (
                    language === "en" ? customAbout.textEn : customAbout.textBn
                  ) : (
                    dict.aboutText
                  )}
                </p>
                <p>
                  {language === "en"
                    ? "Our processes are focused entirely on ROI metrics. Instead of using generic templates from low-quality libraries, we handcraft custom, lightning-fast digital assets formatted to retain absolute viewer engagement and drive direct conversion rates."
                    : "আমাদের প্রতিটি কাজের পরিকল্পনা রিটার্ন অন ইনভেস্টমেন্ট (ROI) কে কেন্দ্র করে আবর্তিত হয়। গতানুগতিক কমদামী টেমপ্লেটের পরিবর্তে আমরা সম্পূর্ণ নিজস্ব কোডে উন্নত মানের পণ্য তৈরি করি যা কাস্টমার রিটেনশন নিশ্চিত করে।"}
                </p>
              </div>

              {/* Grid of core expertise badges */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {coreServicesArray.map((srv, idx) => (
                  <div
                    key={idx}
                    className="service-mini-card flex items-center space-x-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <srv.icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className={`font-extrabold text-xs tracking-wider text-gray-200 uppercase ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
                      {language === "en" ? srv.titleEn : srv.titleBn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Display Area Column (Glow slider layout) */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="w-full relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl bg-[#111] p-2 aspect-[4/3] group max-w-lg lg:max-w-none glow-box">
                <img
                  src="https://ezydigitalhub.com/wp-content/uploads/2026/04/DSC_2802.webp"
                  alt="Ezy Team workspace consulting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl filter brightness-90 group-hover:scale-102 transition-all duration-700"
                />
                
                {/* Floating overlay indicators for architectural honesty */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-md p-4 rounded-xl border border-white/10 select-none hidden sm:block">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-orange-500 tracking-widest uppercase">Consultancy HQ</span>
                      <p className="text-white text-xs font-bold font-mono">DHAKA / BARIDHARA DOHS</p>
                    </div>
                    <span className="bg-orange-500 text-black text-[9px] font-black px-2 py-1 rounded">ACTIVE HUB</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION SECTION */}
      <section id="stats-section" className="py-16 bg-[#0e0e0e] border-y border-white/5 relative">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className={`text-xl sm:text-2xl font-black text-white tracking-tight ${language === "bn" ? "font-siliguri" : ""}`}>
              {language === "en" ? "Numbers that Speak Authenticity" : "সত্যিকারের পারফরম্যান্সের পরিসংখ্যান"}
            </h3>
            <p className={`text-xs text-gray-500 font-mono mt-2 uppercase ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
              {dict.statsSub}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((st) => (
              <div
                key={st.id}
                className="rounded-2xl p-6 transition-all text-center relative group glow-box"
              >
                <div className="mx-auto w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-orange-500 group-hover:scale-110 transition-transform">
                  <st.icon className="w-5 h-5" />
                </div>
                <div className="text-4xl font-black tracking-tight text-white mb-2 font-mono">
                  {st.number}
                </div>
                <div className={`text-xs font-black text-orange-500 uppercase tracking-wider mb-1 ${language === "bn" ? "font-siliguri" : ""}`}>
                  {language === "en" ? st.labelEn : st.labelBn}
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${language === "bn" ? "font-siliguri" : ""}`}>
                  {language === "en" ? st.descEn : st.descBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
