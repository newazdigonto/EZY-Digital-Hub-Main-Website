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
  PlusCircle,
  Printer,
  Filter,
  Upload,
  Search,
  Image as ImageIcon,
  FileSpreadsheet,
  RefreshCw,
  CheckSquare
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
    payment: true,
    admin_costing_menu: true
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

  // Administrative Costing Store
  const [adminCosts, setAdminCosts] = useState<any[]>([]);

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

  // Administrative Costing Form state
  const [costForm, setCostForm] = useState({
    category: "Office rent",
    description: "",
    amount: "",
    date: new Date().toISOString().substring(0, 10),
    resourcePerson: "",
    shopName: "",
    invoiceDate: new Date().toISOString().substring(0, 10),
    invoiceNumber: "",
    invoicePhoto: ""
  });

  // Cost Filtering state
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterDay, setFilterDay] = useState("");

  // Printable aggregate costs trigger
  const [printCostReport, setPrintCostReport] = useState<boolean>(false);

  // Invoice Audit Search or categorisation parameters
  const [auditSearch, setAuditSearch] = useState("");
  const [auditStatusFilter, setAuditStatusFilter] = useState("All");
  const [auditCategoryFilter, setAuditCategoryFilter] = useState("All");

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

    // Load initial administrative costing database
    const savedAdminCosts = localStorage.getItem("ezydigital_admin_costs");
    if (savedAdminCosts) {
      setAdminCosts(JSON.parse(savedAdminCosts));
    } else {
      const initialCosts = [
        { id: "ac_1", category: "Office rent", description: "Baitul Aman Tower Rent - February 2026", amount: 35000, date: "2026-02-01", resourcePerson: "Md. Newaz", shopName: "Tower Management Ltd", invoiceDate: "2026-02-01", invoiceNumber: "BAT-99018", invoicePhoto: "" },
        { id: "ac_2", category: "Hardware buy", description: "Mechanical Keyboard buy for developer", amount: 4500, date: "2026-02-12", resourcePerson: "Sadman Sakib", shopName: "Ryans Computers", invoiceDate: "2026-02-12", invoiceNumber: "RY-7721", invoicePhoto: "" },
        { id: "ac_3", category: "Mouse buy", description: "Logitech MX Master mouse for editor", amount: 9500, date: "2026-02-18", resourcePerson: "Amina Rahman", shopName: "Star Tech BD", invoiceDate: "2026-02-18", invoiceNumber: "ST-88122", invoicePhoto: "" },
        { id: "ac_4", category: "Office rent", description: "Baitul Aman Tower Rent - May 2026", amount: 35000, date: "2026-05-01", resourcePerson: "Md. Newaz", shopName: "Tower Management Ltd", invoiceDate: "2026-05-01", invoiceNumber: "BAT-99020", invoicePhoto: "" }
      ];
      localStorage.setItem("ezydigital_admin_costs", JSON.stringify(initialCosts));
      setAdminCosts(initialCosts);
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

  // ADMINISTRATIVE COSTING HANDLERS
  const handleAddAdminCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!costForm.description || !costForm.amount) {
      alert("Please fill out Description and Amount fields.");
      return;
    }
    const newCost = {
      id: "ac_" + Date.now(),
      category: costForm.category,
      description: costForm.description,
      amount: Number(costForm.amount) || 0,
      date: costForm.date,
      resourcePerson: costForm.resourcePerson || "N/A",
      shopName: costForm.shopName || "N/A",
      invoiceDate: costForm.invoiceDate || costForm.date,
      invoiceNumber: costForm.invoiceNumber || "N/A",
      invoicePhoto: costForm.invoicePhoto || ""
    };
    const updated = [newCost, ...adminCosts];
    setAdminCosts(updated);
    syncStore("ezydigital_admin_costs", updated);

    // Reset Form
    setCostForm({
      category: "Office rent",
      description: "",
      amount: "",
      date: new Date().toISOString().substring(0, 10),
      resourcePerson: "",
      shopName: "",
      invoiceDate: new Date().toISOString().substring(0, 10),
      invoiceNumber: "",
      invoicePhoto: ""
    });
    triggerToast("Administrative cost recorded successfully!");
  };

  const handleDeleteAdminCost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this administrative cost?")) {
      const updated = adminCosts.filter(c => c.id !== id);
      setAdminCosts(updated);
      syncStore("ezydigital_admin_costs", updated);
      triggerToast("Administrative cost deleted successfully!");
    }
  };

  // INVOICE AUDIT STATUS TOGGLER
  const toggleInvoiceAuditStatus = (id: string) => {
    const updated = invoices.map(i => {
      if (i.id === id) {
        const nextStatus = i.status === "Paid" ? "Unpaid" : "Paid";
        
        // Update payment history if transitioning to Paid, or filter out if transitioning to Unpaid
        if (nextStatus === "Paid") {
          const newPay = {
            id: "pay_" + Date.now(),
            invoiceNumber: i.invoiceNumber,
            clientName: i.clientName,
            amount: i.total,
            method: "Audit Ledger Clearing",
            date: new Date().toISOString().substring(0, 10),
            status: "Success",
            txid: "AUD_" + Math.floor(10000 + Math.random() * 90000)
          };
          const updatedHistory = [newPay, ...paymentHistory];
          setPaymentHistory(updatedHistory);
          syncStore("ezydigital_history", updatedHistory);
        } else {
          // Remove from history
          const updatedHistory = paymentHistory.filter(pay => pay.invoiceNumber !== i.invoiceNumber);
          setPaymentHistory(updatedHistory);
          syncStore("ezydigital_history", updatedHistory);
        }
        
        return { ...i, status: nextStatus };
      }
      return i;
    });
    setInvoices(updated);
    syncStore("ezydigital_invoices", updated);
    triggerToast("Invoice status audited & synchronized!");
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
              <p className="text-[10px] font-black tracking-widest text-[#F7931E] uppercase px-3 mb-1 font-mono">User Deck</p>
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
              <span>WEBSITE EDIT CONTENT</span>
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
              <span>CLIENTS LIST</span>
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
              <span>PAYMENT SYSTEM</span>
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
                <button
                  onClick={() => setActiveTab("payment_audit")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "payment_audit" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
                  <span>Invoice Audit</span>
                </button>
              </div>
            )}
          </div>

          {/* MENU: ADMINISTRATIVE COSTING */}
          <div className="space-y-1">
            <button
              onClick={() => toggleMenu("admin_costing_menu")}
              className="w-full text-left py-1 px-3 text-[10px] font-black tracking-widest text-[#F7931E] uppercase flex items-center justify-between cursor-pointer"
            >
              <span>ADMINISTRATIVE COSTING</span>
              {openMenus.admin_costing_menu ? <ChevronDown className="w-3 h-3 text-orange-450" /> : <ChevronRight className="w-3 h-3 text-orange-450" />}
            </button>

            {openMenus.admin_costing_menu && (
              <div className="pl-3 space-y-0.5 border-l border-white/5 ml-3 font-sans">
                <button
                  onClick={() => setActiveTab("admin_costing")}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "admin_costing" ? "bg-orange-600/20 text-[#F7931E] font-black border border-orange-500/30" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Manage Costing</span>
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

          {/* ADMINISTRATIVE COSTING STATE PANEL */}
          {activeTab === "admin_costing" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Administrative Costing Control</h2>
                  <p className="text-xs text-gray-400">Manage internal operation expenditures, purchase history of assets, and invoice attachments.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPrintCostReport(true);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Generate Cost Statement (Print)</span>
                  </button>
                </div>
              </div>

              {/* QUICK NUMERICAL SUMMARY INDEX CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Cumulative Spent</span>
                  <div className="text-2xl font-black text-rose-400">
                    BDT {adminCosts.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-gray-500">Includes all historic recorded cost groups</p>
                </div>

                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">February Expense Group</span>
                  <div className="text-2xl font-black text-white">
                    BDT {adminCosts.filter(c => c.date.startsWith("2026-02")).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-gray-500">Specific standard query targeting Feb 2026</p>
                </div>

                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Month (May 2026)</span>
                  <div className="text-2xl font-black text-emerald-400">
                    BDT {adminCosts.filter(c => c.date.startsWith("2026-05")).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-gray-500">Live operational expenditures</p>
                </div>

                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uploaded Receipts</span>
                  <div className="text-2xl font-black text-orange-400">
                    {adminCosts.filter(c => c.invoicePhoto).length} / {adminCosts.length}
                  </div>
                  <p className="text-[10px] text-gray-500">Costs with verified paper trials</p>
                </div>
              </div>

              {/* CORE SCREEN INTERACTIVES */}
              <div className="grid lg:grid-cols-12 gap-6">
                
                {/* 1. UPLOADER & RECIEPTION ADD FORM */}
                <form onSubmit={handleAddAdminCost} className="lg:col-span-4 bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-3.5 h-fit">
                  <span className="text-xs font-black uppercase text-orange-400 block tracking-wide border-b border-white/5 pb-2 font-mono">Record Administrative Spent</span>
                  
                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Expense Category</label>
                    <select
                      value={costForm.category}
                      onChange={(e) => setCostForm({...costForm, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
                    >
                      <option value="Office rent">Office rent</option>
                      <option value="Mouse buy">Mouse buy</option>
                      <option value="Keyboard buy">Keyboard buy</option>
                      <option value="Hardware buy">Hardware buy</option>
                      <option value="Utility bills">Utility bills</option>
                      <option value="Software subscription">Software subscription</option>
                      <option value="Marketing campaign">Marketing campaign</option>
                      <option value="Consultancy cost">Consultancy cost</option>
                      <option value="Others">Others / Miscellaneous</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Cost Line Description</label>
                    <input
                      type="text"
                      required
                      value={costForm.description}
                      onChange={(e) => setCostForm({...costForm, description: e.target.value})}
                      placeholder="e.g. Mechanical Red Switch Keyboard Buy"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Spent Amount (BDT)</label>
                      <input
                        type="number"
                        required
                        value={costForm.amount}
                        onChange={(e) => setCostForm({...costForm, amount: e.target.value})}
                        placeholder="e.g. 4550"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Date of spent</label>
                      <input
                        type="date"
                        value={costForm.date}
                        onChange={(e) => setCostForm({...costForm, date: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Resource Person Name</label>
                      <input
                        type="text"
                        value={costForm.resourcePerson}
                        onChange={(e) => setCostForm({...costForm, resourcePerson: e.target.value})}
                        placeholder="e.g. Md. Newaz"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 font-sans">Shop / Vendor Name</label>
                      <input
                        type="text"
                        value={costForm.shopName}
                        onChange={(e) => setCostForm({...costForm, shopName: e.target.value})}
                        placeholder="e.g. Ryans Computers"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 font-sans">Vendor Invoice Date</label>
                      <input
                        type="date"
                        value={costForm.invoiceDate}
                        onChange={(e) => setCostForm({...costForm, invoiceDate: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Invoice Number</label>
                      <input
                        type="text"
                        value={costForm.invoiceNumber}
                        onChange={(e) => setCostForm({...costForm, invoiceNumber: e.target.value})}
                        placeholder="e.g. RY-98122"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Store / Upload Invoice Receipt Photo</label>
                    <div className="mt-1 flex items-center justify-center border-2 border-dashed border-white/10 hover:border-orange-500/50 rounded-xl p-4 transition-all bg-black/20 text-center relative cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCostForm(prev => ({ ...prev, invoicePhoto: reader.result as string }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <div className="space-y-1 text-gray-400 pointer-events-none">
                        <Upload className="w-5 h-5 mx-auto text-gray-500" />
                        <p className="text-[10px] font-bold">Upload cost receipt image</p>
                        <p className="text-[8px] text-gray-500">Supports JPG, PNG with client local base64 storage</p>
                      </div>
                    </div>
                    
                    {costForm.invoicePhoto && (
                      <div className="mt-2.5 p-2 bg-black/40 rounded-lg flex items-center justify-between gap-2 border border-orange-500/20">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <ImageIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-[9px] text-gray-300 truncate font-mono">Receipt encoded (Base64)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCostForm(prev => ({ ...prev, invoicePhoto: "" }))}
                          className="text-[9px] text-red-400 hover:text-red-300 underline"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-[10px] uppercase py-2.5 rounded-xl transition-all cursor-pointer text-center tracking-wide"
                  >
                    Save Operational Cost record
                  </button>
                </form>

                {/* 2. LEDGER GRID WITH INTERACTIVE FILTERS */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {/* SEARCH FILTERS HEADERS */}
                  <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Category filter */}
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Categorise on Spending</label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none"
                      >
                        <option value="All">All Cost Categories</option>
                        <option value="Office rent">Office rent</option>
                        <option value="Mouse buy">Mouse buy</option>
                        <option value="Keyboard buy">Keyboard buy</option>
                        <option value="Hardware buy">Hardware buy</option>
                        <option value="Utility bills">Utility bills</option>
                        <option value="Software subscription">Software subscription</option>
                        <option value="Marketing campaign">Marketing campaign</option>
                        <option value="Consultancy cost">Consultancy cost</option>
                        <option value="Others">Others / Miscellaneous</option>
                      </select>
                    </div>

                    {/* Month by month filter */}
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Filter Month by Month</label>
                      <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
                      >
                        <option value="All">All Months (Show all cost)</option>
                        {Array.from(new Set(adminCosts.map(c => c.date.substring(0, 7)))).sort().reverse().map((m: any) => {
                          const [year, month] = m.split("-");
                          const dateObj = new Date(Number(year), Number(month) - 1, 1);
                          const formattedMonth = dateObj.toLocaleString("en-US", { month: "long", year: "numeric" });
                          return <option key={m} value={m}>{formattedMonth}</option>;
                        })}
                      </select>
                    </div>

                    {/* Day by day filter */}
                    <div>
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Filter Day by Day</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={filterDay}
                          onChange={(e) => setFilterDay(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none"
                        />
                        {filterDay && (
                          <button
                            onClick={() => setFilterDay("")}
                            className="absolute right-2.5 top-2 text-[10px] text-gray-400 hover:text-white underline font-bold"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* RESULTS TABLE */}
                  <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 overflow-x-auto">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                      <span className="text-xs font-black uppercase text-orange-400 tracking-wide">Expense Ledger Matrix</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        Filtered Results: <strong className="text-white">{
                          adminCosts.filter(c => {
                            const matchCategory = filterCategory === "All" || c.category === filterCategory;
                            const matchMonth = filterMonth === "All" || c.date.substring(0, 7) === filterMonth;
                            const matchDay = !filterDay || c.date === filterDay;
                            return matchCategory && matchMonth && matchDay;
                          }).length
                        }</strong> records
                      </span>
                    </div>

                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400 uppercase font-black tracking-wider pb-2">
                          <th className="py-2.5">Date</th>
                          <th className="py-2.5">Category</th>
                          <th className="py-2.5">Description</th>
                          <th className="py-2.5">Resource Person</th>
                          <th className="py-2.5 text-right font-mono">Amount (BDT)</th>
                          <th className="py-2.5 text-center">Receipt</th>
                          <th className="py-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminCosts.filter(c => {
                          const matchCategory = filterCategory === "All" || c.category === filterCategory;
                          const matchMonth = filterMonth === "All" || c.date.substring(0, 7) === filterMonth;
                          const matchDay = !filterDay || c.date === filterDay;
                          return matchCategory && matchMonth && matchDay;
                        }).length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-500 italic">
                              No expense entries matched the defined filter parameters.
                            </td>
                          </tr>
                        ) : (
                          adminCosts.filter(c => {
                            const matchCategory = filterCategory === "All" || c.category === filterCategory;
                            const matchMonth = filterMonth === "All" || c.date.substring(0, 7) === filterMonth;
                            const matchDay = !filterDay || c.date === filterDay;
                            return matchCategory && matchMonth && matchDay;
                          }).map(c => (
                            <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                              <td className="py-3 font-mono text-gray-400">{c.date}</td>
                              <td className="py-3 font-bold">
                                <span className="bg-orange-500/10 text-[#F7931E] text-[10px] px-2 py-0.5 rounded border border-orange-500/10 whitespace-nowrap">
                                  {c.category}
                                </span>
                              </td>
                              <td className="py-3 font-sans">
                                <div className="font-semibold text-white">{c.description}</div>
                                <div className="text-[10px] text-gray-500 font-mono">Vendor: {c.shopName} | INV: {c.invoiceNumber}</div>
                              </td>
                              <td className="py-3 text-slate-100">{c.resourcePerson}</td>
                              <td className="py-3 text-right font-mono font-bold text-rose-450">
                                BDT {c.amount.toLocaleString()}
                              </td>
                              <td className="py-3 text-center">
                                {c.invoicePhoto ? (
                                  <button
                                    onClick={() => {
                                      // Popup receipt photo
                                      setSelectedInvoice({
                                        invoiceNumber: c.invoiceNumber,
                                        clientName: "ADMINISTRATIVE RECONCILIATION",
                                        itemName: `${c.category}: ${c.description} by ${c.resourcePerson}`,
                                        price: c.amount,
                                        qty: 1,
                                        total: c.amount,
                                        date: c.date,
                                        status: "Paid",
                                        isCostAttachment: true,
                                        photo: c.invoicePhoto
                                      });
                                    }}
                                    className="p-1 hover:text-[#F7931E] hover:bg-white/5 rounded transition-colors inline-flex cursor-pointer"
                                    title="View receipt attachment photo"
                                  >
                                    <ImageIcon className="w-4 h-4 text-emerald-400 mx-auto animate-pulse" />
                                  </button>
                                ) : (
                                  <span className="text-gray-650 text-[10px]">-</span>
                                )}
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => handleDeleteAdminCost(c.id)}
                                  className="p-1 hover:bg-red-500/25 text-red-400 rounded transition-colors cursor-pointer inline-flex"
                                  title="Delete expense item statement"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* INVOICE AUDIT CONTROL CENTER */}
          {activeTab === "payment_audit" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white mb-1">Financial Invoice Auditing Suite</h2>
                <p className="text-xs text-gray-400">Validate company balances, modify receivables statuses, and execute rigorous tax audits.</p>
              </div>

              {/* HIGH LEVEL AUDIT STATS LEDGER */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aggregate Outstanding Receivables (DUE)</span>
                  <div className="text-3xl font-black text-rose-500 font-mono">
                    BDT {invoices.filter(i => i.status !== "Paid").reduce((acc, curr) => acc + (curr.total || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-gray-400 font-sans">
                    Across {invoices.filter(i => i.status !== "Paid").length} outstanding client accounts
                  </p>
                </div>

                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-[#F7931E]">Aggregate Collected Capital (PAID)</span>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    BDT {invoices.filter(i => i.status === "Paid").reduce((acc, curr) => acc + (curr.total || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Across {invoices.filter(i => i.status === "Paid").length} successfully audited billing entries
                  </p>
                </div>

                <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Financial Auditor Verification Ratio</span>
                  <div className="text-3xl font-black text-white font-mono">
                    {Math.round((invoices.filter(i => i.status === "Paid").length / (invoices.length || 1)) * 100)}%
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Audit compliance targets: 100% clearing status
                  </p>
                </div>
              </div>

              {/* AUDIT MATRIX GRID TABLE */}
              <div className="bg-[#091a38] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <span className="text-xs font-black uppercase text-orange-400 tracking-wide font-mono">Interactive Ledger Verification Panel</span>
                  
                  {/* Ledger Filters */}
                  <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search Client Name..."
                        value={auditSearch}
                        onChange={(e) => setAuditSearch(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none w-full md:w-48 placeholder-gray-500"
                      />
                    </div>

                    <select
                      value={auditStatusFilter}
                      onChange={(e) => setAuditStatusFilter(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl p-1.5 text-xs text-white focus:outline-none"
                    >
                      <option value="All">All statuses (Paid / Due)</option>
                      <option value="Paid">Marked Paid</option>
                      <option value="Unpaid">Marked Due</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase font-black tracking-wider pb-2">
                        <th className="py-3">Invoice Number</th>
                        <th className="py-3">Billed Client Brand</th>
                        <th className="py-3 font-mono text-center">Invoiced Date</th>
                        <th className="py-3">Line item descriptions</th>
                        <th className="py-3 text-right">Sum total</th>
                        <th className="py-3 text-center">Ledger status</th>
                        <th className="py-3 text-center">Verify Toggle</th>
                        <th className="py-3 text-right">Preview A4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => {
                        const matchSearch = i.clientName.toLowerCase().includes(auditSearch.toLowerCase());
                        const matchStatus = auditStatusFilter === "All" || (auditStatusFilter === "Paid" ? i.status === "Paid" : i.status !== "Paid");
                        return matchSearch && matchStatus;
                      }).length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-10 text-gray-500 italic">No invoice audit items correspond with current query parameters.</td>
                        </tr>
                      ) : (
                        invoices.filter(i => {
                          const matchSearch = i.clientName.toLowerCase().includes(auditSearch.toLowerCase());
                          const matchStatus = auditStatusFilter === "All" || (auditStatusFilter === "Paid" ? i.status === "Paid" : i.status !== "Paid");
                          return matchSearch && matchStatus;
                        }).map(i => (
                          <tr key={i.id} className="border-b border-white/5 hover:bg-white/5 text-gray-300">
                            <td className="py-3.5 font-mono font-bold text-[#F7931E]">{i.invoiceNumber}</td>
                            <td className="py-3.5 font-bold uppercase text-white">{i.clientName}</td>
                            <td className="py-3.5 font-mono text-gray-400 text-center">{i.date}</td>
                            <td className="py-3.5 font-sans truncate max-w-[200px]" title={i.itemName}>{i.itemName}</td>
                            <td className="py-3.5 text-right font-mono font-black text-slate-100">
                              {i.price > 12000 ? `BDT ${i.total?.toLocaleString()}` : `$${i.total?.toLocaleString()}`}
                            </td>
                            <td className="py-3.5 text-center">
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                                i.status === "Paid" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-500"
                              }`}>{i.status === "Paid" ? "AUDIT PASSED" : "PENDING CLEARANCE"}</span>
                            </td>
                            <td className="py-3.5 text-center">
                              <button
                                onClick={() => toggleInvoiceAuditStatus(i.id)}
                                className={`px-2.5 py-1 text-[8px] font-black uppercase rounded-lg border transition-all cursor-pointer inline-flex items-center gap-1 ${
                                  i.status === "Paid" ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-650 hover:text-white" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                                }`}
                              >
                                {i.status === "Paid" ? "Revert to Due" : "Clear as Paid"}
                              </button>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => setSelectedInvoice(i)}
                                className="p-1.5 bg-orange-600/10 hover:bg-orange-650 border border-orange-500/10 text-orange-400 hover:text-white rounded transition-colors cursor-pointer flex items-center justify-center inline-flex"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DETAILED CORPORATE INVOICE PRINT-READY MODAL PREVIEW OVERLAY */}
      {selectedInvoice && (
        <div id="print-zone" className="fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4 md:p-8">
          
          {/* Custom style injection for print commands */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              #printable-a4-invoice, #printable-a4-invoice * {
                visibility: visible !important;
              }
              #printable-a4-invoice {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                border: none !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 1.5cm !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}} />

          <div className="w-full max-w-4xl space-y-4 my-auto relative">
            
            {/* Header Control Panel (Not Printed) */}
            <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-2 no-print">
              <div className="flex items-center gap-2">
                <FileText className="text-orange-400 w-5 h-5" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">A4 Corporate Invoice Preview (White Page Standard)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Execute Browser Print (PDF)</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </div>

            {/* A4 PAPER CONTAINER */}
            <div
              id="printable-a4-invoice"
              className="w-full max-w-[21cm] min-h-[29.7cm] mx-auto bg-white text-slate-800 border border-slate-300 p-12 md:p-16 relative shadow-2xl flex flex-col justify-between font-sans overflow-hidden aspect-[1/1.414]"
            >
              
              {/* BRAND WATERMARK IN BG */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 select-none opacity-[0.06] rotate-[-25deg]">
                <img
                  src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                  alt="Watermark Brand Logo"
                  className="w-[11cm] aspect-auto object-contain"
                />
              </div>

              {/* INVOICE CONTENT REGION */}
              <div className="relative z-10 space-y-10 flex-1 flex flex-col justify-between">
                
                {/* Upper Letterhead section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5 text-left">
                      <img
                        src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                        alt="Ezy Logo"
                        className="h-10 w-auto object-contain mb-3"
                      />
                      <h4 className="text-stone-900 font-extrabold text-sm uppercase tracking-wide">Ezy Digital Hub Ltd.</h4>
                      <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-sm">
                        Baitul Aman Tower, Level 9, Link Road,<br />
                        Kuratoli Road, Dhaka, Bangladesh<br />
                        Tax Registration Reg: BD-9281-2026<br />
                        Support: billing@ezydigitalhub.com
                      </p>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="inline-block bg-orange-600 text-white font-sans text-xs uppercase font-black px-4 py-1.5 rounded shadow-sm">
                        OFFICIAL INVOICE
                      </div>
                      <p className="text-sm font-mono font-black text-slate-900 mt-2">No: {selectedInvoice.invoiceNumber}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Date Issued: {selectedInvoice.date}</p>
                      <div className="mt-2.5">
                        <span className={`inline-block font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded border ${
                          selectedInvoice.status === "Paid" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-red-50 border-red-300 text-red-700"
                        }`}>
                          {selectedInvoice.status === "Paid" ? "Cleared & Paid" : "PENDING CLEARANCE"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bill to divider */}
                  <div className="border-t border-b border-orange-500/10 py-5 grid grid-cols-2 gap-4 text-xs font-sans text-slate-700 font-medium">
                    <div>
                      <span className="text-[9px] text-[#F7931E] uppercase font-black tracking-widest block mb-1">INVOICE PREPARED FOR:</span>
                      <strong className="text-slate-900 uppercase block text-sm font-black mb-0.5">{selectedInvoice.clientName}</strong>
                      <p className="text-gray-400 leading-normal font-sans">
                        Authorized Global Network Partner<br />
                        Accounts clearance tier-1 status
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-[#F7931E] uppercase font-black tracking-widest block mb-1">PAYMENT TERMS:</span>
                      <p className="text-slate-950 font-bold text-xs font-sans">Standard NET-15 Cycle</p>
                      <p className="text-gray-400 leading-normal mt-0.5">
                        Please deliver clearing bank transfer or bKash merchant payload within the stated schedule.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Line Item Table */}
                <div className="flex-1 space-y-4 pt-4">
                  <span className="text-[10px] text-[#555] font-black uppercase tracking-widest block">SERVICES BREAKDOWN LEDGER</span>
                  
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="grid grid-cols-12 bg-slate-100 p-3 font-sans text-[10px] text-slate-700 font-black uppercase tracking-wider border-b border-slate-200">
                      <div className="col-span-6">Specified service segment</div>
                      <div className="col-span-2 text-center">Unit Price</div>
                      <div className="col-span-1 text-center">Qty</div>
                      <div className="col-span-3 text-right">Sum Subtotal</div>
                    </div>

                    {/* Row item */}
                    <div className="grid grid-cols-12 p-4 font-sans text-xs text-slate-800 border-b border-slate-200 leading-relaxed font-semibold">
                      <div className="col-span-6 font-bold text-slate-900 text-left">
                        {selectedInvoice.itemName}
                        {selectedInvoice.isCostAttachment && (
                          <span className="block text-[10px] text-stone-500 mt-1 italic font-normal">Administrative reconciliation review entry</span>
                        )}
                      </div>
                      <div className="col-span-2 text-center font-mono">
                        {selectedInvoice.price > 12000 ? `BDT ${selectedInvoice.price.toLocaleString()}` : `$${selectedInvoice.price}`}
                      </div>
                      <div className="col-span-1 text-center font-bold text-slate-900">{selectedInvoice.qty}</div>
                      <div className="col-span-3 text-right font-mono font-extrabold text-slate-950">
                        {selectedInvoice.price > 12000 ? `BDT ${(selectedInvoice.price * selectedInvoice.qty).toLocaleString()}` : `$${selectedInvoice.price * selectedInvoice.qty}`}
                      </div>
                    </div>

                    {/* Financial summary tags */}
                    <div className="p-4 bg-slate-50 font-sans text-xs space-y-2 text-slate-600 border-t border-slate-150">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-500">Service Line Items Subtotal:</span>
                        <span className="font-mono text-slate-900 font-bold">
                          {selectedInvoice.price > 12000 ? `BDT ${(selectedInvoice.price * selectedInvoice.qty).toLocaleString()}` : `$${selectedInvoice.price * selectedInvoice.qty}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-500">Corporate TAX/VAT index (5.00%):</span>
                        <span className="font-mono text-slate-900 font-bold">
                          {selectedInvoice.price > 12000 ? `BDT ${Math.round(selectedInvoice.price * selectedInvoice.qty * 0.05).toLocaleString()}` : `$${Math.round(selectedInvoice.price * selectedInvoice.qty * 0.05)}`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between border-t border-dashed border-slate-300 pt-3.5 font-sans">
                        <span className="text-[#F7931E] font-black text-[13px] tracking-wide uppercase">NET COMPLIANT GRAND TOTAL:</span>
                        <span className="font-mono text-[16px] text-[#F7931E] font-black">
                          {selectedInvoice.price > 12000 ? `BDT ${selectedInvoice.total?.toLocaleString()}` : `$${selectedInvoice.total}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Display embedded receipt photo if exists! */}
                  {selectedInvoice.photo && (
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 no-print">
                      <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block">EMBEDDED COSTING RECEIPT PREVIEW (LOCAL RETRIEVAL)</span>
                      <div className="flex items-center justify-center bg-stone-100 rounded-lg p-2.5 max-h-[300px] overflow-hidden">
                        <img
                          src={selectedInvoice.photo}
                          alt="Cost physical proof"
                          className="max-h-[280px] w-auto object-contain rounded-md"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom letterhead footer address details */}
                <div className="border-t border-slate-200 pt-8 flex justify-between items-end">
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-sans text-slate-400 leading-normal">
                      * This document is generated live from the Ezy Digital Hub financial ledgers.<br />
                      Validating secure signature not required. All records are reconciled & cataloged.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-sans text-slate-500 font-black uppercase tracking-wider font-bold">PREPARED BY:</p>
                    <div className="h-0.5 w-24 bg-slate-350 my-1 ml-auto"></div>
                    <p className="text-[10px] text-orange-600 font-black uppercase font-mono tracking-widest">EZY FINANCE PORTAL</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* DETAILED ADMINISTRATIVE COSTING MONTHLY REPORT PRINT-READY OVERLAY */}
      {printCostReport && (
        <div id="print-zone-report" className="fixed inset-0 z-[10005] bg-slate-900/95 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4 md:p-8">
          
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              #printable-a4-report, #printable-a4-report * {
                visibility: visible !important;
              }
              #printable-a4-report {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                border: none !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 1.5cm !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}} />

          <div className="w-full max-w-4xl space-y-4 my-auto relative">
            
            {/* Control Panel (Not Printed) */}
            <div className="bg-[#091a38] border border-white/10 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-2 no-print">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-teal-400 w-5 h-5 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Cost Reconciliation Statement Printable Generator</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Target Month Filter:</span>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="bg-black/65 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="All">All recorded Expenditures</option>
                  {Array.from(new Set(adminCosts.map(c => c.date.substring(0, 7)))).sort().reverse().map((m: any) => {
                    const [year, month] = m.split("-");
                    const dateObj = new Date(Number(year), Number(month) - 1, 1);
                    const formattedMonth = dateObj.toLocaleString("en-US", { month: "long", year: "numeric" });
                    return <option key={m} value={m}>{formattedMonth}</option>;
                  })}
                </select>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Execute Print</span>
                </button>
                <button
                  onClick={() => setPrintCostReport(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* A4 REPORT CONTAINER */}
            <div
              id="printable-a4-report"
              className="w-full max-w-[21cm] min-h-[29.7cm] mx-auto bg-white text-slate-800 border border-slate-300 p-12 md:p-16 relative shadow-2xl flex flex-col justify-between font-sans overflow-hidden"
            >
              
              {/* CENTERED WATERMARK */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 select-none opacity-[0.05] rotate-[-25deg]">
                <img
                  src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                  alt="Watermark brand"
                  className="w-[12cm] aspect-auto object-contain"
                />
              </div>

              {/* REPORT CARD */}
              <div className="relative z-10 space-y-10 flex-grow flex flex-col justify-between">
                
                {/* Header letterhead detail */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <img
                      src="https://ezydigitalhub.com/wp-content/uploads/2026/04/Logo-1-1.webp"
                      alt="Watermark"
                      className="h-9 w-auto object-contain mb-2"
                    />
                    <h3 className="text-stone-900 font-extrabold text-xs uppercase tracking-widest">EZY DIGITAL HUB LIMITED</h3>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">
                      Administrative Costing Reconciliation Center<br />
                      Baitul Aman Tower, Dhaka, Bangladesh | finance@ezydigitalhub.com
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded">
                      COST AUDIT STATEMENT
                    </span>
                    <p className="text-[11px] font-mono font-bold text-slate-900 mt-2">
                      Statement Month: <strong className="text-[#F7931E] uppercase">{filterMonth === "All" ? "ALL HISTORY" : filterMonth}</strong>
                    </p>
                    <p className="text-[9px] font-mono text-slate-500 font-sans">Report Compiled: {new Date().toISOString().substring(0, 10)}</p>
                  </div>
                </div>

                {/* Ledger Listing */}
                <div className="flex-grow space-y-4">
                  <div className="border-b border-slate-300 pb-2">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block">ADMIN OPERATING EXPENDITURE REGISTRY INDEX</span>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Columns header */}
                    <div className="grid grid-cols-12 bg-slate-100 p-2 text-[9px] text-slate-700 font-black uppercase tracking-wider border-b border-slate-200">
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Spent Tag</div>
                      <div className="col-span-4">Spent line descriptions</div>
                      <div className="col-span-2">Resource Person</div>
                      <div className="col-span-2 text-right">Debit (BDT)</div>
                    </div>

                    {/* Spent row listing */}
                    {adminCosts.filter(c => filterMonth === "All" || c.date.substring(0, 7) === filterMonth).length === 0 ? (
                      <div className="p-8 text-center text-slate-500 italic text-xs">
                        No financial record entries correspond with the target period.
                      </div>
                    ) : (
                      adminCosts.filter(c => filterMonth === "All" || c.date.substring(0, 7) === filterMonth).map(c => (
                        <div key={c.id} className="grid grid-cols-12 p-3 font-sans text-xs text-slate-800 border-b border-slate-150 leading-relaxed font-semibold">
                          <div className="col-span-2 font-mono text-slate-500 text-[11px]">{c.date}</div>
                          <div className="col-span-2">
                            <span className="bg-stone-100 text-[#F7931E] text-[9px] px-1.5 py-0.5 rounded font-black border border-stone-250 whitespace-nowrap">
                              {c.category}
                            </span>
                          </div>
                          <div className="col-span-4 text-slate-900 text-left">
                            <div>{c.description}</div>
                            <span className="text-[9px] text-gray-500 font-mono block">Vendor: {c.shopName} | Invoice: {c.invoiceNumber}</span>
                          </div>
                          <div className="col-span-2 font-sans text-slate-650">{c.resourcePerson}</div>
                          <div className="col-span-2 text-right font-mono font-black text-rose-650">
                            BDT {c.amount.toLocaleString()}
                          </div>
                        </div>
                      ))
                    )}

                    {/* Report Aggregate cost */}
                    <div className="p-4 bg-slate-100/50 font-sans text-xs flex justify-between items-center border-t border-slate-200">
                      <span className="text-[#F7931E] font-black text-[11px] tracking-wide uppercase">TOTAL DEBIT BALANCE ACCUMULATED:</span>
                      <span className="font-mono text-sm font-black text-[#F7931E]">
                        BDT {adminCosts.filter(c => filterMonth === "All" || c.date.substring(0, 7) === filterMonth).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Final letterhead footer */}
                <div className="border-t border-slate-200 pt-8 flex justify-between items-end">
                  <div className="space-y-1 text-left">
                    <p className="text-[10px] font-sans text-slate-400 leading-normal">
                      * Validated automatically via Ezy Digital Sandbox CRM Finance Center.<br />
                      This cost audit acts as secure documentation. Unsigned copies remain legally compliant.
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-sans text-slate-500 font-extrabold uppercase tracking-wider font-bold">APPROVED BY:</p>
                    <div className="h-0.5 w-24 bg-slate-350 my-1 ml-auto"></div>
                    <p className="text-[10px] text-orange-600 font-black uppercase font-mono tracking-widest font-bold">EZY AUDIT LEDGER</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
