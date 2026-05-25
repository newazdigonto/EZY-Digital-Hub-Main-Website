import { useState, useEffect } from "react";
import { Language } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import ClientsLove from "./components/ClientsLove";
import Contact from "./components/Contact";
import BookMeetingModal from "./components/BookMeetingModal";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  
  // Theme state: light is default!
  const [theme, setTheme] = useState<"light" | "dark" | "default-light">(() => {
    const saved = localStorage.getItem("ezydigital_theme");
    return (saved as "light" | "dark") || "light";
  });

  // Routing state
  const [view, setView] = useState<"home" | "login" | "dashboard">(() => {
    const hash = window.location.hash;
    if (hash === "#/login") return "login";
    if (hash === "#/dashboard") return "dashboard";
    return "home";
  });

  // Logged-in credentials
  const [user, setUser] = useState<{
    username: string;
    isSuperAdmin: boolean;
    permissions: any;
  } | null>(() => {
    const saved = localStorage.getItem("ezydigital_active_session");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // Sync hash changes (back / forward buttons)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/login") {
        setView("login");
      } else if (hash === "#/dashboard") {
        // Redirection check
        const savedSession = localStorage.getItem("ezydigital_active_session");
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          setUser(parsed);
          setView("dashboard");
        } else {
          window.location.hash = "#/login";
          setView("login");
        }
      } else {
        setView("home");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (newView: "home" | "login" | "dashboard") => {
    if (newView === "home") {
      window.location.hash = "";
    } else if (newView === "login") {
      window.location.hash = "#/login";
    } else if (newView === "dashboard") {
      window.location.hash = "#/dashboard";
    }
    setView(newView);
  };

  useEffect(() => {
    const body = window.document.body;
    if (view === "login" || view === "dashboard") {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      if (theme === "dark") {
        body.classList.add("dark");
        body.classList.remove("light");
      } else {
        body.classList.add("light");
        body.classList.remove("dark");
      }
    }
    localStorage.setItem("ezydigital_theme", theme);
  }, [theme, view]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLoginSuccess = (username: string, isSuperAdmin: boolean, permissions: any) => {
    const session = { username, isSuperAdmin, permissions };
    setUser(session);
    localStorage.setItem("ezydigital_active_session", JSON.stringify(session));
    navigateTo("dashboard");
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("ezydigital_active_session");
    navigateTo("home");
  };

  // Dynamic scroll controls
  const handleScrollToSection = (id: string) => {
    if (view !== "home") {
      navigateTo("home");
      // Allow render sequence tick
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 150);
    } else {
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
    }
  };

  if (view === "login") {
    return (
      <Login
        language={language}
        onBackToHome={() => navigateTo("home")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (view === "dashboard" && user) {
    return (
      <Dashboard
        language={language}
        username={user.username}
        isSuperAdmin={user.isSuperAdmin}
        permissions={user.permissions}
        onLogOut={handleLogOut}
      />
    );
  }

  return (
    <div className="bg-[#f9fafb] dark:bg-[#0a0a0a] min-h-screen text-slate-900 dark:text-white overflow-x-hidden selection:bg-orange-500/30 selection:text-white transition-colors duration-300">
      {/* Dynamic Header navbar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        onBookMeeting={() => setIsMeetingModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onAdminClick={() => {
          // If already logged in, go straight to dashboard
          if (user) {
            navigateTo("dashboard");
          } else {
            navigateTo("login");
          }
        }}
      />

      <main className="w-full">
        {/* Responsive Hero Section */}
        <Hero
          language={language}
          onExploreWorks={() => handleScrollToSection("portfolio-section")}
          onOurServices={() => handleScrollToSection("services-section")}
        />

        {/* About section with Stats and details */}
        <About language={language} />

        {/* Detailed services capability modules */}
        <Services language={language} />

        {/* Case works filter catalog */}
        <Portfolio language={language} />

        {/* Clients testimonial feedback quotes */}
        <ClientsLove language={language} />

        {/* Contact and WhatsApp inquiries */}
        <Contact language={language} />
      </main>

      {/* Corporate beautiful footer */}
      <Footer language={language} />

      {/* Calendar consultation appointment modal overlay */}
      <BookMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        language={language}
      />
    </div>
  );
}
