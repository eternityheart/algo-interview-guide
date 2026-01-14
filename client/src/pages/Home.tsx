import Layout from '@/components/Layout';
import { Link, useSearch } from 'wouter';
import { categories, allProblems } from '@/data/problems';
import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, Code2, Target, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// 顶部装饰性标签（不可选中）
const decorativeTags = [
  { icon: '{ }', name: '哈希表', desc: 'O(1)查找' },
  { icon: '⇄', name: '双指针', desc: '左右夹逼' },
  { icon: '▭', name: '滑动窗口', desc: '动态区间' },
  { icon: '[ ]', name: '子串', desc: '字符处理' },
  { icon: '↺', name: '回溯', desc: '穷举搜索' },
  { icon: '⌖', name: '二分查找', desc: '折半查找' },
  { icon: '▤', name: '栈', desc: '后进先出' },
  { icon: '△', name: '堆', desc: '优先队列' },
  { icon: '✓', name: '贪心', desc: '局部最优' },
  { icon: '🌳', name: '二叉树', desc: '递归遍历' },
  { icon: '📊', name: '动态规划', desc: '状态转移' },
  { icon: '🔗', name: '链表', desc: '指针操作' },
  { icon: '📋', name: '数组', desc: '原地操作' },
  { icon: '⊞', name: '矩阵', desc: '二维操作' },
  { icon: '🕸️', name: '图论', desc: 'BFS/DFS' },
  { icon: '💡', name: '技巧', desc: '位运算' },
  { icon: '↕', name: '排序', desc: '快排/归并' },
  { icon: '🔍', name: '查找', desc: '线性/二分' },
];

// 学习路径步骤
const learningPath = [
  { step: 1, title: '理解题意', desc: '分析问题本质', icon: Target },
  { step: 2, title: '思路推导', desc: '循循善诱引导', icon: BookOpen },
  { step: 3, title: '代码实现', desc: '逐步构建代码', icon: Code2 },
  { step: 4, title: '面试技巧', desc: '掌握表达方法', icon: MessageSquare },
];

// 分类卡片颜色配置 - 专业蓝色主题配色
const categoryColors: { [key: string]: { bg: string; border: string; text: string; gradient: string } } = {
  'hash': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-600' },
  'two-pointer': { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', gradient: 'from-indigo-500 to-violet-600' },
  'sliding-window': { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', gradient: 'from-sky-500 to-blue-600' },
  'substring': { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', gradient: 'from-cyan-500 to-sky-600' },
  'backtracking': { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', gradient: 'from-violet-500 to-purple-600' },
  'binary-search': { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', gradient: 'from-teal-500 to-emerald-600' },
  'stack': { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', gradient: 'from-slate-500 to-gray-600' },
  'heap': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', gradient: 'from-purple-500 to-fuchsia-600' },
  'greedy': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', gradient: 'from-emerald-500 to-green-600' },
  'binary-tree': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', gradient: 'from-green-500 to-teal-600' },
  'dp': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', gradient: 'from-amber-500 to-orange-600' },
  'multi-dp': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', gradient: 'from-orange-500 to-red-600' },
  'technique': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', gradient: 'from-yellow-500 to-amber-600' },
  'graph': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', gradient: 'from-rose-500 to-pink-600' },
  'linked-list': { bg: 'bg-lime-50', border: 'border-lime-200', text: 'text-lime-700', gradient: 'from-lime-500 to-green-600' },
  'array': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-600' },
  'matrix': { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', text: 'text-fuchsia-700', gradient: 'from-fuchsia-500 to-purple-600' },
  'sorting': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', gradient: 'from-red-500 to-rose-600' },
  'searching': { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', gradient: 'from-cyan-500 to-teal-600' },
};

export default function Home() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const categoryFromUrl = urlParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : categories.map(c => c.id)
  );
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false); // 移动端分类折叠状态
  
  useEffect(() => {
    const saved = localStorage.getItem('completedProblems');
    if (saved) {
      setCompletedProblems(JSON.parse(saved));
    }
  }, []);
  
  // 当URL参数变化时更新选中的分类
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const selectAll = () => setSelectedCategories(categories.map(c => c.id));
  const clearAll = () => setSelectedCategories([]);
  
  const totalProblems = allProblems.length;
  const selectedProblemsCount = allProblems.filter(p => selectedCategories.includes(p.category)).length;
  
  // 获取选中分类的题目
  const filteredProblems = categories
    .filter(cat => selectedCategories.includes(cat.id))
    .map(cat => ({
      category: cat,
      problems: allProblems.filter(p => p.category === cat.id)
    }))
    .filter(group => group.problems.length > 0);

  return (
    <Layout>
      <div className="min-h-screen pb-12">
        {/* Hero Section */}
        <div className="container py-4 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-lg border border-slate-200"
          >
            <div className="sm:block hidden">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-slate-800 tracking-tight">
                用<span className="text-blue-600">一套方法</span>
              </h1>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-slate-800 tracking-tight">
                解决<span className="text-indigo-600">多类题目</span>
              </h1>
              <p className="text-slate-600 max-w-2xl mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                专为零基础小白设计，从思路分析到代码实现，循循善诱带你掌握算法面试核心技巧。不是死记硬背，而是理解分析问题的思考过程。
              </p>
            </div>
            
            {/* Mobile Simplified Hero */}
            <div className="sm:hidden mb-2">
              <h1 className="text-xl font-bold text-slate-800 mb-1">
                用<span className="text-blue-600">一套方法</span>解决<span className="text-indigo-600">多类题目</span>
              </h1>
              <p className="text-xs text-slate-500 line-clamp-2">
                专为零基础小白设计，从思路分析到代码实现，循循善诱带你掌握算法面试核心技巧。
              </p>
            </div>
            
            {/* Decorative Tags - Not Selectable */}
            <div className="flex flex-wrap gap-2 sm:gap-3 max-h-20 sm:max-h-none overflow-hidden sm:overflow-visible">
              {decorativeTags.map((tag, index) => (
                <motion.div
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 shadow-sm"
                >
                  <span className="text-base sm:text-lg text-blue-500">{tag.icon}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-slate-800">{tag.name}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">{tag.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Learning Path - Hidden on Mobile to save space */}
        <div className="container py-4 sm:py-8 hidden sm:block">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200">
            <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">学习路径</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 max-w-4xl">
              {learningPath.map((item, index) => (
                <div key={item.step} className="flex items-center w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md flex-shrink-0',
                      'bg-white text-slate-600 border border-slate-200'
                    )}>
                      {item.step}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 text-sm sm:text-base">{item.title}</div>
                      <div className="text-xs sm:text-sm text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  {index < learningPath.length - 1 && (
                    <div className="hidden sm:block mx-4 sm:mx-6 text-slate-300">→</div>
                  )}
                </div>
              ))}
            </div>
            {/* Category Cards Grid */}
            <div className={cn(
              "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 transition-all duration-300 ease-in-out overflow-hidden",
              !isCategoriesExpanded ? "max-h-[180px] sm:max-h-none relative" : ""
            )}>
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                const colors = categoryColors[category.id] || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', gradient: 'from-slate-400 to-slate-500' };
                const problemCount = allProblems.filter(p => p.category === category.id).length;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative p-3 sm:p-4 rounded-xl border transition-all text-left shadow-sm',
                      isSelected
                        ? `${colors.bg} ${colors.border}`
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    )}
                  >
                    {/* Checkbox */}
                    <div className={cn(
                      'absolute top-2 right-2 w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                      isSelected ? `bg-white ${colors.text.replace('text-', 'border-')}` : 'border-slate-200'
                    )}>
                      {isSelected && <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />}
                    </div>
                    
                    <div className="flex flex-col h-full justify-between gap-2">
                      <div className="text-xl sm:text-2xl">{category.icon}</div>
                      <div>
                        <div className={cn("font-medium text-sm sm:text-base", isSelected ? colors.text : 'text-slate-700')}>
                          {category.name}
                        </div>
                        <div className={cn("text-xs", isSelected ? colors.text : 'text-slate-500', 'opacity-80')}>
                          {problemCount} 题
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Problems List */}
          <div className="space-y-6 sm:space-y-8">
            {filteredProblems.map(({ category, problems }) => {
              const colors = categoryColors[category.id] || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', gradient: 'from-slate-400 to-slate-500' };
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b border-slate-100 pb-4">
                    <div className="text-2xl sm:text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800">{category.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500">{problems.length} 道题目</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {problems.map((problem) => {
                      const isCompleted = completedProblems.includes(problem.id);
                      
                      return (
                        <Link key={problem.id} href={`/problem/${problem.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "group relative p-4 rounded-xl border transition-all cursor-pointer h-full flex flex-col justify-between",
                              isCompleted 
                                ? "bg-emerald-50/50 border-emerald-200" 
                                : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md"
                            )}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-slate-400">
                                  {problem.id.split('-')[1]}
                                </span>
                                {isCompleted && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                )}
                              </div>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full font-medium",
                                problem.difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" :
                                problem.difficulty === 'medium' ? "bg-amber-100 text-amber-700" :
                                "bg-rose-100 text-rose-700"
                              )}>
                                {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                              </span>
                            </div>
                            
                            <h4 className={cn(
                              "font-medium text-base mb-2 group-hover:text-blue-600 transition-colors",
                              isCompleted ? "text-slate-600" : "text-slate-800"
                            )}>
                              {problem.title}
                            </h4>
                            
                            <div className="flex items-center justify-end mt-2">
                              <span className="text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
            
            {filteredProblems.length === 0 && (
              <div className="text-center py-12 text-slate-500 bg-white/50 rounded-2xl border border-slate-200">
                <p>请选择题目类别以查看题目</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
