import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { 
      label: 'Services', 
      href: '#services',
      dropdown: [
        { label: 'Cardiology', href: '#services' },
        { label: 'Neurology', href: '#services' },
        { label: 'Orthopedics', href: '#services' },
        { label: 'Pediatrics', href: '#services' },
        { label: 'Dermatology', href: '#services' },
        { label: 'Radiology', href: '#services' },
      ]
    },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-heal ${
        isScrolled
          ? 'bg-hospital-blue/95 backdrop-blur-md shadow-hospital py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-hospital-blue font-bold text-xl">M</span>
            </div>
            <span className={`font-display font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>
              MEDICARE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`nav-link flex items-center gap-1 font-medium text-sm transition-colors duration-300 ${
                        isScrolled ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-hospital-lg overflow-hidden transition-all duration-300 ${
                        isServicesOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-hospital-light hover:text-hospital-blue transition-colors duration-200"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={`nav-link font-medium text-sm transition-colors duration-300 ${
                      isScrolled ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+15551234567" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
              isScrolled ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'
            }`}>
              <Phone className="w-4 h-4" />
              (555) 123-4567
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-hospital-orange hover:bg-hospital-orange/90 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-heal ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-hospital-lg">
            {navItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="block py-3 px-4 text-gray-700 hover:text-hospital-blue hover:bg-hospital-light rounded-lg transition-colors duration-200"
                >
                  {item.label}
                </a>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(subItem.href); }}
                        className="block py-2 px-4 text-sm text-gray-500 hover:text-hospital-blue transition-colors duration-200"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-hospital-orange hover:bg-hospital-orange/90 text-white font-semibold py-3 rounded-full"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
