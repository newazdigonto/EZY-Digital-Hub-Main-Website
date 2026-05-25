import React, { useState } from "react";
import { X, Calendar, Clock, Globe, CheckCircle2, CalendarPlus, ChevronRight } from "lucide-react";
import { Language } from "../types";
import { DICTIONARY } from "../data";

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function BookMeetingModal({ isOpen, onClose, language }: BookMeetingModalProps) {
  const dict = DICTIONARY[language];

  // Appointment schedule variables
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [attendeeCompany, setAttendeeCompany] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  // Let's generate 4 realistic upcoming consulting dates in May 2026 (skipping Bangladeshi weekends i.e. Fri/Sat, working Sun-Thu)
  const availableDates = [
    { id: "date-1", day: "Mon", dateStr: "May 25, 2026", labelBn: "সোমবার, ২৫ মে" },
    { id: "date-2", day: "Tue", dateStr: "May 26, 2026", labelBn: "মঙ্গলবার, ২৬ মে" },
    { id: "date-3", day: "Wed", dateStr: "May 27, 2026", labelBn: "বুধবার, ২৭ মে" },
    { id: "date-4", day: "Thu", dateStr: "May 28, 2026", labelBn: "বৃহস্পতিবার, ২৮ মে" }
  ];

  const timeSlots = ["10:30 AM", "11:45 AM", "2:00 PM", "3:30 PM", "5:00 PM"];

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTimeSlot) {
      setFormError(language === "en" ? "Please select a date and an available hour." : "দয়া করে একটি তারিখ ও পছন্দসই সময় নির্বাচন করুন।");
      return;
    }

    if (!attendeeName || !attendeeEmail) {
      setFormError(language === "en" ? "Name and Email are required." : "নাম এবং ইমেল প্রদান করা আবশ্যক।");
      return;
    }

    setFormError("");
    setIsSuccess(true);
  };

  const selectedDateObj = availableDates.find((d) => d.id === selectedDate);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose}></div>

      {/* Frame wrapper */}
      <div className="rounded-3xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto z-10 shadow-3xl text-white relative animate-[zoomIn_0.2s_ease-out] glow-box">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer select-none"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* High-Fidelity Success Receipt */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-600/15 border border-emerald-500/25 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className={`text-2xl font-black text-white ${language === "bn" ? "font-siliguri" : ""}`}>
                {language === "en" ? "Consultation Booked!" : "মিটিং বুকিং সম্পন্ন!"}
              </h3>
              <p className={`text-xs text-gray-400 max-w-sm mx-auto leading-relaxed ${language === "bn" ? "font-siliguri" : ""}`}>
                {language === "en"
                  ? "A Google Calendar invite and conference link have been provisioned and sent to your email address."
                  : "আপনার আর্কিটেকচার রিভিউ সেশনের জন্য ইজি ডিজিটাল হাব থেকে ইনভাইট পাঠানো হয়েছে।"}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Consultant Host</span>
                <span className="text-xs font-bold text-orange-500">Ezy Digital Growth Architect</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Selected Date</span>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{language === "en" ? selectedDateObj?.dateStr : selectedDateObj?.labelBn}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Hour Duration</span>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{selectedTimeSlot} (GMT+6)</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 space-y-1 text-xs">
                <span className="text-[9px] font-bold text-gray-500 uppercase block">Attendee Info</span>
                <p className="font-extrabold text-white text-xs">{attendeeName}</p>
                <p className="text-gray-400 font-mono text-[11px]">{attendeeEmail}</p>
                {attendeeCompany && <p className="text-gray-400 text-[11px]">Company: {attendeeCompany}</p>}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Great, Add to Stream</span>
            </button>
          </div>
        ) : (
          /* Live Booking Portal */
          <form onSubmit={handleBookingConfirm} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <h3 className={`text-xl sm:text-2xl font-black text-white ${language === "bn" ? "font-siliguri font-black" : ""}`}>
                {language === "en" ? "Schedule Consultation Call" : "ফ্রি স্ট্র্যাটেজি সেশন বুক করুন"}
              </h3>
              <p className={`text-xs text-gray-400 leading-relaxed ${language === "bn" ? "font-siliguri font-semibold leading-relaxed" : ""}`}>
                {dict.meetingDesc}
              </p>
            </div>

            {/* Timezone banner */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between text-xs text-gray-400 font-bold uppercase select-none">
              <span className="flex items-center gap-1.5 pl-1">
                <Globe className="w-4 h-4 text-orange-500" />
                Timezone Context
              </span>
              <span className="text-white text-[10px] tracking-wider">DHAKA, BANGLADESH (GMT+6)</span>
            </div>

            {/* Step 1: Select Date */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#ff8c00] block">
                1. Select Consulting Date
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {availableDates.map((date) => (
                  <button
                    key={date.id}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date.id);
                      setFormError("");
                    }}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      selectedDate === date.id
                        ? "bg-orange-600 text-white border-orange-600 font-extrabold"
                        : "bg-black/50 hover:bg-white/5 text-gray-300 border-white/10"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-black tracking-wider block opacity-75">
                      {date.day}
                    </span>
                    <span className={`text-xs block mt-1 ${language === "bn" ? "font-siliguri font-black text-[10px]" : "font-extrabold"}`}>
                      {language === "en" ? date.dateStr : date.labelBn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#ff8c00] block">
                2. Pick Available Hour
              </label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setFormError("");
                    }}
                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wide rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedTimeSlot === slot
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-black/40 hover:bg-white/5 text-gray-300 border-white/5"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact details fields */}
            <div className="space-y-4 border-t border-white/5 pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#ff8c00] block">
                3. Your Registration Credentials
              </label>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={attendeeName}
                  onChange={(e) => {
                    setAttendeeName(e.target.value);
                    setFormError("");
                  }}
                  required
                  className="w-full h-11 bg-black border border-white/5 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                />

                <input
                  type="email"
                  placeholder="Your Email Address *"
                  value={attendeeEmail}
                  onChange={(e) => {
                    setAttendeeEmail(e.target.value);
                    setFormError("");
                  }}
                  required
                  className="w-full h-11 bg-black border border-white/5 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                />

                <input
                  type="text"
                  placeholder="Company Name (optional)"
                  value={attendeeCompany}
                  onChange={(e) => setAttendeeCompany(e.target.value)}
                  className="w-full h-11 bg-black border border-white/5 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {formError && (
              <p className={`text-xs text-red-500 font-bold ${language === "bn" ? "font-siliguri" : ""}`}>
                ⚠️ {formError}
              </p>
            )}

            {/* Confirm CTA */}
            <button
              type="submit"
              className="w-full h-12 bg-orange-600 hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none"
            >
              <span>{language === "en" ? "Confirm scheduled meeting slot" : "নিশ্চিত করুন এবং সাবমিট দিন"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
