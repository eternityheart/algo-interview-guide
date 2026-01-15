// 查找算法题目数据 - 详细的思路引导和代码步骤
import { Problem, CategoryType } from './problems';

export const searchingProblems: Problem[] = [
  {
    id: 'linear-search',
    title: '线性查找',
    titleEn: 'Linear Search',
    category: 'searching' as CategoryType,
    difficulty: 'easy',
    description: '线性查找是最简单的查找算法。它从数组的第一个元素开始，逐个检查每个元素，直到找到目标值或遍历完整个数组。就像在书架上一本一本地找书。',
    examples: [
      { input: 'arr = [10, 20, 30, 40, 50], target = 30', output: '2', explanation: '30在索引2的位置' },
      { input: 'arr = [10, 20, 30, 40, 50], target = 35', output: '-1', explanation: '35不在数组中' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '如果让你在一排书中找一本特定的书，你会怎么做？',
        hint: '最简单的方法',
        answer: '从第一本开始，一本一本地看书名，直到找到为止。这就是线性查找的思想！'
      },
      {
        step: 2,
        question: '在数组[10, 20, 30, 40, 50]中找30，需要检查几次？',
        hint: '从头开始数',
        answer: '检查10（不是）→检查20（不是）→检查30（找到了！）。需要检查3次。'
      },
      {
        step: 3,
        question: '如果要找的数不在数组中，怎么办？',
        hint: '遍历完整个数组',
        answer: '遍历完整个数组都没找到，就返回-1表示"没找到"。'
      },
      {
        step: 4,
        question: '线性查找的时间复杂度是多少？',
        hint: '最坏情况要遍历整个数组',
        answer: 'O(n)，最坏情况下要检查所有n个元素。'
      }
    ],
    codeSteps: [
      {
        title: '定义方法签名',
        description: '接收数组和目标值，返回索引',
        code: 'public int linearSearch(int[] arr, int target) {\n    // 遍历数组查找\n    return -1; // 没找到\n}',
        explanation: '返回目标值的索引，如果没找到返回-1。'
      },
      {
        title: '遍历数组',
        description: '从头到尾检查每个元素',
        code: 'public int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        // 检查arr[i]是否等于target\n    }\n    return -1;\n}',
        explanation: 'i从0到arr.length-1，遍历每个元素。'
      },
      {
        title: '检查并返回',
        description: '找到就返回索引',
        code: 'public int linearSearch(int[] arr, int target) {\n    for (int i = 0; i < arr.length; i++) {\n        if (arr[i] == target) {\n            return i; // 找到了，返回索引\n        }\n    }\n    return -1; // 没找到\n}',
        explanation: '如果arr[i]==target，说明找到了，立即返回索引i。'
      }
    ],
    interview: {
      approach: '线性查找从数组第一个元素开始，逐个检查每个元素，直到找到目标值或遍历完整个数组。简单直观，适用于无序数组。',
      timeComplexity: 'O(n)：最坏情况遍历整个数组',
      spaceComplexity: 'O(1)：只用了常数空间',
      followUp: [
        { question: '线性查找的优缺点是什么？', answer: '优点：简单，适用于任何数组（有序无序都可以）。缺点：效率低，大数据量时很慢。' },
        { question: '什么时候用线性查找？', answer: '数据量小、数组无序、只查找一次时适合用线性查找。' }
      ]
    }
  },
  {
    id: 'binary-search-basic',
    title: '二分查找（基础）',
    titleEn: 'Binary Search (Basic)',
    category: 'searching' as CategoryType,
    difficulty: 'easy',
    description: '二分查找是一种高效的查找算法，但要求数组必须是有序的。它每次比较中间元素，如果目标值小于中间元素就在左半部分找，否则在右半部分找。每次都能排除一半的元素！',
    examples: [
      { input: 'arr = [1, 3, 5, 7, 9, 11, 13], target = 7', output: '3', explanation: '7在索引3的位置' },
      { input: 'arr = [1, 3, 5, 7, 9, 11, 13], target = 6', output: '-1', explanation: '6不在数组中' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🔢 猜数字游戏：1-100中猜一个数，每次告诉你"大了"或"小了"，最少几次能猜中？',
        hint: '每次猜中间的数',
        answer: '最多7次！每次猜中间的数，就能排除一半。100→50→25→12→6→3→1或2。这就是二分查找的思想！'
      },
      {
        step: 2,
        question: '🎯 在有序数组[1, 3, 5, 7, 9, 11, 13]中找7，怎么用二分法？',
        hint: '先看中间的数',
        answer: '中间是7（索引3），正好就是要找的！如果找9：中间是7，9>7，在右半部分[9, 11, 13]中找。'
      },
      {
        step: 3,
        question: '🛑 二分查找的前提条件是什么？',
        hint: '数组必须...',
        answer: '数组必须是有序的！如果数组无序，二分查找就不能用了。'
      },
      {
        step: 4,
        question: '⏱️ 二分查找的时间复杂度是多少？',
        hint: '每次排除一半',
        answer: 'O(logn)，因为每次都能排除一半的元素，最多需要log₂n次比较。'
      }
    ],
    codeSteps: [
      {
        title: '定义方法和边界',
        description: '用left和right表示查找范围',
        code: 'public int binarySearch(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    // 在[left, right]范围内查找\n    return -1;\n}',
        explanation: 'left和right是查找范围的左右边界，初始是整个数组。'
      },
      {
        title: '循环查找',
        description: '当left<=right时继续查找',
        code: 'public int binarySearch(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    \n    while (left <= right) {\n        // 计算中间位置\n        // 比较并缩小范围\n    }\n    return -1;\n}',
        explanation: 'left<=right表示还有元素可查。如果left>right说明没找到。'
      },
      {
        title: '计算中间位置',
        description: '避免溢出的写法',
        code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;\n    // 比较arr[mid]和target\n}',
        explanation: '用left+(right-left)/2而不是(left+right)/2，避免整数溢出。'
      },
      {
        title: '比较并缩小范围',
        description: '根据比较结果决定往左还是往右',
        code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;\n    \n    if (arr[mid] == target) {\n        return mid; // 找到了\n    } else if (arr[mid] < target) {\n        left = mid + 1; // 在右半部分找\n    } else {\n        right = mid - 1; // 在左半部分找\n    }\n}',
        explanation: '如果arr[mid]==target，找到了。如果arr[mid]<target，目标在右边，left=mid+1。否则目标在左边，right=mid-1。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n二分查找的核心是**减治法**（Decrease and Conquer）。\\n\\n1. **前提**：数组必须**有序**。\\n2. **过程**：维护 `left` 和 `right` 两个指针。每次比较中间元素 `mid`。\\n   - 如果 `arr[mid] == target`：找到。\\n   - 如果 `arr[mid] < target`：目标在右半部分，`left = mid + 1`。\\n   - 如果 `arr[mid] > target`：目标在左半部分，`right = mid - 1`。\\n3. **效率**：每次排除一半，时间复杂度 O(logn)，非常高效。',
      timeComplexity: 'O(logn)：每次排除一半',
      spaceComplexity: 'O(1)：只用了常数空间',
      followUp: [
        { question: '为什么用left+(right-left)/2而不是(left+right)/2？', answer: '避免整数溢出。当left和right都很大时，left+right可能超过int的最大值。' },
        { question: '如果数组有重复元素，怎么找第一个等于target的位置？', answer: '找到target后不立即返回，而是继续在左半部分找，直到找不到为止。' }
      ]
    }
  },
  {
    id: 'binary-search-first',
    title: '二分查找第一个位置',
    titleEn: 'Binary Search First Position',
    category: 'searching' as CategoryType,
    difficulty: 'medium',
    description: '在有序数组中查找目标值第一次出现的位置。如果数组中有多个相同的目标值，返回最左边那个的索引。',
    examples: [
      { input: 'arr = [1, 2, 2, 2, 3, 4], target = 2', output: '1', explanation: '第一个2在索引1的位置' },
      { input: 'arr = [1, 2, 2, 2, 3, 4], target = 5', output: '-1', explanation: '5不在数组中' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '在[1, 2, 2, 2, 3, 4]中找第一个2，普通二分查找会返回什么？',
        hint: '中间的2',
        answer: '普通二分查找可能返回索引2或3（中间的2），但我们要的是第一个2（索引1）。'
      },
      {
        step: 2,
        question: '找到一个2后，怎么确定它是不是第一个？',
        hint: '看它左边还有没有2',
        answer: '找到2后，不要立即返回，继续在左半部分找。如果左边还有2，就更新答案。'
      },
      {
        step: 3,
        question: '什么时候停止查找？',
        hint: '左边没有2了',
        answer: '当left>right时停止。此时记录的答案就是第一个2的位置。'
      },
      {
        step: 4,
        question: '如果数组中没有目标值，怎么处理？',
        hint: '答案的初始值',
        answer: '答案初始化为-1。如果从没找到过目标值，最后返回-1。'
      }
    ],
    codeSteps: [
      {
        title: '定义方法和变量',
        description: '用result记录答案',
        code: 'public int searchFirst(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    int result = -1; // 记录答案\n    \n    // 二分查找\n    return result;\n}',
        explanation: 'result初始化为-1，表示还没找到。'
      },
      {
        title: '二分查找框架',
        description: '标准的二分查找循环',
        code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;\n    \n    if (arr[mid] == target) {\n        // 找到了，但可能不是第一个\n    } else if (arr[mid] < target) {\n        left = mid + 1;\n    } else {\n        right = mid - 1;\n    }\n}',
        explanation: '基本框架和普通二分查找一样。'
      },
      {
        title: '找到后继续往左找',
        description: '记录答案并继续在左半部分查找',
        code: 'if (arr[mid] == target) {\n    result = mid;      // 记录当前位置\n    right = mid - 1;   // 继续在左半部分找\n}',
        explanation: '找到target后，记录位置，然后继续在左边找，看有没有更靠前的。'
      },
      {
        title: '完整代码',
        description: '组合所有部分',
        code: 'public int searchFirst(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    int result = -1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target) {\n            result = mid;\n            right = mid - 1; // 继续往左找\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return result;\n}',
        explanation: '关键是找到target后不立即返回，而是记录并继续往左找。'
      }
    ],
    interview: {
      approach: '在标准二分查找的基础上，找到目标值后不立即返回，而是记录位置并继续在左半部分查找，直到找不到为止。',
      timeComplexity: 'O(logn)：仍然是二分查找',
      spaceComplexity: 'O(1)：只用了常数空间',
      followUp: [
        { question: '如何找最后一个等于target的位置？', answer: '找到后记录位置，然后继续在右半部分找（left=mid+1）。' },
        { question: '如何找第一个大于等于target的位置？', answer: '当arr[mid]>=target时记录并往左找，否则往右找。' }
      ]
    }
  },
  {
    id: 'binary-search-last',
    title: '二分查找最后一个位置',
    titleEn: 'Binary Search Last Position',
    category: 'searching' as CategoryType,
    difficulty: 'medium',
    description: '在有序数组中查找目标值最后一次出现的位置。如果数组中有多个相同的目标值，返回最右边那个的索引。',
    examples: [
      { input: 'arr = [1, 2, 2, 2, 3, 4], target = 2', output: '3', explanation: '最后一个2在索引3的位置' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '找最后一个2和找第一个2有什么区别？',
        hint: '往哪边继续找',
        answer: '找第一个往左找，找最后一个往右找。找到2后，继续在右半部分找。'
      },
      {
        step: 2,
        question: '找到一个2后，怎么继续？',
        hint: '更新left还是right',
        answer: '记录当前位置，然后left=mid+1，继续在右半部分找。'
      }
    ],
    codeSteps: [
      {
        title: '定义方法和变量',
        description: '和找第一个类似',
        code: 'public int searchLast(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    int result = -1;\n    \n    // 二分查找\n    return result;\n}',
        explanation: '框架和找第一个一样。'
      },
      {
        title: '找到后继续往右找',
        description: '记录答案并继续在右半部分查找',
        code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;\n    \n    if (arr[mid] == target) {\n        result = mid;\n        left = mid + 1; // 继续往右找\n    } else if (arr[mid] < target) {\n        left = mid + 1;\n    } else {\n        right = mid - 1;\n    }\n}',
        explanation: '关键区别：找到target后，left=mid+1，继续往右找。'
      }
    ],
    interview: {
      approach: '找到目标值后记录位置，然后继续在右半部分查找，直到找不到为止。',
      timeComplexity: 'O(logn)',
      spaceComplexity: 'O(1)',
      followUp: [
        { question: '如何同时找第一个和最后一个位置？', answer: '分别调用两个函数，或者用一个函数加参数控制方向。' }
      ]
    }
  },
  {
    id: 'binary-search-rotated',
    title: '旋转数组查找',
    titleEn: 'Search in Rotated Sorted Array',
    category: 'searching' as CategoryType,
    difficulty: 'medium',
    description: '在旋转排序数组中查找目标值。旋转数组是将有序数组的某个位置"切开"，把前半部分移到后面。例如[4,5,6,7,0,1,2]是[0,1,2,4,5,6,7]旋转后的结果。',
    examples: [
      { input: 'arr = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4', explanation: '0在索引4的位置' },
      { input: 'arr = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1', explanation: '3不在数组中' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🌀 旋转数组 [4, 5, 6, 7, 0, 1, 2] 有什么特点？',
        hint: '分成两段',
        answer: '它由两段有序的子数组组成：前半段 [4, 5, 6, 7] 和后半段 [0, 1, 2]。且前半段所有元素 > 后半段所有元素。'
      },
      {
        step: 2,
        question: '⚖️ 怎么判断 mid 在哪一段？',
        hint: '和 arr[left] 比较',
        answer: '通过比较 `arr[mid]` 和 `arr[left]`：\\n- 如果 `arr[mid] >= arr[left]`，说明 mid 落在**前半段**（左边有序）。\\n- 否则 mid 落在**后半段**（右边有序）。'
      },
      {
        step: 3,
        question: '🔍 怎么决定往左找还是往右找？',
        hint: '利用有序的那一半',
        answer: '1. 先确定有序区间：\\n   - 如果左边有序，判断 target 是否在 `[left, mid]` 内。在则 `right = mid - 1`，否则 `left = mid + 1`。\\n   - 如果右边有序，判断 target 是否在 `[mid, right]` 内。在则 `left = mid + 1`，否则 `right = mid - 1`。'
      }
    ],
    codeSteps: [
      {
        title: '定义方法和边界',
        description: '标准二分查找框架',
        code: 'public int search(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target) {\n            return mid;\n        }\n        \n        // 判断mid在哪一段，然后决定方向\n    }\n    return -1;\n}',
        explanation: '基本框架和普通二分查找一样，关键是如何决定方向。'
      },
      {
        title: '判断mid在哪一段',
        description: '和arr[left]比较',
        code: 'if (arr[mid] >= arr[left]) {\n    // mid在前半段（左边有序）\n} else {\n    // mid在后半段（右边有序）\n}',
        explanation: 'arr[mid]>=arr[left]说明mid在前半段，此时[left, mid]是有序的。'
      },
      {
        title: 'mid在前半段的情况',
        description: '判断target是否在[left, mid]范围内',
        code: 'if (arr[mid] >= arr[left]) {\n    // 左边有序\n    if (target >= arr[left] && target < arr[mid]) {\n        right = mid - 1; // target在左边\n    } else {\n        left = mid + 1;  // target在右边\n    }\n}',
        explanation: '如果target在[arr[left], arr[mid])范围内，就往左找，否则往右找。'
      },
      {
        title: 'mid在后半段的情况',
        description: '判断target是否在[mid, right]范围内',
        code: 'else {\n    // 右边有序\n    if (target > arr[mid] && target <= arr[right]) {\n        left = mid + 1;  // target在右边\n    } else {\n        right = mid - 1; // target在左边\n    }\n}',
        explanation: '如果target在(arr[mid], arr[right]]范围内，就往右找，否则往左找。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n对于旋转排序数组，我们仍然可以使用**二分查找**，核心在于**判断哪一半是有序的**。\\n\\n1. **判断有序区间**：如果 `arr[mid] >= arr[left]`，说明左半边 `[left, mid]` 是有序的；否则右半边 `[mid, right]` 是有序的。\\n2. **查找 Target**：\\n   - 如果左半边有序且 target 在这个范围内，就查左边，否则查右边。\\n   - 如果右半边有序且 target 在这个范围内，就查右边，否则查左边。\\n\\n时间复杂度 O(logn)。注意如果有重复元素，最坏退化为 O(n)。',
      timeComplexity: 'O(logn)：仍然是二分查找',
      spaceComplexity: 'O(1)',
      followUp: [
        { question: '如果数组有重复元素怎么办？', answer: '当arr[left]==arr[mid]==arr[right]时，无法判断mid在哪一段，需要left++和right--缩小范围。最坏情况退化为O(n)。' }
      ]
    }
  },
  {
    id: 'binary-search-sqrt',
    title: '求平方根',
    titleEn: 'Square Root',
    category: 'searching' as CategoryType,
    difficulty: 'easy',
    description: '计算并返回x的平方根（只保留整数部分）。例如sqrt(8)=2，因为2²=4<8<9=3²。',
    examples: [
      { input: 'x = 8', output: '2', explanation: '8的平方根是2.828...，整数部分是2' },
      { input: 'x = 4', output: '2', explanation: '4的平方根正好是2' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '怎么找8的平方根的整数部分？',
        hint: '找一个数n，使得n²<=8<(n+1)²',
        answer: '我们要找最大的n，使得n²<=8。1²=1<=8，2²=4<=8，3²=9>8。所以答案是2。'
      },
      {
        step: 2,
        question: '怎么用二分法来找？',
        hint: '在[1, x]范围内找',
        answer: '在[1, x]范围内二分查找。如果mid²<=x，说明mid可能是答案或者答案更大，往右找。如果mid²>x，说明mid太大了，往左找。'
      },
      {
        step: 3,
        question: '为什么要记录答案而不是直接返回？',
        hint: '我们要找的是最大的满足条件的数',
        answer: '因为我们要找最大的n使得n²<=x。每次找到满足条件的mid，都要记录下来，然后继续往右找看有没有更大的。'
      }
    ],
    codeSteps: [
      {
        title: '处理特殊情况',
        description: 'x为0或1时直接返回',
        code: 'public int mySqrt(int x) {\n    if (x < 2) return x;\n    \n    // 二分查找\n}',
        explanation: '0的平方根是0，1的平方根是1，直接返回。'
      },
      {
        title: '定义查找范围',
        description: '在[1, x/2]范围内查找',
        code: 'public int mySqrt(int x) {\n    if (x < 2) return x;\n    \n    int left = 1;\n    int right = x / 2; // 平方根不会超过x/2\n    int result = 1;\n    \n    // 二分查找\n    return result;\n}',
        explanation: '当x>=2时，sqrt(x)<=x/2，所以right可以设为x/2。'
      },
      {
        title: '二分查找',
        description: '找最大的n使得n²<=x',
        code: 'while (left <= right) {\n    int mid = left + (right - left) / 2;\n    \n    if ((long)mid * mid <= x) {\n        result = mid;      // mid可能是答案\n        left = mid + 1;    // 继续往右找更大的\n    } else {\n        right = mid - 1;   // mid太大了\n    }\n}',
        explanation: '注意mid*mid可能溢出，要转成long。如果mid²<=x，记录答案并往右找。'
      }
    ],
    interview: {
      approach: '用二分查找在[1, x/2]范围内找最大的n使得n²<=x。每次找到满足条件的mid就记录，然后继续往右找。',
      timeComplexity: 'O(logx)：二分查找',
      spaceComplexity: 'O(1)',
      followUp: [
        { question: '还有什么方法可以求平方根？', answer: '牛顿迭代法，收敛更快。公式：x_{n+1} = (x_n + a/x_n) / 2' }
      ]
    }
  },
  {
    id: 'interpolation-search',
    title: '插值查找',
    titleEn: 'Interpolation Search',
    category: 'searching',
    difficulty: 'medium',
    description: '插值查找是二分查找的改进：不是每次都取中间，而是根据目标值估计位置。就像查字典，找"张"字会直接翻到后面，而不是从中间开始。',
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 8', output: '7', explanation: '根据值的分布估计位置' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '📚 查字典找"张"字，你会从哪里开始翻？',
        hint: '"张"是Z开头，在字典后面',
        answer: '你会直接翻到字典后面，而不是从中间开始！插值查找就是这个思想：根据目标值在范围中的相对位置，估计它可能在哪里。'
      },
      {
        step: 2,
        question: '1️⃣ 在[1,2,3,...,10]中找8，怎么估计位置？',
        hint: '8在1-10中偏后面',
        answer: '用公式：pos = left + (target - arr[left]) / (arr[right] - arr[left]) * (right - left)。8在1-10中占(8-1)/(10-1)=7/9≈78%的位置，所以估计在位置7附近。'
      },
      {
        step: 3,
        question: '2️⃣ 估计位置后怎么继续？',
        hint: '和二分查找类似',
        answer: '如果估计位置的值正好是目标，就找到了。否则根据大小关系缩小范围，继续估计。'
      },
      {
        step: 4,
        question: '📝 插值查找什么时候比二分查找好？',
        hint: '想想数据分布',
        answer: '当数据**分布均匀**时，插值查找更快（O(log log n)）。但如果数据分布不均匀，可能比二分查找还慢！'
      }
    ],
    codeSteps: [
      {
        title: '定义方法',
        description: '初始化左右边界',
        code: `public int interpolationSearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    // 待实现
}`,
        explanation: '初始化左右边界'
      },
      {
        title: '计算估计位置',
        description: '根据值的分布估计',
        code: `while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left == right) {
        if (arr[left] == target) return left;
        return -1;
    }
    
    // 估计位置
    int pos = left + (target - arr[left]) * (right - left) / (arr[right] - arr[left]);
    
    if (arr[pos] == target) {
        return pos;
    } else if (arr[pos] < target) {
        left = pos + 1;
    } else {
        right = pos - 1;
    }
}
return -1;`,
        explanation: '注意要检查target是否在范围内，避免除以0或越界'
      },
      {
        title: '完整代码',
        description: 'InterpolationSearch 类的完整实现',
        code: `public class InterpolationSearch {
    public int interpolationSearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right && target >= arr[left] && target <= arr[right]) {
            if (left == right) {
                if (arr[left] == target) return left;
                return -1;
            }
            
            int pos = left + (target - arr[left]) * (right - left) / (arr[right] - arr[left]);
            
            if (arr[pos] == target) {
                return pos;
            } else if (arr[pos] < target) {
                left = pos + 1;
            } else {
                right = pos - 1;
            }
        }
        
        return -1;
    }
}`,
        explanation: '插值查找完整实现。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n插值查找是**二分查找的改进版**。\\n\\n1. **原理**：不直接取中间位置，而是根据目标值在范围内的**相对分布**来估计位置。\\n2. **公式**：`mid = left + (target - arr[left]) * (right - left) / (arr[right] - arr[left])`。\\n3. **适用**：数据**均匀分布**时效率极高，接近 O(1)（准确说是 O(log log n)）。\\n\\n缺点：数据分布极不均匀时可能退化为 O(n)。',
      timeComplexity: 'O(log log n)：数据均匀分布时',
      spaceComplexity: 'O(1)：只用几个变量',
      followUp: [
        { question: '插值查找与二分查找哪个更好？', answer: '没有绝对的好坏。均匀分布用插值，分布不均或未知用二分（更稳定）。' },
        { question: '插值查找需要数组有序吗？', answer: '需要。和二分查找一样，建立在有序数组基础上。' }
      ]
    }
  },
  {
    id: 'fibonacci-search',
    title: '斐波那契查找',
    titleEn: 'Fibonacci Search',
    category: 'searching',
    difficulty: 'medium',
    description: '斐波那契查找利用斐波那契数列来确定查找位置。它的分割点不是中间，而是按黄金分割比例。这样可以减少比较次数。',
    examples: [
      { input: 'arr = [1, 4, 7, 9, 12, 17, 21], target = 12', output: '4', explanation: '使用斐波那契数列确定分割点' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🐚 你听说过黄金分割吗？0.618是什么？',
        hint: '一种美学上的完美比例',
        answer: '黄金分割比例约0.618，斐波那契数列相邻两数的比值趋近于0.618。斐波那契查找就是用这个比例来分割数组，而不是简单的一半一半。'
      },
      {
        step: 2,
        question: '🔢 数组长度为7，需要多大的斐波那契数？',
        hint: '斐波那契数列：1,1,2,3,5,8,13...',
        answer: '需要找到第一个大于等于7的斐波那契数，是8。然后用F(k-1)=5作为分割点。'
      },
      {
        step: 3,
        question: '✂️ 分割点确定后怎么查找？',
        hint: '和二分查找类似，但分割比例不同',
        answer: '比较分割点的值和目标值，如果目标小就在左边找（用F(k-2)分割），如果目标大就在右边找（用F(k-1)分割）。'
      },
      {
        step: 4,
        question: '📝 斐波那契查找比二分查找好在哪？',
        hint: '想想计算分割点的方式',
        answer: '斐波那契查找只用加减法计算分割点，而二分查找要用除法。在某些硬件上加减法更快。但实际差别不大，更多是理论意义。'
      }
    ],
    codeSteps: [
      {
        title: '生成斐波那契数列',
        description: '准备足够长的斐波那契数列',
        code: `int[] fib = new int[n + 10];
fib[0] = 0; fib[1] = 1;
for (int i = 2; i < fib.length; i++) fib[i] = fib[i-1] + fib[i-2];`,
        explanation: '斐波那契数列：0,1,1,2,3,5,8,13...'
      },
      {
        title: '扩展数组',
        description: '如果数组长度不够，用最后一个元素填充',
        code: `int k = 0;
while (fib[k] < n) k++;
int[] temp = Arrays.copyOf(arr, fib[k]);
for (int i = n; i < fib[k]; i++) temp[i] = arr[n - 1];`,
        explanation: '保证数组长度等于斐波那契数'
      },
      {
        title: '按斐波那契分割查找',
        description: '使用斐波那契数确定分割点',
        code: `int left = 0;
while (k > 0) {
    int mid = Math.min(left + fib[k-1] - 1, n - 1);
    if (target < temp[mid]) {
        k -= 1;
    } else if (target > temp[mid]) {
        left = mid + 1;
        k -= 2;
    } else {
        return Math.min(mid, n - 1);
    }
}`,
        explanation: '分割点是left + fib[k-1] - 1'
      },
      {
        title: '完整代码',
        description: 'FibonacciSearch 类的完整实现',
        code: `import java.util.Arrays;

public class FibonacciSearch {
    public int fibonacciSearch(int[] arr, int target) {
        int n = arr.length;
        int[] fib = new int[n + 10];
        fib[0] = 0; fib[1] = 1;
        for (int i = 2; i < fib.length; i++) fib[i] = fib[i-1] + fib[i-2];
        
        int k = 0;
        while (fib[k] < n) k++;
        
        int[] temp = Arrays.copyOf(arr, fib[k]);
        for (int i = n; i < fib[k]; i++) temp[i] = arr[n - 1];
        
        int left = 0;
        while (k > 0) {
            int mid = Math.min(left + fib[k-1] - 1, n - 1);
            if (target < temp[mid]) {
                k -= 1;
            } else if (target > temp[mid]) {
                left = mid + 1;
                k -= 2;
            } else {
                return Math.min(mid, n - 1);
            }
        }
        return -1;
    }
}`,
        explanation: '斐波那契查找完整实现。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n斐波那契查找利用**斐波那契数列**的性质（接近黄金分割比）来确定分割点。\\n\\n1. **原理**：将数组长度补齐为斐波那契数 F[k]。分割点设为 F[k-1]。\\n2. **特点**：计算分割点只用加减法（mid = low + F[k-1] - 1），避免了二分查找的除法/位运算。\\n\\n适用：在除法运算非常耗时的旧式计算机上更有优势，现在主要作为算法思想考察。',
      timeComplexity: 'O(log n)：和二分查找同一量级',
      spaceComplexity: 'O(log n) 或 O(n)：取决于是否复制数组',
      followUp: [
        { question: '为什么要补齐数组长度？', answer: '为了让查找区间的长度始终匹配斐波那契数列，便于递归分割。' }
      ]
    }
  },
  {
    id: 'bst-search',
    title: '二叉搜索树查找',
    titleEn: 'BST Search',
    category: 'searching',
    difficulty: 'easy',
    description: '二叉搜索树（BST）是一种特殊的二叉树：每个节点的左子树都比它小，右子树都比它大。查找时根据大小关系往左或往右走。',
    examples: [
      { input: 'BST: [8,3,10,1,6,null,14], target = 6', output: 'true', explanation: '8→3→6，找到了' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🌳 如果把猜数字游戏画成一棵树会怎样？',
        hint: '每次猜中间的数，大了往左，小了往右',
        answer: '二叉搜索树就像猜数字游戏的决策树！根节点是中间的数，左边都是比它小的，右边都是比它大的。查找时根据大小关系选择走左边还是右边。'
      },
      {
        step: 2,
        question: '1️⃣ 在BST中找6，根节点是8，怎么走？',
        hint: '6比8小还是大？',
        answer: '6<8，所以往左走，到节点3。'
      },
      {
        step: 3,
        question: '🔄 现在在节点3，接下来怎么走？',
        hint: '6比3大还是小？',
        answer: '6>3，往右走，到节点6。6==6，找到了！'
      },
      {
        step: 4,
        question: '💡 BST查找的效率取决于什么？',
        hint: '想想树的形状',
        answer: '取决于树的高度！如果树是平衡的，高度是log n，查找O(log n)。如果树退化成链表（比如按顺序插入），高度是n，查找O(n)。'
      }
    ],
    codeSteps: [
      {
        title: '定义树节点',
        description: 'BST节点包含值和左右子节点',
        code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}`,
        explanation: '每个节点有值和两个子节点指针'
      },
      {
        title: '迭代查找',
        description: '从根节点开始，根据大小关系移动',
        code: `public TreeNode search(TreeNode root, int target) {
    while (root != null && root.val != target) {
        if (target < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}`,
        explanation: '小于往左，大于往右，直到找到或为空'
      },
      {
        title: '完整代码',
        description: 'BSTSearch 类的完整实现',
        code: `public class BSTSearch {
    public TreeNode search(TreeNode root, int target) {
        while (root != null && root.val != target) {
            if (target < root.val) {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return root;
    }
    
    public TreeNode searchRecursive(TreeNode root, int target) {
        if (root == null || root.val == target) return root;
        if (target < root.val) return searchRecursive(root.left, target);
        return searchRecursive(root.right, target);
    }
}`,
        explanation: '包含迭代和递归两种实现方式。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\nBST查找利用了二叉搜索树的性质：**左 < 根 < 右**。\\n\\n1. **过程**：从根节点开始，如果 target 小于当前值，走左子树；如果 target 大于当前值，走右子树。\\n2. **效率**：时间复杂度取决于**树的高度**。\\n   - 平均/平衡情况：O(logn)。\\n   - 最坏情况（退化为链表）：O(n)。\\n\\n这也是为什么会有 AVL 树、红黑树等平衡二叉树的原因。',
      timeComplexity: 'O(log n) ~ O(n)：取决于树高',
      spaceComplexity: 'O(1)：迭代实现',
      followUp: [
        { question: '如何避免最坏情况？', answer: '通过旋转操作保持树的平衡（如AVL树、红黑树）。' },
        { question: 'BST不仅能查找，还能做什么？', answer: '还能支持O(logn)的插入、删除，以及求前驱、后继、排名等操作。' }
      ]
    }
  },
  {
    id: 'avl-search',
    title: 'AVL树查找',
    titleEn: 'AVL Search',
    category: 'searching',
    difficulty: 'medium',
    description: 'AVL树是一种自平衡的二叉搜索树：任何节点的左右子树高度差不超过1。这保证了查找效率始终是O(log n)。',
    examples: [
      { input: 'AVL树查找', output: 'O(log n)', explanation: '自平衡保证高度为log n' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '⚖️ 如果天平两边重量差太多会怎样？',
        hint: '会倾斜',
        answer: 'AVL树就像一个自动平衡的天平！每次插入或删除后，如果左右子树高度差超过1，就会自动"旋转"来恢复平衡。'
      },
      {
        step: 2,
        question: '1️⃣ 什么是平衡因子？',
        hint: '左右子树的高度差',
        answer: '平衡因子 = 左子树高度 - 右子树高度。AVL树要求每个节点的平衡因子只能是-1、0、1。'
      },
      {
        step: 3,
        question: '2️⃣ AVL树的查找和普通BST有什么区别？',
        hint: '查找过程本身',
        answer: '查找过程完全一样！区别在于AVL树保证了树的高度是log n，所以查找效率稳定在O(log n)。'
      },
      {
        step: 4,
        question: '📝 AVL树的优缺点是什么？',
        hint: '想想维护平衡的代价',
        answer: '优点：查找效率稳定O(log n)。缺点：插入删除时需要旋转来维护平衡，比普通BST慢一些。适合查找多、修改少的场景。'
      }
    ],
    codeSteps: [
      {
        title: 'AVL节点定义',
        description: '比普通BST多一个高度属性',
        code: `class AVLNode {
    int val;
    int height;
    AVLNode left, right;
    AVLNode(int val) { this.val = val; this.height = 1; }
}`,
        explanation: 'height用于计算平衡因子'
      },
      {
        title: '查找方法',
        description: '和普通BST查找完全一样',
        code: `public AVLNode search(AVLNode root, int target) {
    while (root != null && root.val != target) {
        if (target < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}`,
        explanation: '查找过程不涉及平衡操作'
      },
      {
        title: '完整代码',
        description: 'AVLSearch 类的查找部分',
        code: `public class AVLSearch {
    public AVLNode search(AVLNode root, int target) {
        while (root != null && root.val != target) {
            if (target < root.val) {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return root;
    }
    
    private int height(AVLNode node) {
        return node == null ? 0 : node.height;
    }
    
    // 旋转等平衡操作略
}`,
        explanation: 'AVL树的查找代码与普通BST相同，核心在于插入删除时的平衡维护。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\nAVL树是**严格平衡**的二叉搜索树。\\n\\n1. **性质**：任何节点的两个子树的高度差（平衡因子）不超过 1。\\n2. **优势**：保证树的高度严格限制在 logn，因此查找的时间复杂度**稳定为 O(logn)**。\\n3. **代价**：插入和删除时需要通过**旋转**（左旋、右旋）来维护平衡，开销比普通BST大。\\n\\n适用：**查找频繁、插入删除较少**的场景。',
      timeComplexity: 'O(log n)：严格平衡',
      spaceComplexity: 'O(1)：查找过程',
      followUp: [
        { question: 'AVL树和红黑树的区别？', answer: 'AVL树更严格平衡，查找更快；红黑树平衡条件宽松，插入删除更快。' }
      ]
    }
  },
  {
    id: 'rbtree-search',
    title: '红黑树查找',
    titleEn: 'Red-Black Tree Search',
    category: 'searching',
    difficulty: 'hard',
    description: '红黑树是另一种自平衡二叉搜索树，通过节点着色（红/黑）和旋转来保持平衡。它比AVL树的平衡条件更宽松，插入删除更快。',
    examples: [
      { input: '红黑树查找', output: 'O(log n)', explanation: '自平衡保证高度为O(log n)' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🔴 红黑树为什么叫这个名字？',
        hint: '节点有颜色',
        answer: '红黑树的每个节点都有颜色：红色或黑色。通过一些颜色规则来保持平衡，比如"红色节点的子节点必须是黑色"、"从根到叶子的每条路径黑色节点数相同"。'
      },
      {
        step: 2,
        question: '1️⃣ 红黑树有哪些规则？',
        hint: '关于颜色的规则',
        answer: '1.节点是红或黑 2.根是黑色 3.叶子(NIL)是黑色 4.红节点的子节点是黑色 5.每条路径黑色节点数相同。这些规则保证了树的平衡。'
      },
      {
        step: 3,
        question: '2️⃣ 红黑树的查找和普通BST有什么区别？',
        hint: '查找过程本身',
        answer: '查找过程完全一样！颜色只用于维护平衡，不影响查找逻辑。'
      },
      {
        step: 4,
        question: '📝 红黑树和AVL树怎么选？',
        hint: '想想各自的特点',
        answer: 'AVL树更严格平衡，查找稍快。红黑树平衡条件宽松，插入删除更快。Java的TreeMap、HashMap（链表转树）都用红黑树。'
      }
    ],
    codeSteps: [
      {
        title: '红黑树节点定义',
        description: '比普通BST多一个颜色属性',
        code: `class RBNode {
    int val;
    boolean isRed; // true=红，false=黑
    RBNode left, right, parent;
    
    RBNode(int val) {
        this.val = val;
        this.isRed = true; // 新节点默认红色
    }
}`,
        explanation: 'isRed表示节点颜色'
      },
      {
        title: '查找方法',
        description: '和普通BST完全一样',
        code: `public RBNode search(RBNode root, int target) {
    while (root != null && root.val != target) {
        if (target < root.val) {
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return root;
}`,
        explanation: '查找不涉及颜色，只看值的大小'
      },
      {
        title: '完整代码',
        description: 'RedBlackSearch 类的查找部分',
        code: `public class RedBlackSearch {
    public RBNode search(RBNode root, int target) {
        while (root != null && root.val != target) {
            if (target < root.val) {
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return root;
    }
}`,
        explanation: '红黑树的查找代码与BST相同，复杂性在于变色和旋转维护平衡。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n红黑树是一种**近似平衡**的二叉搜索树。\\n\\n1. **规则**：通过节点着色（红/黑）和 5 条性质限制，保证最长路径不会超过最短路径的两倍。\\n2. **应用**：因为其平衡条件比 AVL 树宽松，插入删除时的旋转次数更少，性能更优。\\n3. **场景**：广泛用于 **Map**, **Set** 的底层实现（如 Java TreeMap, C++ std::map）。\\n\\n时间复杂度 O(log n)。',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      followUp: [
        { question: 'Java HashMap中红黑树的使用？', answer: '当链表长度超过8且数组长度超过64时，链表会转为红黑树。' },
        { question: '为什么不用AVL树做HashMap？', answer: 'HashMap需频繁插入删除，红黑树的调整代价比AVL小。' }
      ]
    }
  },
  {
    id: 'hash-search',
    title: '哈希查找',
    titleEn: 'Hash Search',
    category: 'searching',
    difficulty: 'easy',
    description: '哈希表通过哈希函数直接计算元素的存储位置，实现O(1)的查找效率。就像图书馆的书架编号，根据书名直接算出在哪个书架。',
    examples: [
      { input: 'HashMap查找key', output: 'O(1)', explanation: '哈希函数直接定位' }
    ],
    thinkingGuide: [
      {
        step: 1,
        question: '🗺️ 图书馆怎么快速找到一本书？',
        hint: '不是一本本找，而是根据编号',
        answer: '图书馆给每本书一个编号，根据编号直接去对应的书架找。哈希表也是这样：用哈希函数把key转成数组下标，直接访问那个位置。'
      },
      {
        step: 2,
        question: '1️⃣ 什么是哈希函数？',
        hint: '把任意值转成数组下标',
        answer: '哈希函数把key（比如字符串"apple"）转成一个数字（比如5），这个数字就是数组下标。好的哈希函数应该让不同的key尽量分散。'
      },
      {
        step: 3,
        question: '2️⃣ 如果两个key算出同一个下标怎么办？',
        hint: '这叫哈希冲突',
        answer: '常见解决方法：1.链地址法：同一个位置用链表存多个元素 2.开放地址法：冲突时找下一个空位置。Java的HashMap用链地址法。'
      },
      {
        step: 4,
        question: '🚀 哈希表查找为什么这么快？',
        hint: '想想查找过程',
        answer: '因为不需要比较！直接用哈希函数算出位置，一步到位。但如果冲突很多，效率会下降。好的哈希函数和合适的容量很重要。'
      }
    ],
    codeSteps: [
      {
        title: '使用Java HashMap',
        description: 'Java已经实现了高效的哈希表',
        code: `import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);`,
        explanation: 'HashMap是Java中最常用的哈希表实现'
      },
      {
        title: '查找元素',
        description: '使用get方法查找',
        code: `// 查找
Integer value = map.get("apple"); // 返回1
boolean exists = map.containsKey("apple"); // 返回true`,
        explanation: 'get返回值，containsKey判断是否存在'
      },
      {
        title: '完整代码',
        description: 'HashSearch 示例',
        code: `import java.util.HashMap;

public class HashSearch {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        
        map.put("apple", 1);
        map.put("banana", 2);
        
        System.out.println(map.get("apple"));
        System.out.println(map.containsKey("banana"));
    }
}`,
        explanation: '展示标准HashMap的使用。'
      }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n哈希查找利用**哈希表**数据结构。\\n\\n1. **原理**：通过**哈希函数**将 Key 映射到数组下标，直接访问内存地址。\\n2. **冲突**：当不同 Key 映射到同一位置时，使用**拉链法**（链表/红黑树）或**开放寻址法**解决。\\n3. **效率**：平均时间复杂度 **O(1)**，是查找速度最快的数据结构。\\n\\n最坏情况 O(n)（所有 Key 冲突）。',
      timeComplexity: 'O(1)：平均情况',
      spaceComplexity: 'O(n)：需要存储所有元素',
      followUp: [
        { question: '解决哈希冲突有哪些方法？', answer: '链地址法（Java采用）、开放地址法（线性探测、二次探测）、再哈希法。' },
        { question: '哈希表的扩容机制？', answer: '当 loadFactor > 0.75 时，容量翻倍，由于下标 = hash & (n-1)，需要重新计算 hash (Rehash)。' }
      ]
    }
  }
];
