import React, { useState } from "react";
import { MessageSquareDot, Mail, Phone, MapPin, Clock, MessageCircleCode, CheckCircle2 } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const dict = DICTIONARY[language];

  // Forms states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorText(language === "en" ? "Please fill in all required fields." : "দয়া করে প্রয়োজনীয় সব তথ্য প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    // Simulate server ingestion delay
    setTimeout(() => {
      // Create new inquiry node and persist to localStorage
      try {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const newInquiry = {
          id: "inq_" + Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "N/A",
          message: formData.message,
          date: timestamp
        };

        const existingRaw = localStorage.getItem("ezydigital_inquiries");
        const inquiriesArr = existingRaw ? JSON.parse(existingRaw) : [];
        inquiriesArr.unshift(newInquiry);
        localStorage.setItem("ezydigital_inquiries", JSON.stringify(inquiriesArr));
      } catch (err) {
        console.error("Local Storage sync error", err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact-section" className="py-20 lg:py-28 bg-[#0a0a0a] text-white px-4 md:px-6 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#ff8c00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/15 to-orange-500/5 border border-orange-500/10 px-4 py-1 rounded-full text-[#ff8c00] text-[10px] font-black uppercase tracking-widest select-none">
            <MessageSquareDot className="w-4 h-4" />
            <span>Interactive Consulting</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white ${language === "bn" ? "font-siliguri leading-tight" : ""}`}>
            {dict.contactTitle}
          </h2>
          <p className={`text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
            {dict.contactSub}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columns 1 & 2: Contact Information Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl space-y-6 glow-box">
              <h3 className={`text-xl font-black text-orange-500 uppercase tracking-wide ${language === "bn" ? "font-siliguri" : ""}`}>
                {language === "en" ? "Inquiry Channels" : "রিয়েল-টাইম চ্যানেল"}
              </h3>

              {/* HQ Address element */}
              <div className="flex gap-4 items-start text-sm text-gray-300">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-black text-white text-xs uppercase tracking-wide ${language === "bn" ? "font-siliguri" : ""}`}>
                    {dict.addressTitle}
                  </h4>
                  <p className={`mt-1 text-gray-400 ${language === "bn" ? "font-siliguri text-sm" : ""}`}>
                    {dict.addressDesc}
                  </p>
                </div>
              </div>

              {/* Phone item click details */}
              <a href="tel:+8801935623213" className="flex gap-4 items-start text-sm text-gray-300 group block">
                <div className="w-10 h-10 bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-xs uppercase tracking-wide">Phone Helpline</h4>
                  <p className="mt-1 text-gray-400 font-mono group-hover:text-white transition-colors">+880 1935-623213</p>
                </div>
              </a>

              {/* Email channel */}
              <a href="mailto:contact@ezydigitalhub.com" className="flex gap-4 items-start text-sm text-gray-300 group block">
                <div className="w-10 h-10 bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-xs uppercase tracking-wide">Official Email</h4>
                  <p className="mt-1 text-gray-400 font-mono group-hover:text-white transition-colors">contact@ezydigitalhub.com</p>
                </div>
              </a>

              {/* Office hours segment */}
              <div className="flex gap-4 items-start text-sm text-gray-300">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-black text-white text-xs uppercase tracking-wide ${language === "bn" ? "font-siliguri" : ""}`}>
                    {dict.hoursTitle}
                  </h4>
                  <p className={`mt-1 text-gray-400 ${language === "bn" ? "font-siliguri text-xs" : ""}`}>
                    {dict.hoursDesc}
                  </p>
                </div>
              </div>

              {/* WhatsApp direct launch CTA button */}
              <div className="pt-6 border-t border-white/5">
                <a
                  href="https://wa.me/8801935623213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-[#25d366]/10 hover:bg-[#25d366] hover:text-[#0a0a0a] border border-[#25d366]/30 text-[#25d366] font-black text-[10px] sm:text-[11px] tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircleCode className="w-5 h-5" />
                  <span>{dict.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Inquiry Form Element */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl relative glow-box">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-14 h-14 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-xl font-black text-white ${language === "bn" ? "font-siliguri" : ""}`}>
                      Inquiry Dispatched!
                    </h3>
                    <p className={`text-sm text-gray-400 max-w-md mx-auto leading-relaxed ${language === "bn" ? "font-siliguri" : ""}`}>
                      {dict.sentSuccess}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase rounded-xl transition-colors"
                  >
                    Send Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={dict.placeholderName}
                        required
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Email Address <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={dict.placeholderEmail}
                        required
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict.placeholderPhone}
                      className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Message description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                      Project specifications <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={dict.placeholderMessage}
                      required
                      rows={4}
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {errorText && (
                    <p className={`text-xs text-red-500 select-none ${language === "bn" ? "font-siliguri" : ""}`}>
                      ⚠️ {errorText}
                    </p>
                  )}

                  {/* Submit CTA button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer select-none hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                  >
                    {isSubmitting ? (
                      <span className={language === "bn" ? "font-siliguri font-black" : ""}>{dict.sending}</span>
                    ) : (
                      <span className={language === "bn" ? "font-siliguri font-black" : ""}>{dict.sendMessage}</span>
                    )}
                  </button>
                </form>
              )}
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
