import React, { useState, useEffect } from "react";
import {
  Users,
  LogOut,
  Globe,
  Settings,
  Briefcase,
  Users2,
  PhoneCall,
  Plus,
  Trash2,
  Lock,
  Check,
  ShieldAlert,
  Save,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  MapPin,
  CreditCard,
  DollarSign,
  FileText,
  AlertCircle,
  History,
  TrendingUp,
  Download,
  Send,
  Eye,
  CheckCircle2,
  PlusCircle
} from "lucide-react";
import { Language } from "../types";

interface DashboardProps {
  language: Language;
  username: string;
  isSuperAdmin: boolean;
  permissions: {
    hero: boolean;
    about: boolean;
    services: boolean;
    portfolio: boolean;
    reviews: boolean;
    contact: boolean;
    users: boolean;
  };
  onLogOut: () => void;
}

interface CustomUser {
  id: string;
  username: string;
  password?: string;
  permissions: any;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function Dashboard({
  language,
  username,
  isSuperAdmin,
  permissions,
  onLogOut
}: DashboardProps) {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (isSuperAdmin) return "users";
    if (permissions.hero) return "hero";
    return "clients_bd";
  });

  // Sidebar collapsible lists
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    website: true,
    clients: true,
    payment: true
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // State Datastores
  const [users, setUsers] = useState<CustomUser[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  const [clientsBD, setClientsBD] = useState<any[]>([]);
  const [clientsAU, setClientsAU] = useState<any[]>([]);
  const [adCosts, setAdCosts] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  // Selected invoice for details popup
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Form inputs states (Single compound states to keep code extremely clean)
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [userPerms, setUserPerms] = useState({ hero: true, about: true, services: true, portfolio: true, reviews: true, contact: true, users: false });
  const [heroSettings, setHeroSettings] = useState({ titleEn: "Empowering Your Digital Presence", titleBn: "আপনার ডিজিটাল উপস্থিতি শক্তিশালী করা", descEn: "", descBn: "" });
  const [aboutSettings, setAboutSettings] = useState({ textEn: "", textBn: "" });

  const [bdForm, setBdForm] = useState({ name: "", business: "", location: "Dhaka", status: "Active", value: "", phone: "" });
  const [auForm, setAuForm] = useState({ name: "", business: "", location: "Sydney", status: "Active", value: "", email: "" });
  const [adForm, setAdForm] = useState({ campaignName: "", platform: "Facebook Ads", spend: "", conversions: "", date: "2026-05" });
  const [subForm, setSubForm] = useState({ clientName: "", plan: "Premium Retainer", amount: "", nextBilling: "2026-06-01", status: "Active" });
  const [invForm, setInvForm] = useState({ clientName: "", itemName: "", price: "", qty: "1", status: "Unpaid" });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load Initial JSON lists
  useEffect(() => {
    // Users
    const savedUsers = localStorage.getItem("ezydigital_users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else {
      const initialUsers = [{ id: "u1", username: "manager", password: "123", permissions: { hero: true, about: true, services: true, portfolio: true, reviews: false, contact: true, users: false } }];
      localStorage.setItem("ezydigital_users", JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }

    // Inquiries
    const savedInquiries = localStorage.getItem("ezydigital_inquiries");
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

    // Hero and About settings
    const savedHero = localStorage.getItem("ezydigital_edited_hero");
    if (savedHero) setHeroSettings(JSON.parse(savedHero));
    const savedAbout = localStorage.getItem("ezydigital_edited_about");
    if (savedAbout) setAboutSettings(JSON.parse(savedAbout));

    // Bangladeshi clients
    const savedBD = localStorage.getItem("ezydigital_clients_bd");
    if (savedBD) setClientsBD(JSON.parse(savedBD));
    else {
      const data = [
        { id: "bd_1", name: "Aman Group Ltd", business: "Garments & Textiles", location: "Dhaka", status: "Active", value: 450000, phone: "+8801711234567" },
        { id: "bd_2", name: "Chowdhury Tech", business: "Software Development", location: "Chittagong", status: "Active", value: 280000, phone: "+8801819876543" },
        { id: "bd_3", name: "Bengal Organic Foods", business: "E-Commerce", location: "Sylhet", status: "Completed", value: 150000, phone: "+8801912345678" }
      ];
      localStorage.setItem("ezydigital_clients_bd", JSON.stringify(data));
      setClientsBD(data);
    }

    // Australians clients
    const savedAU = localStorage.getItem("ezydigital_clients_au");
    if (savedAU) setClientsAU(JSON.parse(savedAU));
    else {
      const data = [
        { id: "au_1", name: "Pacific Digital QLD", business: "Creative Agency", location: "Brisbane", status: "Active", value: 5400, email: "info@pacificdigital.com.au" },
        { id: "au_2", name: "Aussie Solar Spares", business: "Solar Energy Solutions", location: "Sydney", status: "Active", value: 8900, email: "billing@aussiesolar.com.au" }
      ];
      localStorage.setItem("ezydigital_clients_au", JSON.stringify(data));
      setClientsAU(data);
    }

    // Monthly Ad costs
    const savedAd = localStorage.getItem("ezydigital_ad_costs");
    if (savedAd) setAdCosts(JSON.parse(savedAd));
    else {
      const data = [
        { id: "ad_1", campaignName: "E-Commerce May Dynamic Campaign", platform: "Facebook Ads", spend: 45000, conversions: 920, date: "2026-05" },
        { id: "ad_2", campaignName: "Google Search Intent Leads B2B", platform: "Google Ads", spend: 28000, conversions: 310, date: "2026-05" }
      ];
      localStorage.setItem("ezydigital_ad_costs", JSON.stringify(data));
      setAdCosts(data);
    }

    // Subscriptions
    const savedSub = localStorage.getItem("ezydigital_subscriptions");
    if (savedSub) setSubscriptions(JSON.parse(savedSub));
    else {
      const data = [
        { id: "sub_1", clientName: "Apex Tech Group", plan: "Premium Retainer", amount: 800, nextBilling: "2026-06-15", status: "Active" },
        { id: "sub_2", clientName: "Elegance House BD", plan: "SEO & Growth Retainer", amount: 350, nextBilling: "2026-06-01", status: "Active" }
      ];
      localStorage.setItem("ezydigital_subscriptions", JSON.stringify(data));
      setSubscriptions(data);
    }

    // Invoices
    const savedInvoices = localStorage.getItem("ezydigital_invoices");
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    else {
      const data = [
        { id: "inv_1", invoiceNumber: "EZY-2026-042", clientName: "Aman Group Ltd", itemName: "UI/UX Identity Prototype Design", price: 120000, qty: 1, total: 126000, date: "2026-05-10", status: "Paid" },
        { id: "inv_2", invoiceNumber: "EZY-2026-043", clientName: "Chowdhury Tech", itemName: "React Portal Development", price: 280000, qty: 1, total: 294000, date: "2026-05-18", status: "Unpaid" },
        { id: "inv_3", invoiceNumber: "EZY-2026-044", clientName: "Aussie Solar Spares", itemName: "DevOps Config & Maintenance", price: 4500, qty: 1, total: 4950, date: "2026-05-22", status: "Paid" }
      ];
      localStorage.setItem("ezydigital_invoices", JSON.stringify(data));
      setInvoices(data);
    }

    // Payments History ledger
    const savedHistory = localStorage.getItem("ezydigital_history");
    if (savedHistory) setPaymentHistory(JSON.parse(savedHistory));
    else {
      const data = [
        { id: "pay_1", invoiceNumber: "EZY-2026-042", clientName: "Aman Group Ltd", amount: 126000, method: "Bank Transfer", date: "2026-05-11", status: "Success", txid: "BANK_TX_92019" },
        { id: "pay_2", invoiceNumber: "EZY-2026-044", clientName: "Aussie Solar Spares", amount: 4950, method: "Stripe Card Gateway", date: "2026-05-23", status: "Success", txid: "ch_3Mv8XmLKd" }
      ];
      localStorage.setItem("ezydigital_history", JSON.stringify(data));
      setPaymentHistory(data);
    }
  }, []);

  // Update localStorage helper
  const syncStore = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // HANDLERS
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;
    if (users.some(u => u.username.toLowerCase() === newUser.username.toLowerCase())) {
      alert("Username exists!");
      return;
    }
    const updated = [...users, { id: "u_" + Date.now(), username: newUser.username, password: newUser.password, permissions: { ...userPerms } }];
    setUsers(updated);
    syncStore("ezydigital_users", updated);
    setNewUser({ username: "", password: "" });
    triggerToast("User created with customized clearance list!");
  };

  const handleDeleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    syncStore("ezydigital_users", updated);
  };

  const handleUpdateHero = (e: React.FormEvent) => {
    e.preventDefault();
    syncStore("ezydigital_edited_hero", heroSettings);
    triggerToast("Hero settings recorded on home page!");
  };

  const handleUpdateAbout = (e: React.FormEvent) => {
    e.preventDefault();
    syncStore("ezydigital_edited_about", aboutSettings);
    triggerToast("About narrative details synchronized!");
  };

  // BD CLIENT CREATION
  const handleAddBDClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bdForm.name || !bdForm.value) return;
    const newClient = {
      id: "bd_" + Date.now(),
      name: bdForm.name,
      business: bdForm.business || "Business Venture",
      location: bdForm.location,
      status: bdForm.status,
      value: Number(bdForm.value) || 0,
      phone: bdForm.phone || "+880"
    };
    const updated = [newClient, ...clientsBD];
    setClientsBD(updated);
    syncStore("ezydigital_clients_bd", updated);
    setBdForm({ name: "", business: "", location: "Dhaka", status: "Active", value: "", phone: "" });
    triggerToast("Bangladeshi client record appended!");
  };

  const handleDeleteBD = (id: string) => {
    const updated = clientsBD.filter(c => c.id !== id);
    setClientsBD(updated);
    syncStore("ezydigital_clients_bd", updated);
  };

  // AU CLIENT CREATION
  const handleAddAUClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auForm.name || !auForm.value) return;
    const newClient = {
      id: "au_" + Date.now(),
      name: auForm.name,
      business: auForm.business || "Creative Venture",
      location: auForm.location,
      status: auForm.status,
      value: Number(auForm.value) || 0,
      email: auForm.email || "info@corporate.com"
    };
    const updated = [newClient, ...clientsAU];
    setClientsAU(updated);
    syncStore("ezydigital_clients_au", updated);
    setAuForm({ name: "", business: "", location: "Sydney", status: "Active", value: "", email: "" });
    triggerToast("Australian client record recorded!");
  };

  const handleDeleteAU = (id: string) => {
    const updated = clientsAU.filter(c => c.id !== id);
    setClientsAU(updated);
    syncStore("ezydigital_clients_au", updated);
  };

  // AD COST CREATION
  const handleAddAdCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adForm.campaignName || !adForm.spend) return;
    const newAd = {
      id: "ad_" + Date.now(),
      campaignName: adForm.campaignName,
      platform: adForm.platform,
      spend: Number(adForm.spend) || 0,
      conversions: Number(adForm.conversions) || 0,
      date: adForm.date
    };
    const updated = [newAd, ...adCosts];
    setAdCosts(updated);
    syncStore("ezydigital_ad_costs", updated);
    setAdForm({ campaignName: "", platform: "Facebook Ads", spend: "", conversions: "", date: "2026-05" });
    triggerToast("Monthly marketing spend logged successfully!");
  };

  // SUBSCRIPTION CREATION
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.clientName || !subForm.amount) return;
    const newSub = {
      id: "sub_" + Date.now(),
      clientName: subForm.clientName,
      plan: subForm.plan,
      amount: Number(subForm.amount) || 0,
      nextBilling: subForm.nextBilling,
      status: subForm.status
    };
    const updated = [newSub, ...subscriptions];
    setSubscriptions(updated);
    syncStore("ezydigital_subscriptions", updated);
    setSubForm({ clientName: "", plan: "Premium Retainer", amount: "", nextBilling: "2026-06-01", status: "Active" });
    triggerToast("Recurring retainer client setup completed!");
  };

  const toggleSubStatus = (id: string) => {
    const updated = subscriptions.map(s => s.id === id ? { ...s, status: s.status === "Active" ? "Paused" : "Active" } : s);
    setSubscriptions(updated);
    syncStore("ezydigital_subscriptions", updated);
  };

  // INVOICE CREATION
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invForm.clientName || !invForm.itemName || !invForm.price) return;
    const randomNum = Math.floor(100 + Math.random() * 900);
    const invoiceNum = `EZY-2026-${randomNum}`;
    const subtotal = Number(invForm.price) * (Number(invForm.qty) || 1);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const newInvoice = {
      id: "inv_" + Date.now(),
      invoiceNumber: invoiceNum,
      clientName: invForm.clientName,
      itemName: invForm.itemName,
      price: Number(invForm.price),
      qty: Number(invForm.qty) || 1,
      total: total,
      date: new Date().toISOString().substring(0, 10),
      status: invForm.status
    };
    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    syncStore("ezydigital_invoices", updated);

    // If marked Paid, auto-record in payments history ledger
    if (invForm.status === "Paid") {
      const newPay = {
        id: "pay_" + Date.now(),
        invoiceNumber: invoiceNum,
        clientName: invForm.clientName,
        amount: total,
        method: "bKash Merchant Core",
        date: new Date().toISOString().substring(0, 10),
        status: "Success",
        txid: "BK_" + Math.floor(100000 + Math.random() * 900000)
      };
      const updatedHistory = [newPay, ...paymentHistory];
      setPaymentHistory(updatedHistory);
      syncStore("ezydigital_history", updatedHistory);
    }

    setInvForm({ clientName: "", itemName: "", price: "", qty: "1", status: "Unpaid" });
    triggerToast(`Invoice ${invoiceNum} structured and generated!`);
  };

  // CLOSE & RECEIVE OUTSTANDING BALANCES IN DUE SECTION
  const handleRecordDuePayment = (invoice: any) => {
    // 1. Change invoice state status
    const updatedInvs = invoices.map(i => i.id === invoice.id ? { ...i, status: "Paid" } : i);
    setInvoices(updatedInvs);
    syncStore("ezydigital_invoices", updatedInvs);

    // 2. Log in payment history
    const newPay = {
      id: "pay_" + Date.now(),
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      amount: invoice.total,
      method: "Bank Clearing",
      date: new Date().toISOString().substring(0, 10),
      status: "Success",
      txid: "CLR_" + Math.floor(20000 + Math.random() * 70000)
    };
    const updatedLogs = [newPay, ...paymentHistory];
    setPaymentHistory(updatedLogs);
    syncStore("ezydigital_history", updatedLogs);

    triggerToast(`Payment logged! Invoice ${invoice.invoiceNumber} status cleared.`);
  };

  const copyReminderToClipboard = (clientName: string, invoiceNum: string, amount: number) => {
    const formatted = language === "en"
      ? `Hello ${clientName}, this is Ezy Digital Hub. This is an automated friendly reminder regarding invoice ${invoiceNum}, total due amount of ${amount}. Kindly clear the balance at your earliest convenience. Thank you!`
      : `আসসালামু আলাইকুম ${clientName}, ইজি ডিজিটাল হাব থেকে বলছি। আপনার ইনভয়েস ${invoiceNum} সংক্রান্ত মোট বকেয়া ${amount} পরিশোধের জন্য এই বন্ধুত্বপূর্ণ রিমাইন্ডারটি পাঠানো হলো। ধন্যবাদ!`;
    navigator.clipboard.writeText(formatted);
    triggerToast("WhatsApp reminder text copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#061329] text-white flex flex-col font-sans select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-emerald-600 text-white font-sans text-xs font-bold py-3 px-5 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] border border-emerald-500 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Control Header */}
      <header className="bg-[#091a38] border-b border-white/5 py-4 px-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <img
            src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <div className="h-4 w-px bg-white/20"></div>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-orange-400">
            {isSuperAdmin ? "SUPER ADMIN DECK" : "OPERATOR PORTAL"}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 font-mono hidden md:inline">Logged: <strong className="text-orange-400">{username}</strong></span>
          <button
            onClick={onLogOut}
            className="px-3.5 py-1.5 bg-red-600/10 hover:bg-red-600 border border-red-500/10 text-red-400 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-black"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT DECK</span>
          </button>
        </div>
      </header>

      {/* Dashboard Canvas */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        
        {/* Left Side Hierarchy Navigation */}
        <aside className="w-full md:w-64 bg-[#071630] border-r border-white/5 p-4 space-y-3.5 overflow-y-auto">
          
          {/* MENU 1. USER PERMISSIONS */}
          {isSuperAdmin && (
            <div className="space-y-1">
              <p className="text-[10px] font-black tracking-widest text-[#F7931E] uppercase px-3 mb-1 font-mono">1. User Deck</p>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "users" ? "bg-orange-600 text-white shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span>User Permissions</span>
              </button>
            </div>
          )}

          {/* MENU 2. WEBSITE EDIT CONTENT (SUBMENU) */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("website")}
              className="w-full text-left py-1 px-3 text-[10px] font-black tracking-widest text-[#F7931E] uppercase flex items-center justify-between cursor-pointer"
            >
              <span>2. WEBSITE EDIT CONTENT</span>
              {openMenus.website ? <ChevronDown className="w-3 h-3 text-orange-450" /> : <ChevronRight className="w-3 h-3 text-orange-450" />}
            </button>

            {openMenus.website && (
              <div className="pl-3 space-y-0.5 border-l border-white/5 ml-3">
                {permissions.hero && (
                  <button
                    onClick={() => setActiveTab("hero")}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "hero" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Hero settings</span>
                  </button>
                )}
                {permissions.about && (
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === "about" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Users2 className="w-3.5 h-3.5" />
                    <span>About details</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab("services")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "services" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Services List</span>
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "portfolio" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfolio Showcase</span>
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "reviews" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Clients Love</span>
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "contact" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquiries Tracker</span>
                </button>
              </div>
            )}
          </div>

          {/* MENU 3. CLIENTS LIST (SUBMENU) */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("clients")}
              className="w-full text-left py-1 px-3 text-[10px] font-black tracking-widest text-[#F7931E] uppercase flex items-center justify-between cursor-pointer"
            >
              <span>3. CLIENTS LIST</span>
              {openMenus.clients ? <ChevronDown className="w-3 h-3 text-orange-450" /> : <ChevronRight className="w-3 h-3 text-orange-450" />}
            </button>

            {openMenus.clients && (
              <div className="pl-3 space-y-0.5 border-l border-white/5 ml-3">
                <button
                  onClick={() => setActiveTab("clients_bd")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "clients_bd" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-450" />
                  <span>Bangladeshi clients</span>
                </button>
                <button
                  onClick={() => setActiveTab("clients_au")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "clients_au" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Australians Clients</span>
                </button>
              </div>
            )}
          </div>

          {/* MENU 4. PAYMENT SYSTEM (SUBMENU) */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("payment")}
              className="w-full text-left py-1 px-3 text-[10px] font-black tracking-widest text-[#F7931E] uppercase flex items-center justify-between cursor-pointer"
            >
              <span>4. PAYMENT SYSTEM</span>
              {openMenus.payment ? <ChevronDown className="w-3 h-3 text-orange-450" /> : <ChevronRight className="w-3 h-3 text-orange-450" />}
            </button>

            {openMenus.payment && (
              <div className="pl-3 space-y-0.5 border-l border-white/5 ml-3 font-sans">
                <button
                  onClick={() => setActiveTab("payment_ad_cost")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_ad_cost" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
                  <span>Monthly Ad cost</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment_subscription")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide tracking-tight transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_subscription" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Monthly Subscription</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment_invoices")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_invoices" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoices</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment_due")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_due" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Due</span>
                </button>
                <button
                  onClick={() => setActiveTab("payment_history")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_history" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Payment History</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/5 text-[9px] text-gray-500 leading-relaxed font-sans px-3">
            <span>Ezy Digital Hub Console v4.3. Full Sandbox Isolation.</span>
          </div>
        </aside>

        {/* Right Tab panels workspace */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto bg-[#061329]">
          
          {/* 1. USERS LIST PANEL */}
          {activeTab === "users" && isSuperAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">User Permissions Settings</h2>
                <p className="text-xs text-gray-400">Add staff credentials and define allowed tabs to keep secure control limits.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddUser} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-4">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2">Add Admin Subprofile</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="e.g. manager_ctg"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Secret Key / Password</label>
                    <input
                      type="password"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Tab Permissions Allowed:</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                      {Object.keys(userPerms).map((k) => (
                        <label key={k} className="flex items-center gap-1.5 cursor-pointer hover:text-white capitalize">
                          <input
                            type="checkbox"
                            checked={(userPerms as any)[k]}
                            onChange={() => setUserPerms(prev => ({ ...prev, [k]: !(prev as any)[k] }))}
                            className="accent-orange-500 rounded text-xs"
                          />
                          <span>{k}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 tracking-wider"
                  >
                    <span>Create User Base</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide mb-4">Active Authorization Registry</span>
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black tracking-wider pb-2">
                        <th className="py-2">UID</th>
                        <th className="py-2">Subprofile</th>
                        <th className="py-2 text-center">Clearance Node list</th>
                        <th className="py-2 text-right">Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 text-gray-300">
                        <td className="py-2.5 font-mono text-gray-500">SYSTEM</td>
                        <td className="py-2.5 font-bold text-white">superadmin</td>
                        <td className="py-2.5 text-center"><span className="bg-orange-500/10 text-[#F7931E] text-[9px] font-black px-2 py-0.5 rounded border border-orange-500/10 uppercase">Full Clearance Deck</span></td>
                        <td className="py-2.5 text-right"><span className="text-[10px] text-gray-500 italic">Protected Node</span></td>
                      </tr>
                      {users.map(u => (
                        <tr key={u.id} className="border-b border-white/5 text-gray-300 hover:bg-white/5">
                          <td className="py-2.5 font-mono text-gray-500">{u.id.substring(0,6)}</td>
                          <td className="py-2.5 font-bold text-slate-100">{u.username}</td>
                          <td className="py-2.5 text-center">
                            <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
                              {Object.entries(u.permissions).map(([tab, allowed]) => allowed ? (
                                <span key={tab} className="bg-white/5 text-gray-400 text-[8px] font-bold px-1 rounded uppercase">{tab}</span>
                              ) : null)}
                            </div>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 bg-red-650/10 hover:bg-red-650 text-red-400 hover:text-white rounded border border-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. HERO SETTINGS PANEL */}
          {activeTab === "hero" && permissions.hero && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Hero Section Settings</h2>
                <p className="text-xs text-gray-400">Directly override active h1 headlines and paragraphs displayed on the front screen.</p>
              </div>

              <form onSubmit={handleUpdateHero} className="bg-[#091a38] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">English Title</label>
                    <input
                      type="text"
                      value={heroSettings.titleEn}
                      onChange={(e) => setHeroSettings({...heroSettings, titleEn: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1 font-siliguri">হিরো টাইটেল (Bangla)</label>
                    <input
                      type="text"
                      value={heroSettings.titleBn}
                      onChange={(e) => setHeroSettings({...heroSettings, titleBn: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-siliguri"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">English Subtext Paragraph</label>
                  <textarea
                    rows={3}
                    value={heroSettings.descEn}
                    onChange={(e) => setHeroSettings({...heroSettings, descEn: e.target.value})}
                    placeholder="Provide english description overlay"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1 font-siliguri">বাংলা বিবরণ সাবটেক্সট</label>
                  <textarea
                    rows={3}
                    value={heroSettings.descBn}
                    onChange={(e) => setHeroSettings({...heroSettings, descBn: e.target.value})}
                    placeholder="বাংলা হিরো ডেসক্রিপশন লিখুন"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-siliguri"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Hero Panel</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. ABOUT DETAILS PANEL */}
          {activeTab === "about" && permissions.about && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">About Details Editor</h2>
                <p className="text-xs text-gray-400">Modify information statements and core focus parameters in the informational block.</p>
              </div>

              <form onSubmit={handleUpdateAbout} className="bg-[#091a38] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Strategic Description (EN)</label>
                  <textarea
                    rows={4}
                    value={aboutSettings.textEn}
                    onChange={(e) => setAboutSettings({...aboutSettings, textEn: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#F7931E] uppercase tracking-widest block mb-1 font-siliguri">কর্পোরেট মিশন বিবরন (BN)</label>
                  <textarea
                    rows={4}
                    value={aboutSettings.textBn}
                    onChange={(e) => setAboutSettings({...aboutSettings, textBn: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none font-siliguri animate-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Strategic Block</span>
                </button>
              </form>
            </div>
          )}

          {/* 4. SERVICES LIST PANEL */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Corporate Services Catalogue</h2>
                <p className="text-xs text-gray-400">Supervise, manage status blocks, and check active digital service vertical pipelines.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Logo & Brand Kitrevamp", price: "$400 / BDT 45k+", desc: "Premium vector corporate logo kits, typography structures.", status: "LIVE" },
                  { name: "Vite + Tailwind Web Apps", price: "$1,200 / BDT 140k+", desc: "Super-fast React websites, conversion focused portals.", status: "LIVE" },
                  { name: "Performance Marketing campaigns", price: "Retainer base / % spend", desc: "Facebook pixel event setup, target audience segmentation.", status: "LIVE" },
                  { name: "AI Video Production Studio", price: "$500 retainer / month", desc: "Short video reels, automated voice channels, dynamic render.", status: "LIVE" }
                ].map((s, idx) => (
                  <div key={idx} className="bg-[#091a38] border border-white/10 p-5 rounded-2xl relative space-y-3">
                    <span className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8px] font-black px-1.5 py-0.5 rounded-full">{s.status}</span>
                    <p className="text-xs font-black text-[#F7931E] uppercase">{idx + 1}. {s.name}</p>
                    <p className="text-[10px] text-gray-400">{s.desc}</p>
                    <p className="text-[11px] font-black text-white font-mono">{s.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. PORTFOLIO SHOWCASE PANEL */}
          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Portfolio Showcase Catalog</h2>
                <p className="text-xs text-gray-400">Check current project milestones, case works, and client validation charts.</p>
              </div>

              <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3.5">
                {[
                  { title: "Beshuddho Organic E-commerce Funnel", metric: "350% Checkout Conversion Boost", cat: "Web Development" },
                  { title: "Aussie Solar Power Identity Revision", metric: "Complete Redesign and Brand Kit Match", cat: "Logo & Branding" },
                  { title: "Lumin Cosmetics Retexturing Ads", metric: "14x Retargeting ROAS Index", cat: "Performance Ads" }
                ].map((p, idx) => (
                  <div key={idx} className="p-4 bg-black/25 hover:bg-black/35 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[9px] text-orange-400 font-bold uppercase tracking-wider block">{p.cat}</span>
                      <strong className="text-white text-xs block mt-0.5">{p.title}</strong>
                    </div>
                    <span className="bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 font-mono text-[10px] font-black px-2.5 py-1 rounded-full">
                      {p.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. CLIENTS LOVE PANEL */}
          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Clients Feedback registry</h2>
                <p className="text-xs text-gray-400">Read and verify public customer reviews displayed in the landing sliders.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Tahsin Sadat", comp: "Bengal Foods LTD", review: "Ezy Digital transformed our client acquisition speed! Custom layouts are beautiful.", stars: 5 },
                  { name: "Michael Vance", comp: "Outback Solar Brisbane", review: "Great response time, precise communications, and an effective React portal.", stars: 5 }
                ].map((r, i) => (
                  <div key={i} className="p-4 bg-[#091a38] border border-white/5 rounded-xl space-y-1.5 relative">
                    <span className="text-yellow-400 text-xs absolute top-4 right-4">{"★".repeat(r.stars)}</span>
                    <strong className="text-xs text-slate-200 block uppercase font-black">{r.name} • <span className="text-orange-400 normal-case">{r.comp}</span></strong>
                    <p className="text-xs text-gray-300 italic">"{r.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. INQUIRIES TRACKER PANEL */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Inquiries Tracker Portal</h2>
                <p className="text-xs text-gray-400">Review direct client requirements submitted via homepage forms.</p>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-10 text-center text-gray-500">
                  <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-orange-500/40" />
                  <p className="text-xs font-black text-gray-450 uppercase tracking-widest">No Client inquiries logged yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-[#091a38] border border-white/10 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between items-center bg-black/25 p-3 rounded-xl border border-white/5">
                        <div>
                          <strong className="text-xs text-slate-100 font-extrabold block">{inq.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono">{inq.email} • {inq.phone}</span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono">{inq.date}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed bg-black/10 p-3 rounded-lg border border-white/5 font-sans">{inq.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== NEW REQUIREMENT 3: CLIENTS LIST ===== */}

          {/* BANGLADESHI CLIENTS */}
          {activeTab === "clients_bd" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Bangladeshi Clients Directory</h2>
                  <p className="text-xs text-gray-400">Total BDT projects valuation: <strong className="text-orange-400 font-mono">BDT {clientsBD.reduce((acc, c) => acc + c.value, 0).toLocaleString()}</strong></p>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddBDClient} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2">Add Bangladeshi Client</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={bdForm.name}
                      onChange={(e) => setBdForm({...bdForm, name: e.target.value})}
                      placeholder="e.g. Beximco Textiles"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Business Sector</label>
                    <input
                      type="text"
                      value={bdForm.business}
                      onChange={(e) => setBdForm({...bdForm, business: e.target.value})}
                      placeholder="e.g. Pharmaceutical Logistics"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Division</label>
                      <select
                        value={bdForm.location}
                        onChange={(e) => setBdForm({...bdForm, location: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status</label>
                      <select
                        value={bdForm.status}
                        onChange={(e) => setBdForm({...bdForm, status: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Value (BDT)</label>
                      <input
                        type="number"
                        required
                        value={bdForm.value}
                        onChange={(e) => setBdForm({...bdForm, value: e.target.value})}
                        placeholder="e.g. 150000"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">WhatsApp Phone</label>
                      <input
                        type="text"
                        value={bdForm.phone}
                        onChange={(e) => setBdForm({...bdForm, phone: e.target.value})}
                        placeholder="+88017..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    <span>Insert BD Client</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black pb-2">
                        <th className="py-2">Client Name</th>
                        <th className="py-2">Sector & Location</th>
                        <th className="py-2">Project Valuation</th>
                        <th className="py-2 text-center">Status</th>
                        <th className="py-2 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsBD.map(c => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                          <td className="py-2.5 font-bold text-white block">
                            {c.name}
                            <span className="text-[9px] font-mono text-gray-400 block mt-0.5">{c.phone}</span>
                          </td>
                          <td className="py-2.5">
                            <span className="text-orange-450 font-bold block">{c.business}</span>
                            <span className="text-gray-500 block text-[9.5px] font-mono">{c.location}, BD</span>
                          </td>
                          <td className="py-2.5 font-mono text-slate-100 text-left">
                            <strong>BDT {c.value.toLocaleString()}</strong>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className={`text-[8.5px] font-black px-2 py-0.5 rounded-full border ${
                              c.status === "Active" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" : "bg-gray-550/10 border-gray-550/25 text-gray-400"
                            }`}>{c.status}</span>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteBD(c.id)}
                              className="p-1 text-red-400 hover:text-white hover:bg-red-500/20 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AUSTRALIAN CLIENTS */}
          {activeTab === "clients_au" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Australian Clients Directory</h2>
                <p className="text-xs text-gray-400">Total USD projects evaluation: <strong className="text-orange-400 font-mono">${clientsAU.reduce((acc, c) => acc + c.value, 0).toLocaleString()}</strong></p>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddAUClient} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2">Add Australian Client</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      required
                      value={auForm.name}
                      onChange={(e) => setAuForm({...auForm, name: e.target.value})}
                      placeholder="e.g. Melbourne Coffee Co"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Category Niches</label>
                    <input
                      type="text"
                      value={auForm.business}
                      onChange={(e) => setAuForm({...auForm, business: e.target.value})}
                      placeholder="e.g. Renewable Retailer"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Region</label>
                      <select
                        value={auForm.location}
                        onChange={(e) => setAuForm({...auForm, location: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Sydney">Sydney</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Brisbane">Brisbane</option>
                        <option value="Perth">Perth</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status</label>
                      <select
                        value={auForm.status}
                        onChange={(e) => setAuForm({...auForm, status: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Value (USD)</label>
                      <input
                        type="number"
                        required
                        value={auForm.value}
                        onChange={(e) => setAuForm({...auForm, value: e.target.value})}
                        placeholder="e.g. 4500"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Corporate Email</label>
                      <input
                        type="email"
                        value={auForm.email}
                        onChange={(e) => setAuForm({...auForm, email: e.target.value})}
                        placeholder="billing@brand.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    <span>Insert AU Client</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black pb-2">
                        <th className="py-2">Client Brand</th>
                        <th className="py-2">Category & Location</th>
                        <th className="py-2">Project Valuation</th>
                        <th className="py-2 text-center">Status</th>
                        <th className="py-2 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsAU.map(c => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                          <td className="py-2.5 font-bold text-white">
                            {c.name}
                            <span className="text-[9px] font-mono text-gray-400 block mt-0.5">{c.email}</span>
                          </td>
                          <td className="py-2.5">
                            <span className="text-orange-450 font-bold block">{c.business}</span>
                            <span className="text-gray-500 block text-[9.5px] font-mono">{c.location}, AU</span>
                          </td>
                          <td className="py-2.5 font-mono text-left font-bold text-slate-100">
                            ${c.value.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-center">
                            <span className={`text-[8.5px] font-black px-2 py-0.5 rounded-full border ${
                              c.status === "Active" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" : "bg-gray-550/10 border-gray-550/25 text-gray-400"
                            }`}>{c.status}</span>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteAU(c.id)}
                              className="p-1 text-red-400 hover:text-white hover:bg-red-500/20 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== NEW REQUIREMENT 4: PAYMENT SYSTEM ===== */}

          {/* MONTHLY AD COST */}
          {activeTab === "payment_ad_cost" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Monthly Marketing Spend Logs</h2>
                <p className="text-xs text-gray-400">Total overall managed advertisement costs registered: <strong className="text-orange-400 font-mono">BDT {adCosts.reduce((acc, c) => acc + c.spend, 0).toLocaleString()}</strong></p>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddAdCost} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2">Log Ad Campaign Expense</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Campaign Name</label>
                    <input
                      type="text"
                      required
                      value={adForm.campaignName}
                      onChange={(e) => setAdForm({...adForm, campaignName: e.target.value})}
                      placeholder="e.g. May Lead Gen Revamp"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Ad Network</label>
                      <select
                        value={adForm.platform}
                        onChange={(e) => setAdForm({...adForm, platform: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none font-sans"
                      >
                        <option value="Facebook Ads">Facebook Ads</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="YouTube Ads">YouTube Ads</option>
                        <option value="TikTok Ads">TikTok Ads</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Target Month</label>
                      <input
                        type="month"
                        value={adForm.date}
                        onChange={(e) => setAdForm({...adForm, date: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none font-sans"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Spend (BDT)</label>
                      <input
                        type="number"
                        required
                        value={adForm.spend}
                        onChange={(e) => setAdForm({...adForm, spend: e.target.value})}
                        placeholder="e.g. 15000"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Conversions Recorded</label>
                      <input
                        type="number"
                        value={adForm.conversions}
                        onChange={(e) => setAdForm({...adForm, conversions: e.target.value})}
                        placeholder="e.g. 150"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    <span>Insert Expense Node</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-4">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide">Comparative Campaign ROI Analytics</span>
                  
                  {/* Visual progress comparison bars */}
                  <div className="space-y-3">
                    {adCosts.map(ad => {
                      const maxSpend = Math.max(...adCosts.map(x => x.spend), 1);
                      const pct = Math.min(100, Math.round((ad.spend / maxSpend) * 100));
                      const cpa = ad.conversions > 0 ? Math.round(ad.spend / ad.conversions) : 0;
                      return (
                        <div key={ad.id} className="bg-black/20 p-3 rounded-lg border border-white/5 text-xs">
                          <div className="flex justify-between font-bold text-white mb-1">
                            <span>{ad.campaignName} ({ad.platform})</span>
                            <span className="font-mono">BDT {ad.spend.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-1.5">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                            <span>Month: {ad.date}</span>
                            <span>Target Cost-per-conv (CPA): <strong className="text-[#F7931E]">BDT {cpa}</strong></span>
                            <span>Conversions: {ad.conversions}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MONTHLY SUBSCRIPTION */}
          {activeTab === "payment_subscription" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Active Monthly Retainer Subscriptions</h2>
                <p className="text-xs text-gray-400">Total estimated monthly recurring revenue (MRR): <strong className="text-emerald-400 font-mono">${subscriptions.filter(s => s.status === "Active").reduce((acc, c) => acc + c.amount, 0).toLocaleString()} / Monthly</strong></p>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddSubscription} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2 font-sans">Retainer Contract Setup</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Client Business Name</label>
                    <input
                      type="text"
                      required
                      value={subForm.clientName}
                      onChange={(e) => setSubForm({...subForm, clientName: e.target.value})}
                      placeholder="e.g. Dhaka Food Logistics"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Subscription Contract tier</label>
                    <select
                      value={subForm.plan}
                      onChange={(e) => setSubForm({...subForm, plan: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none font-sans"
                    >
                      <option value="Premium Retainer">Premium Retainer ($800/mo)</option>
                      <option value="SEO & Growth Retainer">SEO & Growth Retainer ($350/mo)</option>
                      <option value="Vite Hosting Cloud SLA">Vite Hosting Cloud SLA ($150/mo)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Monthly Billing ($)</label>
                      <input
                        type="number"
                        required
                        value={subForm.amount}
                        onChange={(e) => setSubForm({...subForm, amount: e.target.value})}
                        placeholder="e.g. 500"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Next Bill Cycle</label>
                      <input
                        type="date"
                        value={subForm.nextBilling}
                        onChange={(e) => setSubForm({...subForm, nextBilling: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center"
                  >
                    <span>Activate Retainer Contract</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black pb-2">
                        <th className="py-2">Client Company</th>
                        <th className="py-2">Contract Support Plan</th>
                        <th className="py-2">Monthly Fee</th>
                        <th className="py-2 font-mono">Next billing Date</th>
                        <th className="py-2 text-center">Toggles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map(s => (
                        <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                          <td className="py-3 font-bold text-white">{s.clientName}</td>
                          <td className="py-3 text-orange-450 font-bold">{s.plan}</td>
                          <td className="py-3 font-mono font-bold text-emerald-400">${s.amount}/mo</td>
                          <td className="py-3 font-mono text-gray-400">{s.nextBilling}</td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => toggleSubStatus(s.id)}
                              className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border cursor-pointer select-none ${
                                s.status === "Active" ? "bg-emerald-500/10 border-emerald-550/30 text-emerald-400" : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                              }`}
                            >
                              {s.status}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* INVOICES */}
          {activeTab === "payment_invoices" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Corporate Invoice Ledger</h2>
                <p className="text-xs text-gray-400">Total overall invoice generation pipeline tracker.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-6">
                <form onSubmit={handleAddInvoice} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2 font-sans">Structured Invoice Generator</span>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">To Client Brand Name</label>
                    <input
                      type="text"
                      required
                      value={invForm.clientName}
                      onChange={(e) => setInvForm({...invForm, clientName: e.target.value})}
                      placeholder="e.g. Chowdhury Tech BD"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Invoice Item Line Description</label>
                    <input
                      type="text"
                      required
                      value={invForm.itemName}
                      onChange={(e) => setInvForm({...invForm, itemName: e.target.value})}
                      placeholder="e.g. Interactive React Dashboard Revamp"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Unit Price ($ or BDT)</label>
                      <input
                        type="number"
                        required
                        value={invForm.price}
                        onChange={(e) => setInvForm({...invForm, price: e.target.value})}
                        placeholder="e.g. 250000"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Quantity</label>
                      <input
                        type="number"
                        required
                        value={invForm.qty}
                        onChange={(e) => setInvForm({...invForm, qty: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Initial Status</label>
                    <select
                      value={invForm.status}
                      onChange={(e) => setInvForm({...invForm, status: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none font-sans"
                    >
                      <option value="Unpaid">Unpaid / Outstanding Balance</option>
                      <option value="Paid">Cleared and Paid</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center font-sans tracking-wide"
                  >
                    <span>Generate Invoice & Recalculate</span>
                  </button>
                </form>

                <div className="lg:col-span-8 bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black pb-2">
                        <th className="py-2">SERIAL NO</th>
                        <th className="py-2">Billed Client Name</th>
                        <th className="py-2 font-mono">Invoice Date</th>
                        <th className="py-2 text-left">Aggregate cost</th>
                        <th className="py-2 text-center">Status</th>
                        <th className="py-2 text-right">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(i => (
                        <tr key={i.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                          <td className="py-3 font-mono font-bold text-[#F7931E]">{i.invoiceNumber}</td>
                          <td className="py-3 font-bold text-white uppercase">{i.clientName}</td>
                          <td className="py-3 font-mono text-gray-400">{i.date}</td>
                          <td className="py-3 font-mono text-left font-black text-slate-100">
                            {typeof i.price === "number" && i.price > 12000 ? `BDT ${i.total?.toLocaleString()}` : `$${i.total?.toLocaleString()}`}
                          </td>
                          <td className="py-3 text-center">
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                              i.status === "Paid" ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" : "bg-red-500/10 border-red-500/25 text-red-500"
                            }`}>{i.status}</span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setSelectedInvoice(i)}
                              className="p-1.5 bg-orange-600/10 hover:bg-orange-650 border border-orange-500/10 text-orange-400 hover:text-white rounded transition-colors cursor-pointer flex items-center justify-center inline-flex"
                              title="Invoice details PDF mockup overlay"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DUE OVERDUE REMINDER CENTER */}
          {activeTab === "payment_due" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Receivables & Outstanding Balances</h2>
                <p className="text-xs text-gray-400">Aging debtors & outstanding invoicing records.</p>
              </div>

              {invoices.filter(i => i.status !== "Paid").length === 0 ? (
                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-10 text-center text-gray-500">
                  <Check className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                  <p className="text-xs font-black uppercase text-gray-400">All invoices fully cleared! Nice work.</p>
                </div>
              ) : (
                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto space-y-4">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2 font-mono">Debtor Registry Index</span>
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-black uppercase pb-2">
                        <th className="py-2">SERIAL NO</th>
                        <th className="py-2">Client Brand</th>
                        <th className="py-2">Owed Balance</th>
                        <th className="py-2 text-center">Overdue Actions</th>
                        <th className="py-2 text-right">Clear Ledger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.status !== "Paid").map(i => (
                        <tr key={i.id} className="border-b border-white/5 hover:bg-white/5 text-gray-250">
                          <td className="py-3 font-mono font-bold text-[#F7931E]">{i.invoiceNumber}</td>
                          <td className="py-3 font-bold text-white uppercase">{i.clientName}</td>
                          <td className="py-3 font-mono text-left font-black text-red-500">
                            {typeof i.price === "number" && i.price > 12000 ? `BDT ${i.total?.toLocaleString()}` : `$${i.total?.toLocaleString()}`}
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => copyReminderToClipboard(i.clientName, i.invoiceNumber, i.total)}
                              className="px-2.5 py-1 text-[8.5px] font-black uppercase rounded-lg bg-orange-600/10 border border-orange-500/20 text-orange-400 hover:bg-orange-600 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1"
                              title="Copy prefiled reminder message"
                            >
                              <Send className="w-3 h-3 text-orange-400" />
                              <span>Copy WhatsApp Reminder</span>
                            </button>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => handleRecordDuePayment(i)}
                              className="px-2.5 py-1 text-[8.5px] font-black uppercase rounded-lg bg-emerald-600/10 border border-emerald-500/15 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                            >
                              Record Clearing
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* PAYMENT HISTORY */}
          {activeTab === "payment_history" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Clearance & Payments Ledger Ledger</h2>
                <p className="text-xs text-gray-400">Comprehensive list of successfully cleared and validated historic transactions.</p>
              </div>

              <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase font-black pb-2">
                      <th className="py-2">TXID Tag</th>
                      <th className="py-2">Invoice No</th>
                      <th className="py-2">Billed Client Name</th>
                      <th className="py-2">Paid Cost Total</th>
                      <th className="py-2 font-mono">Clearing Method</th>
                      <th className="py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map(p => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                        <td className="py-3 font-mono text-gray-500">{p.txid}</td>
                        <td className="py-3 font-mono font-bold text-orange-400">{p.invoiceNumber}</td>
                        <td className="py-3 font-bold text-white uppercase">{p.clientName}</td>
                        <td className="py-3 font-mono font-bold text-emerald-400">
                          {p.amount > 12000 ? `BDT ${p.amount.toLocaleString()}` : `$${p.amount.toLocaleString()}`}
                        </td>
                        <td className="py-3 text-gray-400 font-sans">{p.method}</td>
                        <td className="py-3 text-right">
                          <span className="text-[8.5px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">SUCCESS</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DETAILED CORPORATE INVOICE PRINT-READY MODAL PREVIEW OVERLAY */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[10005] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 w-full max-w-2xl rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden font-sans">
            
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <img
                  src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                  alt="Ezy Logo"
                  className="h-7 w-auto object-contain mb-3"
                />
                <p className="text-[10px] text-gray-400 font-mono">Ezy Digital Hub Corporate Offices</p>
                <p className="text-[10px] text-gray-450 font-mono">Baitul Aman Tower, Link Road, Dhaka, Bangladesh</p>
                <p className="text-[10px] text-gray-450 font-mono">Primary Email: billing@ezydigitalhub.com</p>
              </div>

              <div className="text-right space-y-1">
                <span className="bg-orange-600/20 border border-orange-500/20 text-[#F7931E] text-[10px] font-mono uppercase font-black px-3 py-1 rounded">
                  OFFICIAL INVOICE
                </span>
                <p className="text-xs font-mono font-bold text-white mt-2">No: {selectedInvoice.invoiceNumber}</p>
                <p className="text-[10px] text-gray-400 font-mono">Issued: {selectedInvoice.date}</p>
              </div>
            </div>

            <div className="border-t border-b border-white/10 py-4 grid grid-cols-2 gap-4 text-xs font-mono text-gray-300">
              <div>
                <span className="text-[9px] text-[#F7931E] uppercase font-bold block mb-1">Invoice Prepared For:</span>
                <strong className="text-white uppercase block text-sm">{selectedInvoice.clientName}</strong>
                <span>Verified client network partner</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#F7931E] uppercase font-bold block mb-1">Terms & Status:</span>
                <p className="text-xs">NET-15 days grace cycle</p>
                <span className={`inline-block font-bold mt-1 text-[9px] px-2 py-0.5 rounded border ${
                  selectedInvoice.status === "Paid" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}>{selectedInvoice.status}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] text-gray-400 uppercase font-black block tracking-wider">Item Breakdown Ledger</span>
              <div className="bg-black/35 rounded-xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-12 bg-white/5 p-2 font-mono text-[10px] text-gray-300 font-bold uppercase">
                  <div className="col-span-6">Services description line item</div>
                  <div className="col-span-2 text-center">Unit cost</div>
                  <div className="col-span-1 text-center">Qty</div>
                  <div className="col-span-3 text-right">Sum</div>
                </div>

                <div className="grid grid-cols-12 p-3 font-mono text-xs text-gray-205 border-b border-white/5">
                  <div className="col-span-6 font-sans text-white">{selectedInvoice.itemName}</div>
                  <div className="col-span-2 text-center">
                    {selectedInvoice.price > 12000 ? `${selectedInvoice.price.toLocaleString()}` : `$${selectedInvoice.price}`}
                  </div>
                  <div className="col-span-1 text-center font-bold">{selectedInvoice.qty}</div>
                  <div className="col-span-3 text-right font-black text-white">
                    {selectedInvoice.price > 12000 ? `${(selectedInvoice.price * selectedInvoice.qty).toLocaleString()}` : `$${selectedInvoice.price * selectedInvoice.qty}`}
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 font-mono text-xs space-y-1 text-gray-400">
                  <div className="flex justify-between">
                    <span>Aggregate Subtotal:</span>
                    <span className="text-white">
                      {selectedInvoice.price > 12000 ? `BDT ${(selectedInvoice.price * selectedInvoice.qty).toLocaleString()}` : `$${selectedInvoice.price * selectedInvoice.qty}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corporate TAX/VAT index (5.00%):</span>
                    <span className="text-white">
                      {selectedInvoice.price > 12000 ? `BDT ${Math.round(selectedInvoice.price * selectedInvoice.qty * 0.05).toLocaleString()}` : `$${Math.round(selectedInvoice.price * selectedInvoice.qty * 0.05)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-black text-sm">
                    <span className="text-orange-400">NET GRAND TOTAL:</span>
                    <span className="text-[#F7931E]">
                      {selectedInvoice.price > 12000 ? `BDT ${selectedInvoice.total?.toLocaleString()}` : `$${selectedInvoice.total}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10 text-[9.5px] text-gray-500 font-mono leading-relaxed">
              <span>* Generated automatically via Ezy Digital Sandbox CRM. Approved signature not requested.</span>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl text-xs font-black uppercase cursor-pointer transition-colors"
              >
                Close Invoice View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
