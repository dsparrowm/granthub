import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Search, ChevronDown, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { grants } from "@/data/grants";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const mainNavItems = [
    { name: "Grants", path: "/grants", hasDropdown: true },
    { name: "Resources", path: "/resources", hasDropdown: true },
    { name: "About", path: "/about" },
    { name: "News & Events", path: "/news" },
  ];

  const [grantsOpen, setGrantsOpen] = useState(false);
  const grantsRef = useRef<HTMLDivElement | null>(null);
  const firstDropdownItemRef = useRef<HTMLAnchorElement | null>(null);
  const [mobileGrantsOpen, setMobileGrantsOpen] = useState(false);

  // Close dropdown when clicking outside and handle Escape key to close
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (grantsOpen && grantsRef.current && !grantsRef.current.contains(e.target as Node)) {
        setGrantsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setGrantsOpen(false);
        setMobileGrantsOpen(false);
      }
    }

    document.addEventListener("click", handleDocClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [grantsOpen]);

  // When the desktop dropdown opens, focus the first item for keyboard users
  useEffect(() => {
    if (grantsOpen && firstDropdownItemRef.current) {
      firstDropdownItemRef.current.focus();
    }
  }, [grantsOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-background">
      {/* Top Utility Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">An official website of GrantConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
              <Link to="/resources" className="hover:text-accent transition-colors">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary-foreground border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="NovaGrants Logo" width={48} height={48} />
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-primary leading-tight">NovaGrants</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Funding Opportunities</div>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="Search grants..."
                  className="w-full px-4 py-2 pr-10 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Desktop Right Links */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>

                  {user?.role === "admin" && (
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/admin">Admin Dashboard</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" size="sm">
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name || "Profile"}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-primary hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="hidden md:block bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center w-full space-x-1">
            <Link to="/" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            {mainNavItems.map((item) => {
              if (item.name === "Grants") {
                return (
                  <div key={item.path} className="relative" ref={grantsRef}>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={grantsOpen}
                      aria-controls="grants-dropdown"
                      onClick={() => setGrantsOpen((s) => !s)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setGrantsOpen((s) => !s);
                        }
                      }}
                      className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1 ${isActive(item.path)
                        ? "text-primary border-b-2 border-primary"
                        : "text-foreground hover:text-primary"
                        }`}
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3" />
                    </button>

                    {/* Dropdown panel (desktop only) */}
                    {grantsOpen && (
                      <div id="grants-dropdown" className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-md shadow-lg z-40">
                        <div className="py-2">
                          {grants.map((g, idx) => (
                            <Link
                              key={g.id}
                              to={`/grants/${g.id}`}
                              ref={idx === 0 ? firstDropdownItemRef : undefined}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                              onClick={() => setGrantsOpen(false)}
                            >
                              {g.title}
                            </Link>
                          ))}
                          <div className="border-t border-border mt-2 pt-2">
                            <Link to="/grants" className="block px-4 py-2 text-sm font-medium text-primary hover:underline" onClick={() => setGrantsOpen(false)}>View all grants</Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1 ${isActive(item.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground hover:text-primary"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search grants..."
                  className="w-full px-4 py-2 pr-10 border border-input rounded-md bg-background text-sm"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Mobile Nav Items */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              Home
            </Link>
            {mainNavItems.map((item) => {
              if (item.name === "Grants") {
                return (
                  <div key={item.path} className="mb-2">
                    <button
                      type="button"
                      onClick={() => setMobileGrantsOpen((s) => !s)}
                      aria-expanded={mobileGrantsOpen}
                      className="w-full flex items-center justify-between py-2 px-4 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileGrantsOpen ? "rotate-180" : ""}`} />
                    </button>

                    {mobileGrantsOpen && (
                      <div className="pl-4 mt-2">
                        {grants.map((g) => (
                          <Link
                            key={g.id}
                            to={`/grants/${g.id}`}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileGrantsOpen(false);
                            }}
                            className="block py-2 px-4 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted"
                          >
                            {g.title}
                          </Link>
                        ))}
                        <Link to="/grants" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 text-sm font-medium text-primary">View all grants</Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-border">
              <Button asChild className="w-full" size="sm">
                <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
