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
  { icon: '🔗', name: '图论', desc: 'BFS/DFS' },
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

// 分类卡片颜色配置 - 温馨婚礼主题配色
const categoryColors: { [key: string]: { bg: string; border: string; text: string; gradient: string } } = {
  'hash': { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', gradient: 'from-emerald-400 to-teal-500' },
  'two-pointer': { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', gradient: 'from-amber-400 to-orange-500' },
  'sliding-window': { bg: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-700', gradient: 'from-violet-400 to-purple-500' },
  'substring': { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', gradient: 'from-pink-400 to-rose-500' },
  'backtracking': { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', gradient: 'from-red-400 to-rose-500' },
  'binary-search': { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700', gradient: 'from-cyan-400 to-blue-500' },
  'stack': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', gradient: 'from-blue-400 to-indigo-500' },
  'heap': { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', gradient: 'from-purple-400 to-violet-500' },
  'greedy': { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', gradient: 'from-green-400 to-emerald-500' },
  'binary-tree': { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', gradient: 'from-teal-400 to-cyan-500' },
  'dp': { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', gradient: 'from-orange-400 to-amber-500' },
  'multi-dp': { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-700', gradient: 'from-indigo-400 to-blue-500' },
  'technique': { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', gradient: 'from-yellow-400 to-amber-500' },
  'graph': { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-700', gradient: 'from-rose-400 to-pink-500' },
  'linked-list': { bg: 'bg-lime-50', border: 'border-lime-300', text: 'text-lime-700', gradient: 'from-lime-400 to-green-500' },
  'array': { bg: 'bg-sky-50', border: 'border-sky-300', text: 'text-sky-700', gradient: 'from-sky-400 to-blue-500' },
  'matrix': { bg: 'bg-fuchsia-50', border: 'border-fuchsia-300', text: 'text-fuchsia-700', gradient: 'from-fuchsia-400 to-purple-500' },
  'sorting': { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-700', gradient: 'from-rose-400 to-red-500' },
  'searching': { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700', gradient: 'from-cyan-500 to-teal-500' },
};

export default function Home() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const categoryFromUrl = urlParams.get('category');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : categories.map(c => c.id)
  );
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  
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
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="container py-6 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-lg border border-rose-200/50"
          >
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-rose-800">
              用<span className="text-rose-600">一套方法</span>
            </h1>
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-rose-800">
              解决<span className="text-amber-600">多类题目</span>
            </h1>
            <p className="text-rose-700/80 max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base">
              专为零基础小白设计，从思路分析到代码实现，循循善诱带你掌握算法面试核心技巧。不是死记硬背，而是理解分析问题的思考过程。
            </p>
            
            {/* Decorative Tags - Not Selectable */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {decorativeTags.map((tag, index) => (
                <motion.div
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/70 border border-rose-200/60 text-rose-700 shadow-sm backdrop-blur-sm"
                >
                  <span className="text-base sm:text-lg text-rose-500">{tag.icon}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-rose-800">{tag.name}</div>
                    <div className="text-[10px] sm:text-xs text-rose-600/70 hidden sm:block">{tag.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Learning Path */}
        <div className="container py-4 sm:py-8">
          <div className="bg-gradient-to-r from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-rose-200/50">
            <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-rose-800">学习路径</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 max-w-4xl">
              {learningPath.map((item, index) => (
                <div key={item.step} className="flex items-center w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md flex-shrink-0',
                      index === 0 ? 'bg-gradient-to-r from-rose-400 to-amber-500 text-white' : 'bg-white/80 text-rose-600 border border-rose-200'
                    )}>
                      {item.step}
                    </div>
                    <div>
                      <div className="font-medium text-rose-800 text-sm sm:text-base">{item.title}</div>
                      <div className="text-xs sm:text-sm text-rose-600/70">{item.desc}</div>
                    </div>
                  </div>
                  {index < learningPath.length - 1 && (
                    <div className="hidden sm:block mx-4 sm:mx-6 text-rose-400">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Category Selection */}
        <div className="container py-4 sm:py-8">
          <div className="bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-rose-200/50 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-rose-500">▼</span>
                <h2 className="text-base sm:text-lg font-semibold text-rose-800">选择题目类别</h2>
                <span className="text-xs sm:text-sm text-rose-600/70">
                  已选 {selectedCategories.length} 类，共 {selectedProblemsCount} 题
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs sm:text-sm text-rose-600/70 hover:text-rose-600 transition-colors"
                >
                  全选
                </button>
                <span className="text-rose-400">×</span>
                <button
                  onClick={clearAll}
                  className="text-xs sm:text-sm text-rose-600/70 hover:text-rose-600 transition-colors"
                >
                  清空
                </button>
              </div>
            </div>
            
            {/* Category Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                const colors = categoryColors[category.id] || { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', gradient: 'from-gray-400 to-gray-500' };
                const problemCount = allProblems.filter(p => p.category === category.id).length;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative p-3 sm:p-4 rounded-xl border-2 transition-all text-left shadow-sm backdrop-blur-sm',
                      isSelected
                        ? `${colors.bg} ${colors.border}`
                        : 'bg-white/70 border-rose-100 hover:border-rose-200'
                    )}
                  >
                    {/* Checkbox */}
                    <div className={cn(
                      'absolute top-2 sm:top-3 left-2 sm:left-3 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors',
                      isSelected
                        ? `${colors.border} ${colors.bg}`
                        : 'border-rose-200 bg-white/80'
                    )}>
                      {isSelected && (
                        <CheckCircle2 className={cn('w-3 h-3 sm:w-4 sm:h-4', colors.text)} />
                      )}
                    </div>
                    
                    <div className="pt-3 sm:pt-4">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <span className={cn('text-base sm:text-lg', isSelected ? colors.text : 'text-rose-400')}>
                          {category.icon}
                        </span>
                        <span className={cn(
                          'font-medium text-xs sm:text-sm',
                          isSelected ? colors.text : 'text-rose-700'
                        )}>
                          {category.name}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-rose-600/60">
                        {problemCount} 题
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Problem List by Category */}
          <div className="space-y-4 sm:space-y-6">
            {filteredProblems.map(({ category, problems: categoryProblems }) => {
              const colors = categoryColors[category.id] || { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', gradient: 'from-gray-400 to-gray-500' };
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-md rounded-2xl border border-rose-200/50 overflow-hidden shadow-lg"
                >
                  {/* Category Header */}
                  <div className={cn('px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r text-white', colors.gradient)}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-white/80">{categoryProblems.length} 道题目</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Problems List */}
                  <div className="divide-y divide-rose-100/50">
                    {categoryProblems.map((problem, index) => {
                      const isCompleted = completedProblems.includes(problem.id);
                      
                      return (
                        <Link
                          key={problem.id}
                          href={`/problem/${problem.id}`}
                        >
                          <motion.div
                            whileHover={{ backgroundColor: 'rgba(251, 207, 232, 0.2)' }}
                            className="px-4 sm:px-5 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-1 sm:gap-0"
                          >
                            <div className="flex items-center gap-2 sm:gap-4">
                              <span className="text-xs sm:text-sm text-rose-400 font-mono w-6 sm:w-8">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="font-medium text-rose-800 text-sm sm:text-base">{problem.title}</span>
                              <span className={cn(
                                'text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded font-medium',
                                problem.difficulty === 'easy' && 'bg-green-100/80 text-green-700',
                                problem.difficulty === 'medium' && 'bg-amber-100/80 text-amber-700',
                                problem.difficulty === 'hard' && 'bg-red-100/80 text-red-700'
                              )}>
                                {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 ml-8 sm:ml-0">
                              {isCompleted && (
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                              )}
                              <span className="text-rose-400">→</span>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="text-center py-12 sm:py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-rose-200/50">
              <p className="text-rose-600/70">请选择至少一个题目类别</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
