import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Bell, User, LogOut, ChevronDown, HeartPulse, Car, TrendingUp, Sparkles, Scale } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check login status
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Advisor', href: '/advisor' },
    { name: 'Claims', href: '/claims' },
    // Only show Dashboard if logged in
    ...(isLoggedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const insuranceCategories = [
    { name: 'Health Insurance', href: '/insurance/health', Icon: HeartPulse, desc: 'Star, Niva Bupa, Care' },
    { name: 'Life / Term', href: '/insurance/life', Icon: Shield, desc: 'LIC, HDFC Life, Max Life' },
    { name: 'Motor Insurance', href: '/insurance/motor', Icon: Car, desc: 'ICICI, Bajaj Allianz' },
    { name: 'Investment Plans', href: '/insurance/investment', Icon: TrendingUp, desc: 'ULIP, SIP + Insurance' },
    { name: 'Compare All Plans', href: '/compare', Icon: Scale, desc: 'Side-by-side comparison', highlight: true },
  ];


  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              isScrolled ? "text-slate-900" : "text-white md:text-slate-900"
            )}>
              SafeGuard Advisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Insurance Plans Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                  location.pathname === '/compare' || isDropdownOpen
                    ? "text-teal-600 font-bold"
                    : isScrolled ? "text-slate-600 hover:text-teal-600" : "text-slate-600 hover:text-teal-600"
                )}
              >
                Insurance Plans
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 mt-2 animate-in fade-in zoom-in duration-200">
                  <div className="grid gap-2">
                    {insuranceCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.href}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-2xl transition-all group/item",
                          cat.highlight ? "bg-teal-50 hover:bg-teal-100" : "hover:bg-slate-50"
                        )}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110",
                          cat.highlight ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 group-hover/item:text-teal-600 group-hover/item:bg-teal-50"
                        )}>
                          <cat.Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className={cn("text-sm font-bold", cat.highlight ? "text-teal-900" : "text-slate-900 group-hover/item:text-teal-600")}>
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">{cat.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-teal-600 font-bold"
                    : isScrolled ? "text-slate-600 hover:text-teal-600" : "text-slate-600 hover:text-teal-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="flex items-center gap-2 pl-2 pr-4 py-2 bg-teal-50 hover:bg-teal-100 rounded-full transition-colors border border-teal-100">
                  <div className="bg-white p-1 rounded-full shadow-sm">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-sm font-semibold text-teal-700">My Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <div className="bg-white p-1 rounded-full shadow-sm">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 right-0 py-4 px-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {/* Mobile Dropdown */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className={cn(
                  "flex items-center justify-between text-base font-bold py-2 transition-colors",
                  isMobileDropdownOpen ? "text-teal-600" : "text-slate-900"
                )}
              >
                Insurance Plans
                <ChevronDown className={cn("w-5 h-5 transition-transform", isMobileDropdownOpen && "rotate-180")} />
              </button>
              
              {isMobileDropdownOpen && (
                <div className="pl-4 mt-2 space-y-4 animate-in slide-in-from-left duration-200">
                  {insuranceCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      className="flex items-center gap-3 py-1"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }}
                    >
                      <cat.Icon className={cn("w-5 h-5", cat.highlight ? "text-teal-600" : "text-slate-400")} />
                      <span className={cn("text-sm font-medium", cat.highlight ? "text-teal-700 font-bold" : "text-slate-600")}>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-base font-bold py-2 transition-colors",
                  location.pathname === link.href
                    ? "text-teal-600"
                    : "text-slate-900"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 text-center">
                  Go to Dashboard
                </Link>
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 text-center">
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


