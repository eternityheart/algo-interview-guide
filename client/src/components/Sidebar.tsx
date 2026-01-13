import { Link, useLocation } from 'wouter';
import { problems, categories } from '@/data/problems';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, BookOpen, Code2, Home, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  completedProblems?: string[];
}

export default function Sidebar({ completedProblems = [] }: SidebarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  const getCategoryProblems = (categoryId: string) => {
    return problems.filter(p => p.category === categoryId);
  };
  
  const getCompletedCount = (categoryId: string) => {
    const categoryProblems = getCategoryProblems(categoryId);
    return categoryProblems.filter(p => completedProblems.includes(p.id)).length;
  };
  
  const totalCompleted = completedProblems.length;
  const totalProblems = problems.length;
  const progressPercent = (totalCompleted / totalProblems) * 100;
  
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border z-40",
        "flex flex-col transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[oklch(0.75_0.15_350)] to-[oklch(0.72_0.15_290)] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sidebar-foreground group-hover:text-sidebar-primary transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  算法通关指南
                </h1>
                <p className="text-xs text-muted-foreground">大厂面试必备</p>
              </div>
            </div>
          </Link>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>学习进度</span>
              <span>{totalCompleted}/{totalProblems}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* Quick links */}
          <div className="mb-6">
            <Link href="/">
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                location === '/' 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}>
                <Home className="w-4 h-4" />
                <span className="text-sm">首页</span>
              </div>
            </Link>
            <Link href="/templates">
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer mt-1",
                location === '/templates' 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}>
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">解题模板</span>
              </div>
            </Link>
          </div>
          
          {/* Categories */}
          {categories.map(category => {
            const categoryProblems = getCategoryProblems(category.id);
            const completedCount = getCompletedCount(category.id);
            
            return (
              <div key={category.id} className="mb-6">
                <div className="flex items-center justify-between px-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium text-sidebar-foreground">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {completedCount}/{categoryProblems.length}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {categoryProblems.map(problem => {
                    const isActive = location === `/problem/${problem.id}`;
                    const isCompleted = completedProblems.includes(problem.id);
                    
                    return (
                      <Link key={problem.id} href={`/problem/${problem.id}`}>
                        <div className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all cursor-pointer group",
                          isActive 
                            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[oklch(0.78_0.15_145)] flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-sidebar-foreground" />
                          )}
                          <span className="text-sm truncate">{problem.title}</span>
                          <span className={cn(
                            "text-xs px-1.5 py-0.5 rounded ml-auto flex-shrink-0",
                            problem.difficulty === 'easy' && "difficulty-easy",
                            problem.difficulty === 'medium' && "difficulty-medium",
                            problem.difficulty === 'hard' && "difficulty-hard"
                          )}>
                            {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            用通用套路，解决面试难题
          </p>
        </div>
      </aside>
    </>
  );
}
