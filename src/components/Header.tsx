import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Globe, Check, Calendar, Sun, Moon, Lock } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onBookMeeting: () => void;
  theme?: "light" | "dark" | "default-light";
  toggleTheme?: () => void;
  onAdminClick?: () => void;
}

export default function Header({ language, setLanguage, onBookMeeting, theme = "light", toggleTheme, onAdminClick }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const dict = DICTIONARY[language];

  const navTabs = [
    { id: "hero", labelEn: "Home", labelBn: "হোম" },
    { id: "about", labelEn: "About", labelBn: "আমাদের সম্পর্কে" },
    { id: "services-section", labelEn: "Services", labelBn: "সেবাসমূহ" },
    { id: "portfolio-section", labelEn: "Portfolio", labelBn: "পোর্টফোলিও" },
    { id: "clients-love-section", labelEn: "Reviews", labelBn: "মতামত" },
    { id: "contact-section", labelEn: "Contact", labelBn: "যোগাযোগ" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Detect active navigation section based on scroll offset
      const scrollPosition = window.scrollY + 220;
      for (const tab of navTabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(tab.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (id: string) => {
    setActiveMobileDropdown(activeMobileDropdown === id ? null : id);
  };

  const toggleMobileSub = (id: string) => {
    setActiveMobileSub(activeMobileSub === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* GPU-OPTIMIZED TOP MARQUEE */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-red-600 py-1.5 overflow-hidden relative z-[2100] border-b border-orange-500/10">
        <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]" style={{ willChange: "transform" }}>
          <div className="flex shrink-0">
            <span className="mx-8 md:mx-12 font-extrabold text-[9px] md:text-[10px] tracking-widest uppercase text-white">
              🚀 SCALE YOUR BUSINESS WITH EZY DIGITAL HUB'S STRATEGIC GROWTH PLAN • 🌐 HIGH CONVERTING WEBSITES • 📈 BOOST SALES WITH ADS
            </span>
          </div>
          <div className="flex shrink-0">
            <span className="mx-8 md:mx-12 font-extrabold text-[9px] md:text-[10px] tracking-widest uppercase text-white">
              🚀 SCALE YOUR BUSINESS WITH EZY DIGITAL HUB'S STRATEGIC GROWTH PLAN • 🌐 HIGH CONVERTING WEBSITES • 📈 BOOST SALES WITH ADS
            </span>
          </div>
        </div>
      </div>

      {/* HEADER NAV */}
      <nav
        className={`w-full transition-all duration-300 py-4 ${
          isSticky
            ? "fixed top-0 bg-white/90 dark:bg-[#0a0a0add]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-2xl z-[9999] py-2 animate-[slideDown_0.3s_ease-out]"
            : "relative bg-[#f9fafb] dark:bg-[#0a0a0a] border-b border-gray-200/50 dark:border-white/5 z-[1140]"
        }`}
      >
        <div className="max-w-[1350px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex justify-start cursor-pointer" onClick={() => scrollToSection("hero")}>
              <img
                src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                alt="Ezy Digital Hub Logo"
                className="h-10 md:h-11 w-auto object-contain"
                width={180}
                height={88}
              />
            </div>

            {/* Desktop Navigation Link Menu - Styled exactly like the uploaded image style */}
            <div className="hidden lg:flex items-center">
              <div className="bg-[#e9ecef] dark:bg-[#161616]/75 border border-slate-350 dark:border-white/10 px-1.5 py-1.5 rounded-full flex items-center justify-center shadow-md gap-1 transition-all duration-300">
                {navTabs.map((tab) => {
                  const isActive = activeSection === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`relative px-4 py-2 text-[10px] md:text-[11px] font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer select-none ${
                        isActive
                          ? "bg-orange-600 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]"
                          : "text-slate-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-white"
                      } ${language === "bn" ? "font-siliguri font-bold text-xs tracking-wide" : ""}`}
                    >
                      <span>{language === "en" ? tab.labelEn : tab.labelBn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Language Selector, Theme Switcher & Meeting Trigger */}
            <div className="flex items-center gap-3">
              {/* Admin Access Shield Button */}
              {onAdminClick && (
                <button
                  onClick={onAdminClick}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-205/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all cursor-pointer text-slate-705 dark:text-gray-400"
                  aria-label="Admin Dashboard Access"
                  title="Admin Access Portal Login"
                >
                  <Lock className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                </button>
              )}

              {/* Theme Switcher Button - defaults to Light */}
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all cursor-pointer text-slate-705 dark:text-gray-400"
                  aria-label="Toggle Theme Mode"
                  title="Switch Light/Dark mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              )}

              {/* Desktop Language Switcher */}
              <div className="hidden sm:flex items-center bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full p-1 gap-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-[10px] font-black rounded-full uppercase transition-all flex items-center gap-1 cursor-pointer ${
                    language === "en" ? "bg-orange-600 text-white" : "text-slate-600 dark:text-gray-450 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {language === "en" && <Check className="w-2.5 h-2.5" />}
                  EN
                </button>
                <button
                  onClick={() => setLanguage("bn")}
                  className={`px-3 py-1 text-[10px] font-black rounded-full uppercase transition-all flex items-center gap-1 cursor-pointer ${
                    language === "bn" ? "bg-orange-600 text-white font-siliguri font-bold" : "text-slate-600 dark:text-gray-450 hover:text-slate-900 dark:hover:text-white font-siliguri"
                  }`}
                >
                  {language === "bn" && <Check className="w-2.5 h-2.5" />}
                  বাং
                </button>
              </div>

              {/* Book meeting animated glowing border button */}
              <button
                onClick={onBookMeeting}
                className={`relative overflow-hidden group/meeting bg-orange-600 hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all text-white rounded-full font-black text-[9px] md:text-[10px] tracking-wider uppercase px-5 py-2.5 cursor-pointer flex items-center gap-1.5 select-none ${language === "bn" ? "font-siliguri font-bold text-xs" : ""}`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{dict.meetingBtn}</span>
                {/* Border glowing wrapper */}
                <span className="absolute inset-0 bg-white/10 scale-0 group-hover/meeting:scale-100 rounded-full transition-transform duration-300"></span>
              </button>

              {/* Mobile slide open trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-700 dark:text-white border-2 border-slate-300 dark:border-orange-700/50 hover:border-orange-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SLIDE-IN MENU BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10002] transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU (SLIDE-IN DRAWERS) */}
      <div
        className={`fixed top-0 right-0 w-[85%] max-w-[325px] h-screen bg-[#0a0a0a] z-[10003] transition-transform duration-300 ease-out p-6 overflow-y-auto border-l border-white/10 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${language === "bn" ? "font-siliguri font-bold" : ""}`}
      >
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <img
            src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 bg-white/5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Language Switcher */}
        <div className="flex items-center justify-between mb-8 bg-white/5 p-2 rounded-xl border border-white/5">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 pl-1.5">
            <Globe className="w-3.5 h-3.5 text-orange-500" />
            Locale Language
          </span>
          <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 text-[9px] font-black rounded ${
                language === "en" ? "bg-orange-600 text-white" : "text-gray-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("bn")}
              className={`px-3 py-1 text-[9px] font-black rounded ${
                language === "bn" ? "bg-orange-600 text-white" : "text-gray-400"
              }`}
            >
              বাং
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-2">
          
          <button
            onClick={() => scrollToSection("hero")}
            className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white border-b border-white/5 hover:text-orange-500 transition-colors rounded-lg flex items-center justify-between"
          >
            {dict.home}
          </button>

          {/* About Group */}
          <div className="flex flex-col border-b border-white/5">
            <button
              onClick={() => toggleMobileDropdown("about")}
              className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white hover:text-orange-500 transition-colors flex justify-between items-center"
            >
              <span>{dict.about}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileDropdown === "about" ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`flex-col pl-4 gap-1 overflow-hidden transition-all duration-300 ${
                activeMobileDropdown === "about" ? "flex py-2" : "hidden"
              }`}
            >
              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white"
              >
                {dict.ourStory}
              </button>
              <button
                onClick={() => scrollToSection("stats-section")}
                className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white"
              >
                {dict.ourTeam}
              </button>
            </div>
          </div>

          {/* Services Accordion */}
          <div className="flex flex-col border-b border-white/5">
            <button
              onClick={() => toggleMobileDropdown("services")}
              className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white hover:text-orange-500 transition-colors flex justify-between items-center"
            >
              <span>{dict.services}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeMobileDropdown === "services" ? "rotate-180" : ""}`} />
            </button>
            
            <div
              className={`flex-col pl-4 gap-2 overflow-hidden transition-all duration-300 ${
                activeMobileDropdown === "services" ? "flex py-2" : "hidden"
              }`}
            >
              {/* Sub 1 */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleMobileSub("sub-brand")}
                  className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white flex justify-between items-center"
                >
                  <span>{dict.branding}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMobileSub === "sub-brand" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col pl-4 py-1 gap-1.5 ${activeMobileSub === "sub-brand" ? "flex" : "hidden"}`}>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.logoDesign}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.brandingConsultancy}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.businessAlignment}</button>
                </div>
              </div>

              {/* Sub 2 */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleMobileSub("sub-web")}
                  className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white flex justify-between items-center"
                >
                  <span>{dict.webDev}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMobileSub === "sub-web" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col pl-4 py-1 gap-1.5 ${activeMobileSub === "sub-web" ? "flex" : "hidden"}`}>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.webDesignDev}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.landingPage}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.businessPortfolio}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.ecommerce}</button>
                </div>
              </div>

              {/* Sub 3 */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleMobileSub("sub-mark")}
                  className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white flex justify-between items-center"
                >
                  <span>{dict.marketing}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMobileSub === "sub-mark" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col pl-4 py-1 gap-1.5 ${activeMobileSub === "sub-mark" ? "flex" : "hidden"}`}>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.fbCamp}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.googleCamp}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.linkedinCamp}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.seoService}</button>
                </div>
              </div>

              {/* Sub 4 */}
              <div className="flex flex-col">
                <button
                  onClick={() => toggleMobileSub("sub-video")}
                  className="w-full text-left py-2 px-3 text-[11px] font-bold text-gray-400 hover:text-white flex justify-between items-center"
                >
                  <span>{dict.aiVideo}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMobileSub === "sub-video" ? "rotate-180" : ""}`} />
                </button>
                <div className={`flex-col pl-4 py-1 gap-1.5 ${activeMobileSub === "sub-video" ? "flex" : "hidden"}`}>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.aiContent}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.aiCorp}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.ytOpt}</button>
                  <button onClick={() => scrollToSection("services-section")} className="text-left text-[10px] text-gray-500 hover:text-orange-500 py-1">{dict.ytSeo}</button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("portfolio-section")}
            className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white border-b border-white/5 hover:text-orange-500 transition-colors rounded-lg flex items-center justify-between"
          >
            {dict.portfolio}
          </button>

          <button
            onClick={() => scrollToSection("clients-love-section")}
            className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white border-b border-white/5 hover:text-orange-500 transition-colors rounded-lg flex items-center justify-between"
          >
            <span>{dict.clientsLove}</span>
            <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">NEW</span>
          </button>

          <button
            onClick={() => scrollToSection("contact-section")}
            className="w-full text-left py-3 px-4 font-bold uppercase text-[12px] tracking-wider text-white border-b border-white/5 hover:text-orange-500 transition-colors rounded-lg flex items-center justify-between"
          >
            {dict.contact}
          </button>
        </div>

        {/* Dynamic CTA at inside bottom bar code */}
        <div className="mt-12 bg-white/5 p-4 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-2">Need Strategic Scaling?</p>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookMeeting();
            }}
            className="w-full py-3 bg-orange-600/20 hover:bg-orange-600 border border-orange-500/50 text-orange-400 hover:text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            {dict.meetingBtn}
          </button>
        </div>
      </div>
    </>
  );
}
