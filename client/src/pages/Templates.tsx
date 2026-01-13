import Layout from '@/components/Layout';
import { categories, problems } from '@/data/problems';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Lightbulb, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 代码高亮组件 - 温馨婚礼主题
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-sm text-gray-400 ml-2">Template.java</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="font-mono text-gray-200 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

// 解题模板数据
const templates = {
  hash: {
    name: '哈希表模板',
    description: '用空间换时间，实现O(1)的查找',
    code: `// 哈希表通用模板
public ReturnType solve(int[] nums, int target) {
    // 1. 创建哈希表
    Map<KeyType, ValueType> map = new HashMap<>();
    
    // 2. 遍历数组
    for (int i = 0; i < nums.length; i++) {
        // 3. 计算需要查找的值
        int complement = target - nums[i];
        
        // 4. 在哈希表中查找
        if (map.containsKey(complement)) {
            // 找到了，返回结果
            return result;
        }
        
        // 5. 存入当前元素
        map.put(nums[i], i);
    }
    
    return defaultResult;
}`,
    keyPoints: [
      '先查后存：避免元素和自己匹配',
      'Key存什么：根据需要查找的内容决定',
      'Value存什么：通常是下标或计数',
      '时间O(n)，空间O(n)'
    ]
  },
  twoPointer: {
    name: '双指针模板',
    description: '左右指针相向移动，适用于有序数组',
    code: `// 双指针通用模板
public ReturnType solve(int[] nums) {
    // 1. 初始化左右指针
    int left = 0;
    int right = nums.length - 1;
    
    // 2. 循环条件：左右指针未相遇
    while (left < right) {
        // 3. 根据条件移动指针
        if (满足条件) {
            // 记录结果
            left++;
            right--;
        } else if (需要增大) {
            left++;
        } else {
            right--;
        }
    }
    
    return result;
}`,
    keyPoints: [
      '初始化：left=0, right=length-1',
      '循环条件：left < right 或 left <= right',
      '移动策略：根据当前状态决定移动哪个指针',
      '时间O(n)，空间O(1)'
    ]
  },
  slidingWindow: {
    name: '滑动窗口模板',
    description: '动态维护一个区间，适用于子串/子数组问题',
    code: `// 滑动窗口通用模板
public ReturnType solve(String s) {
    // 1. 初始化窗口边界和状态
    int left = 0;
    Map<Character, Integer> window = new HashMap<>();
    int result = 0;
    
    // 2. 右指针扩展窗口
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        // 更新窗口状态
        window.put(c, window.getOrDefault(c, 0) + 1);
        
        // 3. 收缩窗口（当不满足条件时）
        while (不满足条件) {
            char d = s.charAt(left);
            // 更新窗口状态
            window.put(d, window.get(d) - 1);
            left++;
        }
        
        // 4. 更新结果
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}`,
    keyPoints: [
      '右指针负责扩展窗口',
      '左指针负责收缩窗口',
      '窗口状态用HashMap或数组维护',
      '时间O(n)，空间O(k)'
    ]
  },
  backtracking: {
    name: '回溯模板',
    description: '穷举所有可能，适用于排列组合问题',
    code: `// 回溯通用模板
public List<List<Integer>> solve(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, List<Integer> path, 
                       List<List<Integer>> result) {
    // 1. 终止条件
    if (满足条件) {
        result.add(new ArrayList<>(path));
        return;
    }
    
    // 2. 遍历选择
    for (int i = start; i < nums.length; i++) {
        // 剪枝（可选）
        if (不满足条件) continue;
        
        // 3. 做选择
        path.add(nums[i]);
        
        // 4. 递归
        backtrack(nums, path, result);
        
        // 5. 撤销选择
        path.remove(path.size() - 1);
    }
}`,
    keyPoints: [
      '做选择 → 递归 → 撤销选择',
      '排列问题：用visited数组标记已使用',
      '组合问题：用start参数避免重复',
      '注意复制path：new ArrayList<>(path)'
    ]
  },
  binarySearch: {
    name: '二分查找模板',
    description: '有序数组O(logn)查找',
    code: `// 二分查找通用模板
public int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;  // 找到目标
        } else if (nums[mid] < target) {
            left = mid + 1;  // 目标在右半边
        } else {
            right = mid - 1;  // 目标在左半边
        }
    }
    
    return -1;  // 未找到
}

// 找左边界
public int leftBound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}`,
    keyPoints: [
      '防止溢出：mid = left + (right - left) / 2',
      '左闭右闭：while (left <= right)',
      '找左边界：找到后继续往左搜索',
      '找右边界：找到后继续往右搜索'
    ]
  },
  stack: {
    name: '单调栈模板',
    description: '找下一个更大/更小元素',
    code: `// 单调栈通用模板（找下一个更大元素）
public int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Stack<Integer> stack = new Stack<>();
    
    for (int i = 0; i < n; i++) {
        // 当前元素比栈顶大，弹出栈顶
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            int idx = stack.pop();
            result[idx] = nums[i];  // 找到了下一个更大元素
        }
        stack.push(i);  // 当前元素入栈
    }
    
    // 栈中剩余元素没有下一个更大元素
    while (!stack.isEmpty()) {
        result[stack.pop()] = -1;
    }
    
    return result;
}`,
    keyPoints: [
      '栈中存下标而不是值',
      '递增栈：找下一个更大元素',
      '递减栈：找下一个更小元素',
      '时间O(n)，每个元素最多入栈出栈各一次'
    ]
  }
};

type TemplateKey = keyof typeof templates;

export default function Templates() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>('hash');
  
  const templateList: { id: TemplateKey; data: typeof templates.hash; category: typeof categories[0] | undefined }[] = [
    { id: 'hash', data: templates.hash, category: categories.find(c => c.id === 'hash') },
    { id: 'twoPointer', data: templates.twoPointer, category: categories.find(c => c.id === 'two-pointer') },
    { id: 'slidingWindow', data: templates.slidingWindow, category: categories.find(c => c.id === 'sliding-window') },
    { id: 'backtracking', data: templates.backtracking, category: categories.find(c => c.id === 'backtracking') },
    { id: 'binarySearch', data: templates.binarySearch, category: categories.find(c => c.id === 'binary-search') },
    { id: 'stack', data: templates.stack, category: categories.find(c => c.id === 'stack') },
  ];
  
  const currentTemplate = templateList.find(t => t.id === activeTemplate);
  
  return (
    <Layout>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-rose-50/80 to-transparent">
          <div className="container py-6 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-rose-800">解题模板</h1>
              <p className="text-rose-700/70 max-w-2xl text-sm sm:text-base">
                掌握这些通用模板，可以快速解决80%的算法题目。每个模板都是经过提炼的最佳实践。
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="container py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            {/* 左侧模板选择 */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-2 bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-lg border border-rose-200/50">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  {templateList.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setActiveTemplate(template.id)}
                      className={cn(
                        'flex-shrink-0 lg:w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all',
                        activeTemplate === template.id
                          ? 'bg-rose-100/80 text-rose-700 border border-rose-300'
                          : 'hover:bg-rose-50/80 text-rose-600/80 bg-white/50'
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-base sm:text-lg">{template.category?.icon}</span>
                        <span className="font-medium text-sm sm:text-base whitespace-nowrap">{template.data.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 右侧模板内容 */}
            <div className="flex-1 min-w-0">
              {currentTemplate && (
                <motion.div
                  key={currentTemplate.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* 模板标题 */}
                  <div className="bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-rose-200/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl bg-rose-100/80"
                      >
                        {currentTemplate.category?.icon}
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-rose-800">{currentTemplate.data.name}</h2>
                        <p className="text-xs sm:text-sm text-rose-600/70">{currentTemplate.data.description}</p>
                      </div>
                    </div>
                    
                    {/* 代码模板 */}
                    <CodeBlock code={currentTemplate.data.code} />
                  </div>
                  
                  {/* 关键要点 */}
                  <div className="bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-rose-200/50 shadow-lg">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-rose-800">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                      关键要点
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {currentTemplate.data.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-rose-700/80 text-sm sm:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* 相关题目 */}
                  <div className="bg-gradient-to-br from-rose-50/80 via-cream-50/90 to-amber-50/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-rose-200/50 shadow-lg">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-rose-800">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                      相关题目
                    </h3>
                    <div className="grid gap-2 sm:gap-3">
                      {currentTemplate.category?.problems.slice(0, 5).map((problemId) => {
                        const problem = problems.find(p => p.id === problemId);
                        if (!problem) return null;
                        return (
                          <a
                            key={problemId}
                            href={`/problem/${problemId}`}
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-white/70 hover:bg-rose-50/80 transition-colors border border-rose-200/50"
                          >
                            <span className="font-medium text-rose-800 text-sm sm:text-base">{problem.title}</span>
                            <span className={cn(
                              'text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded',
                              problem.difficulty === 'easy' && 'bg-green-100/80 text-green-700',
                              problem.difficulty === 'medium' && 'bg-amber-100/80 text-amber-700',
                              problem.difficulty === 'hard' && 'bg-red-100/80 text-red-700'
                            )}>
                              {problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难'}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
