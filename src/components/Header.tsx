import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/banking-partners", label: "Banking Partners" },
    { href: "/bank-authentication", label: "Bank Authentication" },
    { href: "/faq", label: "FAQ's" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-purple-100"
          : "bg-white border-b border-purple-50"
      }`}
    >
      {/* Top bar */}
      <div className="bg-primary text-white py-2 px-4 hidden md:block">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-xs text-white/90 font-medium">
            🏆 Universal Loan — Simple Loans. Bigger Tomorrows. Over $500M Disbursed
          </p>
          <a
            href="tel:+14073497496"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +1 (407) 349-7496
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity flex-shrink-0 py-1">
          <img src="/logo.png" alt="Universal Loan" className="h-16 md:h-20 lg:h-24 w-auto object-contain object-left max-w-[280px] md:max-w-[340px]" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-primary bg-purple-50 font-semibold"
                  : "text-gray-600 hover:text-primary hover:bg-purple-50/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-200"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/get-started">
            <Button
              className="btn-shine font-bold px-6 shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, hsl(272 65% 52%), hsl(280 75% 58%))",
                color: "white",
              }}
            >
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white shadow-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "text-primary bg-purple-50 font-semibold"
                    : "text-gray-600 hover:text-primary hover:bg-purple-50/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-purple-100 grid grid-cols-2 gap-3">
              <Link to="/login">
                <Button variant="outline" className="w-full border-2 border-primary text-primary font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link to="/get-started">
                <Button
                  className="w-full font-bold"
                  style={{
                    background: "linear-gradient(135deg, hsl(272 65% 52%), hsl(280 75% 58%))",
                    color: "white",
                  }}
                >
                  Apply Now
                </Button>
              </Link>
            </div>
            <a
              href="tel:+14073497496"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary"
            >
              <Phone className="w-4 h-4" />
              +1 (407) 349-7496
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
