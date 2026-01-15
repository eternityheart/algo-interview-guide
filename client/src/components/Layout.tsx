import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen relative bg-slate-50/80">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: 'url(/bg-wedding.png)' }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">&lt;/&gt;</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-lg text-slate-800">明德惟馨的算法通关指南</h1>
                  <p className="text-xs text-slate-500">大厂面试必备</p>
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/">
                <span className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  location === '/' 
                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}>
                  <Home className="w-4 h-4" />
                  首页
                </span>
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* Empty space for balance on desktop */}
            <div className="hidden md:block w-32" />
          </div>
        </div>
        
        {/* Mobile Navigation Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation Drawer */}
        <div className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 px-4">
            <nav className="flex flex-col gap-2">
              <Link href="/">
                <span 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    location === '/' 
                      ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  首页
                </span>
              </Link>
            </nav>
            
            <div className="mt-auto mb-8 px-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 text-center">
                  明德惟馨的算法通关指南
                  <br />
                  大厂面试必备
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
    </div>
  );
}
