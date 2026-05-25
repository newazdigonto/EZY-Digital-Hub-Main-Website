import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail, MessageSquareCode, ArrowRight } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const dict = DICTIONARY[language];
  const year = new Date().getFullYear();

  const scrollToSection = (id: string) => {
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
    <footer className="bg-black border-t border-white/5 text-gray-400 py-16 px-4 md:px-6 relative select-none">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        
        {/* Column 1: Logo & Brief */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img
              src="https://ezydigitalhub.com/wp-content/uploads/2026/04/3.png"
              alt="Ezy Digital Hub Logo"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // If custom icon fails, display a fallback text style
                e.currentTarget.style.display = "none";
                const sister = e.currentTarget.nextElementSibling as HTMLElement;
                if (sister) sister.style.display = "block";
              }}
            />
            <div className="hidden text-xl font-black text-orange-500 tracking-wider font-sans">
              EZY DIGITAL HUB
            </div>
          </div>
          
          <div className="w-12 h-1 bg-orange-500 rounded-sm"></div>

          <div className="space-y-3">
            <span className={`text-[10px] font-black uppercase tracking-widest text-orange-500 block ${language === "bn" ? "font-siliguri" : ""}`}>
              {dict.empoweringGrowth}
            </span>
            <p className={`text-sm text-gray-300 max-w-sm leading-relaxed ${language === "bn" ? "font-siliguri text-xs leading-relaxed font-semibold" : ""}`}>
              {dict.descriptionText}
            </p>
          </div>

          {/* Social Icons mapped */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook link"
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-orange-500 hover:text-orange-500 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Facebook className="w-5 h-5" />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn link"
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-orange-500 hover:text-orange-500 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram link"
              className="w-10 h-10 bg-white/5 border border-white/10 hover:border-orange-500 hover:text-orange-500 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick links/Expertise index */}
        <div className="md:col-span-3 space-y-6">
          <h3 className={`text-sm font-black text-white uppercase tracking-wider ${language === "bn" ? "font-siliguri font-black" : ""}`}>
            {language === "en" ? "Company Core Expertise" : "বিশেষজ্ঞতা সমূহ"}
          </h3>
          <ul className="space-y-3">
            {[
              "Custom Web Solutions",
              "Search Engine Optimization",
              "Social Media Strategy",
              "UI/UX Design Systems",
              "Enterprise E-commerce"
            ].map((exp, eidx) => (
              <li
                key={eidx}
                className="flex items-center space-x-2 text-xs font-bold text-gray-300 uppercase hover:text-orange-500 transition-colors cursor-pointer"
                onClick={() => scrollToSection("services-section")}
              >
                <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contacts info */}
        <div className="md:col-span-4 space-y-6">
          <h3 className={`text-sm font-black text-white uppercase tracking-wider ${language === "bn" ? "font-siliguri font-black" : ""}`}>
            {language === "en" ? "Strategic Connect" : "যোগাযোগ সংযোগ"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3 items-start text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>Baridhara DOHS, Dhaka, Bangladesh</span>
            </div>

            <a href="tel:+8801935623213" className="flex gap-3 items-start text-xs text-gray-300 hover:text-orange-500 transition-colors block">
              <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span className="font-mono">+880 1935-623213</span>
            </a>

            <a href="mailto:contact@ezydigitalhub.com" className="flex gap-3 items-start text-xs text-gray-300 hover:text-orange-500 transition-colors block">
              <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span className="font-mono">contact@ezydigitalhub.com</span>
            </a>

            {/* WA link element */}
            <div className="pt-2">
              <a
                href="https://wa.me/8801935623213"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-[#25d366]/10 border border-[#25d366]/30 hover:border-[#25d366] text-[#25d366] hover:text-black hover:bg-[#25d366] rounded-lg transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>WHATSAPP CONSULTATION</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright area bar */}
      <div className="max-w-[1240px] mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className={`text-[10px] uppercase font-bold tracking-widest text-gray-500 text-center md:text-left ${language === "bn" ? "font-siliguri font-black" : ""}`}>
          &copy; {year} <span className="text-orange-500 font-extrabold">EZY DIGITAL HUB</span>. {dict.allRightsReserved}
        </div>
        
        <div className="flex gap-6 text-[10px] uppercase font-black tracking-widest">
          <a href="#" className="hover:text-white transition-colors">
            {dict.privacyPolicy}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {dict.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}
