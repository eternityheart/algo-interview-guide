import Layout from '@/components/Layout';
import { Link, useParams, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { allProblems, categories, Problem, CodeStep } from '@/data/problems';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  Clock,
  Database,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type TabType = 'thinking' | 'code' | 'solution' | 'interview';

// 代码高亮组件 - 浅色背景
function CodeBlock({ code, fileName }: { code: string; fileName?: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // 简单的语法高亮
  const highlightCode = (code: string): React.ReactNode => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      const parts: React.ReactNode[] = [];
      let remaining = line;
      let partIndex = 0;
      
      // 处理注释
      const commentMatch = remaining.match(/(\/\/.*)/);
      if (commentMatch) {
        const commentIndex = remaining.indexOf(commentMatch[1]);
        if (commentIndex > 0) {
          parts.push(processKeywords(remaining.substring(0, commentIndex), `${lineIndex}-${partIndex++}`));
        }
        parts.push(<span key={`${lineIndex}-comment`} className="text-slate-500 italic">{commentMatch[1]}</span>);
        remaining = '';
      } else {
        parts.push(processKeywords(remaining, `${lineIndex}-${partIndex++}`));
      }
      
      return (
        <span key={lineIndex}>
          {parts}
          {lineIndex < lines.length - 1 && '\n'}
        </span>
      );
    });
  };
  
  const processKeywords = (text: string, keyPrefix: string): React.ReactNode => {
    const keywords = ['public', 'private', 'class', 'return', 'new', 'if', 'else', 'for', 'while', 'int', 'void', 'boolean', 'String', 'Map', 'HashMap', 'List', 'ArrayList', 'Set', 'HashSet', 'Stack', 'Queue', 'PriorityQueue', 'Integer', 'Character', 'Arrays', 'Math', 'Collections', 'double', 'long', 'TreeNode', 'ListNode'];
    const literals = ['true', 'false', 'null'];
    
    const parts: React.ReactNode[] = [];
    const regex = new RegExp(`(\\b(?:${keywords.join('|')})\\b)|(\\b(?:${literals.join('|')})\\b)|(\\b\\d+\\b)|("[^"]*")`, 'g');
    let lastIndex = 0;
    let match;
    let partIndex = 0;
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`${keyPrefix}-${partIndex++}`}>{text.substring(lastIndex, match.index)}</span>);
      }
      
      if (match[1]) { // keyword
        parts.push(<span key={`${keyPrefix}-${partIndex++}`} className="text-purple-600 font-medium">{match[1]}</span>);
      } else if (match[2]) { // literal
        parts.push(<span key={`${keyPrefix}-${partIndex++}`} className="text-orange-600">{match[2]}</span>);
      } else if (match[3]) { // number
        parts.push(<span key={`${keyPrefix}-${partIndex++}`} className="text-orange-600">{match[3]}</span>);
      } else if (match[4]) { // string
        parts.push(<span key={`${keyPrefix}-${partIndex++}`} className="text-green-600">{match[4]}</span>);
      }
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(<span key={`${keyPrefix}-${partIndex++}`}>{text.substring(lastIndex)}</span>);
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-slate-200">
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-slate-400 ml-2">{fileName}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      )}
      <div className="flex overflow-hidden">
        {/* Line numbers - Hidden on mobile for more space */}
        <div className="hidden sm:block py-4 px-3 bg-slate-50 text-slate-500 text-sm font-mono select-none border-r border-slate-200">
          {code.split('\n').map((_, i) => (
            <div key={i} className="leading-relaxed text-right">{i + 1}</div>
          ))}
        </div>
        {/* Code content */}
        <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm flex-1">
          <code className="font-mono text-slate-800 leading-relaxed whitespace-pre">
            {highlightCode(code)}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('thinking');
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]);
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [currentCodeStep, setCurrentCodeStep] = useState(0);
  
  const problem = allProblems.find(p => p.id === id);
  const category = problem ? categories.find(c => c.id === problem.category) : null;
  
  // Get problems in same category for navigation
  const categoryProblems = problem 
    ? allProblems.filter(p => p.category === problem.category)
    : [];
  const currentIndex = categoryProblems.findIndex(p => p.id === id);
  const prevProblem = currentIndex > 0 ? categoryProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < categoryProblems.length - 1 ? categoryProblems[currentIndex + 1] : null;
  
  // Reset code step when changing problems or tabs
  useEffect(() => {
    setCurrentCodeStep(0);
  }, [id, activeTab]);
  
  const toggleStep = (stepNum: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepNum) 
        ? prev.filter(s => s !== stepNum)
        : [...prev, stepNum]
    );
  };
  
  const toggleHint = (stepNum: number) => {
    setShowHints(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };
  
  const toggleAnswer = (stepNum: number) => {
    setShowAnswers(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };
  
  if (!problem) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <p className="text-slate-600 mb-4">题目不存在</p>
            <Link href="/">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-800">返回首页</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const tabs = [
    { id: 'thinking' as TabType, label: '思路引导', icon: '💡' },
    { id: 'code' as TabType, label: '代码实现', icon: '</>' },
    { id: 'solution' as TabType, label: '完整代码', icon: '▶' },
    { id: 'interview' as TabType, label: '面试技巧', icon: '📋' },
  ];
  
  // 获取累积代码
  const getAccumulatedCode = (steps: CodeStep[], currentStep: number) => {
    if (currentStep >= steps.length - 1) {
      return steps[steps.length - 1].code;
    }
    return steps[currentStep].code;
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Top Navigation Bar */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
          <div className="container">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link href={`/?category=${problem.category}`}>
                  <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100">
                    <ChevronLeft className="w-4 h-4" />
                    返回
                  </Button>
                </Link>
                <span className={cn(
                  'text-xs px-2 py-1 rounded font-medium',
                  problem.difficulty === 'easy' && 'bg-green-500/20 text-green-600',
                  problem.difficulty === 'medium' && 'bg-amber-500/20 text-amber-400',
                  problem.difficulty === 'hard' && 'bg-red-500/20 text-red-400'
                )}>
                  {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                </span>
                <span className="text-sm text-slate-400 flex items-center gap-1">
                  <span className="text-blue-600">{category?.icon}</span>
                  {category?.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  {currentIndex + 1} / {categoryProblems.length}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!prevProblem}
                    onClick={() => prevProblem && setLocation(`/problem/${prevProblem.id}`)}
                    className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    上一题
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!nextProblem}
                    onClick={() => nextProblem && setLocation(`/problem/${nextProblem.id}`)}
                    className="text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-50"
                  >
                    下一题
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Two Column Layout */}
        <div className="container py-6">
          <div className="flex gap-6">
            {/* Left Column - Problem Description (30%) */}
            <div className="w-[30%] flex-shrink-0">
              <div className="sticky top-36 space-y-4">
                {/* Problem Title */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-slate-200">
                  <h1 className="text-xl font-bold mb-3 text-slate-800">{problem.title}</h1>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                    {problem.description}
                  </p>
                </div>
                
                {/* Examples */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-slate-200">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-800">
                    <span className="text-blue-600">▷</span>
                    示例
                  </h3>
                  <div className="space-y-3">
                    {problem.examples.map((example, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-slate-500">输入：</span>
                            <code className="text-blue-600 ml-1 font-mono text-xs">{example.input}</code>
                          </div>
                          <div>
                            <span className="text-slate-500">输出：</span>
                            <code className="text-green-600 ml-1 font-mono text-xs">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div className="text-slate-500 text-xs pt-1 border-t border-slate-200 mt-2">
                              {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Complexity */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-slate-200">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-800">
                    <Clock className="w-4 h-4 text-blue-600" />
                    复杂度分析
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-700">⚡</span>
                      <span className="text-slate-500">时间：</span>
                      <span className="text-slate-600">{problem.interview.timeComplexity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Database className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-500">空间：</span>
                      <span className="text-slate-600">{problem.interview.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Learning Content (70%) */}
            <div className="flex-1 min-w-0">
              {/* Tabs */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-lg">
                <div className="flex border-b border-slate-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex-1 px-4 py-3 text-sm font-medium transition-colors relative',
                        activeTab === tab.id
                          ? 'text-blue-600'
                          : 'text-slate-500 hover:text-slate-600'
                      )}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>{tab.icon}</span>
                        {tab.label}
                      </span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {/* Thinking Guide Tab */}
                    {activeTab === 'thinking' && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <p className="text-sm text-blue-700">
                            <strong>学习方法：</strong>先自己思考每个问题，再查看提示和答案。这样能更好地理解解题思路。
                          </p>
                        </div>
                        
                        {problem.thinkingGuide.map((guide) => (
                          <div
                            key={guide.step}
                            className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
                          >
                            <button
                              onClick={() => toggleStep(guide.step)}
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                                  expandedSteps.includes(guide.step)
                                    ? 'bg-blue-600 text-slate-800'
                                    : 'bg-slate-200 text-slate-400'
                                )}>
                                  {guide.step}
                                </span>
                                <span className="font-medium text-left text-slate-800">{guide.question}</span>
                              </div>
                              {expandedSteps.includes(guide.step) ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                            
                            <AnimatePresence>
                              {expandedSteps.includes(guide.step) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-slate-200"
                                >
                                  <div className="p-4 space-y-3">
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleHint(guide.step)}
                                        className="gap-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                                      >
                                        <Lightbulb className="w-4 h-4" />
                                        查看提示
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleAnswer(guide.step)}
                                        className="gap-2 border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                                      >
                                        <Sparkles className="w-4 h-4" />
                                        查看答案
                                      </Button>
                                    </div>
                                    
                                    {showHints[guide.step] && (
                                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <p className="text-sm text-yellow-800">
                                          <strong>提示：</strong>{guide.hint}
                                        </p>
                                      </div>
                                    )}
                                    
                                    {showAnswers[guide.step] && (
                                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <p className="text-sm text-green-800">
                                          <strong>答案：</strong>{guide.answer}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    
                    {/* Code Implementation Tab - 3:7 Layout */}
                    {activeTab === 'code' && (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="flex gap-4">
                          {/* Left: Step List (25%) */}
                          <div className="w-[25%] flex-shrink-0">
                            <h4 className="text-lg font-bold text-blue-600 mb-4">代码构建步骤</h4>
                            <div className="space-y-1">
                              {problem.codeSteps.map((step, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentCodeStep(index)}
                                  className={cn(
                                    'w-full px-3 py-2 rounded-lg text-left text-sm transition-colors flex items-center gap-2',
                                    currentCodeStep === index
                                      ? 'bg-blue-100 text-blue-600 border border-blue-300'
                                      : 'hover:bg-slate-100 text-slate-400 border border-transparent'
                                  )}
                                >
                                  <span className={cn(
                                    'w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
                                    currentCodeStep === index
                                      ? 'bg-blue-600 text-slate-800'
                                      : 'bg-slate-200 text-slate-400'
                                  )}>
                                    {index + 1}
                                  </span>
                                  <span className="text-sm font-medium truncate">{step.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Right: Code Content (75%) */}
                          <div className="flex-1 min-w-0 space-y-4">
                            {/* Step Title and Description */}
                            <div>
                              <h3 className="text-lg font-semibold mb-1 text-slate-800">
                                {problem.codeSteps[currentCodeStep].title}
                              </h3>
                              <p className="text-sm text-slate-400">
                                {problem.codeSteps[currentCodeStep].description}
                              </p>
                            </div>
                            
                            {/* Code Block */}
                            <CodeBlock 
                              code={getAccumulatedCode(problem.codeSteps, currentCodeStep)}
                              fileName="Solution.java"
                            />
                            
                            {/* Code Explanation */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-yellow-700 mb-1">代码解释</h4>
                                  <p className="text-sm text-yellow-800">
                                    {problem.codeSteps[currentCodeStep].explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={currentCodeStep === 0}
                                onClick={() => setCurrentCodeStep(prev => prev - 1)}
                                className="border-gray-600 text-slate-400 hover:bg-slate-100 disabled:opacity-50 bg-transparent"
                              >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                上一步
                              </Button>
                              <span className="text-sm text-slate-500">
                                {currentCodeStep + 1} / {problem.codeSteps.length}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={currentCodeStep === problem.codeSteps.length - 1}
                                onClick={() => setCurrentCodeStep(prev => prev + 1)}
                                className="border-gray-600 text-slate-400 hover:bg-slate-100 disabled:opacity-50 bg-transparent"
                              >
                                下一步
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Complete Solution Tab */}
                    {activeTab === 'solution' && (
                      <motion.div
                        key="solution"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <CodeBlock 
                          code={problem.codeSteps[problem.codeSteps.length - 1].code}
                          fileName="Solution.java"
                        />
                        
                        {/* All Steps Summary */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                          <h4 className="font-medium mb-4 text-slate-800">代码构建回顾</h4>
                          <div className="space-y-3">
                            {problem.codeSteps.map((step, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                  {index + 1}
                                </span>
                                <div>
                                  <span className="font-medium text-sm text-slate-800">{step.title}</span>
                                  <span className="text-slate-500 text-sm"> - {step.explanation}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Interview Tips Tab */}
                    {activeTab === 'interview' && (
                      <motion.div
                        key="interview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Approach */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2 text-slate-800">
                            <span className="text-blue-600">💡</span>
                            面试讲解思路
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {problem.interview.approach}
                          </p>
                        </div>
                        
                        {/* Complexity */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                            <h4 className="font-medium mb-2 flex items-center gap-2 text-slate-800">
                              <Clock className="w-4 h-4 text-yellow-700" />
                              时间复杂度
                            </h4>
                            <p className="text-slate-600">{problem.interview.timeComplexity}</p>
                          </div>
                          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                            <h4 className="font-medium mb-2 flex items-center gap-2 text-slate-800">
                              <Database className="w-4 h-4 text-blue-400" />
                              空间复杂度
                            </h4>
                            <p className="text-slate-600">{problem.interview.spaceComplexity}</p>
                          </div>
                        </div>
                        
                        {/* Follow-up Questions */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                          <h4 className="font-medium mb-4 flex items-center gap-2 text-slate-800">
                            <span className="text-blue-600">❓</span>
                            常见追问
                          </h4>
                          <div className="space-y-4">
                            {problem.interview.followUp.map((item, index) => (
                              <div key={index} className="border-l-2 border-blue-300 pl-4">
                                <p className="font-medium text-sm mb-1 text-slate-800">Q: {item.question}</p>
                                <p className="text-slate-400 text-sm">A: {item.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
