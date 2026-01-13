import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Home, BookOpen, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/new-bg-wedding.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Semi-transparent overlay for readability - warm cream tint to match wedding theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/75 via-rose-50/60 to-amber-50/70 backdrop-blur-[1px]" />
      </div>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rose-50/90 via-cream-50/95 to-amber-50/90 backdrop-blur-md border-b border-rose-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">&lt;/&gt;</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-lg text-rose-800">算法通关指南</h1>
                  <p className="text-xs text-rose-600/70">大厂面试必备</p>
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/">
                <span className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  location === '/' 
                    ? 'bg-rose-100/80 text-rose-700 font-medium shadow-sm' 
                    : 'text-rose-600 hover:bg-rose-50/80 hover:text-rose-700'
                }`}>
                  <Home className="w-4 h-4" />
                  首页
                </span>
              </Link>
              <Link href="/templates">
                <span className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  location === '/templates' 
                    ? 'bg-rose-100/80 text-rose-700 font-medium shadow-sm' 
                    : 'text-rose-600 hover:bg-rose-50/80 hover:text-rose-700'
                }`}>
                  <BookOpen className="w-4 h-4" />
                  解题模板
                </span>
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-rose-600 hover:bg-rose-100/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* Empty space for balance on desktop */}
            <div className="hidden md:block w-32" />
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-rose-50/95 backdrop-blur-md border-t border-rose-200/50 shadow-lg">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link href="/">
                <span 
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    location === '/' 
                      ? 'bg-rose-100/80 text-rose-700 font-medium' 
                      : 'text-rose-600 hover:bg-rose-100/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  首页
                </span>
              </Link>
              <Link href="/templates">
                <span 
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    location === '/templates' 
                      ? 'bg-rose-100/80 text-rose-700 font-medium' 
                      : 'text-rose-600 hover:bg-rose-100/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  解题模板
                </span>
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
    </div>
  );
}
