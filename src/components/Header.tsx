import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const mainNavItems = [
    { name: "Grants", path: "/grants", hasDropdown: true },
    { name: "Resources", path: "/resources", hasDropdown: true },
    { name: "About", path: "/about" },
    { name: "News & Events", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
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
              <div className="h-12 w-12 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">GC</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-primary leading-tight">GrantConnect</div>
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
              <Button asChild variant="outline" size="sm">
                <Link to="/apply">Apply Now</Link>
              </Button>
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
          <div className="flex items-center space-x-1">
            <Link to="/" className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive(item.path) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-3 w-3" />}
              </Link>
            ))}
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
              className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              Home
            </Link>
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
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
