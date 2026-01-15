import { Problem } from './problems';

export const linkedListProblems: Problem[] = [
  {
    id: 'intersection-of-two-linked-lists',
    title: '相交链表',
    titleEn: 'Intersection of Two Linked Lists',
    difficulty: 'easy',
    category: 'linked-list',
    description: '给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null。',
    examples: [
      { input: 'listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]', output: '8', explanation: '相交节点的值为 8' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何判断两个链表是否相交？', hint: '如果相交，它们的尾部一定相同', answer: '两个链表如果相交，从相交点到末尾的部分是共享的' },
      { step: 2, question: '如何找到相交点？', hint: '让两个指针走过相同的路程', answer: '指针A走完链表A后走链表B，指针B走完链表B后走链表A，它们会在相交点相遇' },
      { step: 3, question: '为什么这样能找到相交点？', hint: '计算两个指针走的总路程', answer: '两个指针走的总路程都是 lenA + lenB，如果相交，它们会同时到达相交点' }
    ],
    codeSteps: [
      { title: '定义方法签名', description: '输入两个链表头节点，返回相交节点', code: 'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    // 待实现\n}', explanation: '返回类型是ListNode，可能为null' },
      { title: '处理边界情况', description: '如果任一链表为空，不可能相交', code: 'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    if (headA == null || headB == null) return null;\n}', explanation: '空链表无法相交' },
      { title: '初始化双指针', description: '两个指针分别从两个链表头开始', code: 'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    if (headA == null || headB == null) return null;\n    ListNode pA = headA, pB = headB;\n}', explanation: 'pA从A链表开始，pB从B链表开始' },
      { title: '遍历直到相遇', description: '指针走到末尾后切换到另一个链表', code: 'public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    if (headA == null || headB == null) return null;\n    ListNode pA = headA, pB = headB;\n    while (pA != pB) {\n        pA = (pA == null) ? headB : pA.next;\n        pB = (pB == null) ? headA : pB.next;\n    }\n    return pA;\n}', explanation: '如果相交，pA和pB会在相交点相遇；如果不相交，都会变成null' }
    ],
    interview: {
      approach: '双指针技巧：让两个指针分别从两个链表头开始，走到末尾后切换到另一个链表继续走。两个指针走过的总路程相同，如果有相交点，它们会同时到达。',
      timeComplexity: 'O(m+n)：两个指针各走一遍两个链表',
      spaceComplexity: 'O(1)：只使用两个指针',
      followUp: [
        { question: '如何判断链表是否有环？', answer: '使用快慢指针，如果有环，快指针会追上慢指针' },
        { question: '如果要求O(1)空间且不能修改链表怎么办？', answer: '本解法已经满足这个要求' }
      ]
    }
  },
  {
    id: 'reverse-linked-list',
    title: '反转链表',
    titleEn: 'Reverse Linked List',
    difficulty: 'easy',
    category: 'linked-list',
    description: '给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: '链表反转后顺序颠倒' }
    ],
    thinkingGuide: [
      { step: 1, question: '反转链表需要改变什么？', hint: '每个节点的next指针', answer: '需要把每个节点的next指针指向它的前一个节点' },
      { step: 2, question: '如何保存前一个节点？', hint: '用一个变量记录', answer: '用prev变量保存当前节点的前一个节点' },
      { step: 3, question: '如何避免断链？', hint: '先保存下一个节点', answer: '在修改next之前，先用临时变量保存下一个节点' }
    ],
    codeSteps: [
      { title: '定义方法签名', description: '输入链表头，返回反转后的头', code: 'public ListNode reverseList(ListNode head) {\n    // 待实现\n}', explanation: '返回新的头节点' },
      { title: '初始化指针', description: 'prev初始为null，curr从head开始', code: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n}', explanation: 'prev是当前节点的前一个节点' },
      { title: '遍历并反转', description: '保存下一个节点，反转指针，移动指针', code: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;  // 保存下一个\n        curr.next = prev;           // 反转指针\n        prev = curr;                // 移动prev\n        curr = next;                // 移动curr\n    }\n    return prev;\n}', explanation: '循环结束时prev指向新的头节点' }
    ],
    interview: {
      approach: '迭代法：使用三个指针prev、curr、next。每次先保存next，然后将curr.next指向prev，最后移动prev和curr。',
      timeComplexity: 'O(n)：遍历一次链表',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能用递归实现吗？', answer: '可以，递归到末尾后逐层返回时反转指针' },
        { question: '如何反转链表的一部分？', answer: '找到起点和终点，断开后反转，再连接回去' }
      ]
    }
  },
  {
    id: 'palindrome-linked-list',
    title: '回文链表',
    titleEn: 'Palindrome Linked List',
    difficulty: 'easy',
    category: 'linked-list',
    description: '给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。',
    examples: [
      { input: 'head = [1,2,2,1]', output: 'true', explanation: '正读反读都一样' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何判断回文？', hint: '比较前半部分和后半部分', answer: '找到中点，反转后半部分，然后比较' },
      { step: 2, question: '如何找到链表中点？', hint: '快慢指针', answer: '快指针每次走两步，慢指针每次走一步，快指针到末尾时慢指针在中点' },
      { step: 3, question: '比较完需要恢复链表吗？', hint: '看题目要求', answer: '最好恢复，保持链表原样' }
    ],
    codeSteps: [
      { title: '找到链表中点', description: '使用快慢指针', code: 'ListNode slow = head, fast = head;\nwhile (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n}', explanation: 'slow最终指向中点' },
      { title: '反转后半部分', description: '从中点开始反转', code: 'ListNode prev = null;\nwhile (slow != null) {\n    ListNode next = slow.next;\n    slow.next = prev;\n    prev = slow;\n    slow = next;\n}', explanation: 'prev指向反转后的头' },
      { title: '比较两半', description: '从头和从反转后的头开始比较', code: 'ListNode p1 = head, p2 = prev;\nwhile (p2 != null) {\n    if (p1.val != p2.val) return false;\n    p1 = p1.next;\n    p2 = p2.next;\n}\nreturn true;', explanation: '如果所有节点值都相等，则是回文' }
    ],
    interview: {
      approach: '快慢指针找中点 + 反转后半部分 + 比较。快指针每次走两步，慢指针每次走一步，快指针到末尾时慢指针在中点。',
      timeComplexity: 'O(n)：遍历两次链表',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能否不修改原链表？', answer: '可以用栈存储前半部分，但空间复杂度变为O(n)' },
        { question: '用递归如何实现？', answer: '递归到末尾后与头部比较，但空间复杂度为O(n)' }
      ]
    }
  },
  {
    id: 'linked-list-cycle',
    title: '环形链表',
    titleEn: 'Linked List Cycle',
    difficulty: 'easy',
    category: 'linked-list',
    description: '给你一个链表的头节点 head ，判断链表中是否有环。',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: '链表中有一个环，尾部连接到第二个节点' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何判断有环？', hint: '想象两个人在环形跑道上跑步', answer: '快慢指针，如果有环，快指针一定会追上慢指针' },
      { step: 2, question: '为什么快指针一定能追上？', hint: '每次循环距离缩小多少？', answer: '快指针每次比慢指针多走一步，距离每次缩小1，最终会相遇' }
    ],
    codeSteps: [
      { title: '初始化快慢指针', description: '都从head开始', code: 'ListNode slow = head, fast = head;', explanation: '快指针每次走两步，慢指针每次走一步' },
      { title: '循环检测', description: '快指针能走就继续', code: 'while (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) return true;\n}\nreturn false;', explanation: '如果相遇说明有环，否则fast会到达null' }
    ],
    interview: {
      approach: 'Floyd判圈算法：快慢指针，快指针每次走两步，慢指针每次走一步。如果有环，快指针一定会追上慢指针。',
      timeComplexity: 'O(n)：最多遍历两圈',
      spaceComplexity: 'O(1)：只使用两个指针',
      followUp: [
        { question: '如何找到环的入口？', answer: '相遇后，一个指针从head出发，一个从相遇点出发，再次相遇点就是入口' },
        { question: '如何计算环的长度？', answer: '相遇后，一个指针不动，另一个继续走，再次相遇时走的步数就是环长' }
      ]
    }
  },
  {
    id: 'linked-list-cycle-ii',
    title: '环形链表 II',
    titleEn: 'Linked List Cycle II',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给定一个链表的头节点 head ，返回链表开始入环的第一个节点。如果链表无环，则返回 null。',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: '返回索引为 1 的链表节点', explanation: '环的入口是第二个节点' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何找到环的入口？', hint: '先判断有没有环', answer: '先用快慢指针找到相遇点，然后用数学推导找入口' },
      { step: 2, question: '相遇后如何找入口？', hint: '从head和相遇点同时出发', answer: '一个指针从head出发，一个从相遇点出发，都每次走一步，相遇点就是入口' }
    ],
    codeSteps: [
      { title: '找相遇点', description: '快慢指针找相遇点', code: 'ListNode slow = head, fast = head;\nwhile (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow == fast) break;\n}', explanation: '如果有环，slow和fast会相遇' },
      { title: '判断是否有环', description: '检查fast是否到达末尾', code: 'if (fast == null || fast.next == null) return null;', explanation: '无环则返回null' },
      { title: '找入口', description: '从head和相遇点同时出发', code: 'ListNode p1 = head, p2 = slow;\nwhile (p1 != p2) {\n    p1 = p1.next;\n    p2 = p2.next;\n}\nreturn p1;', explanation: '相遇点就是环的入口' }
    ],
    interview: {
      approach: 'Floyd判圈算法扩展：先找相遇点，然后一个指针从head出发，一个从相遇点出发，再次相遇点就是环入口。',
      timeComplexity: 'O(n)：最多遍历两圈',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能证明为什么这样能找到入口吗？', answer: '设head到入口距离为a，入口到相遇点距离为b，相遇点到入口距离为c。快指针走了a+b+c+b，慢指针走了a+b，2(a+b)=a+b+c+b，所以a=c' },
        { question: '环的长度如何计算？', answer: '相遇后，一个指针不动，另一个继续走，再次相遇时走的步数就是环长' }
      ]
    }
  },
  {
    id: 'merge-two-sorted-lists',
    title: '合并两个有序链表',
    titleEn: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    category: 'linked-list',
    description: '将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。',
    examples: [
      { input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '按升序合并' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何合并两个有序链表？', hint: '比较两个链表的当前节点', answer: '每次选择较小的节点加入结果链表' },
      { step: 2, question: '如何简化头节点的处理？', hint: '使用哑节点', answer: '创建一个dummy节点作为结果链表的头，最后返回dummy.next' }
    ],
    codeSteps: [
      { title: '创建哑节点', description: '简化头节点处理', code: 'ListNode dummy = new ListNode(0);\nListNode curr = dummy;', explanation: 'dummy是哑节点，curr用于构建结果链表' },
      { title: '比较并连接', description: '选择较小的节点', code: 'while (l1 != null && l2 != null) {\n    if (l1.val <= l2.val) {\n        curr.next = l1;\n        l1 = l1.next;\n    } else {\n        curr.next = l2;\n        l2 = l2.next;\n    }\n    curr = curr.next;\n}', explanation: '每次选择较小的节点加入结果' },
      { title: '处理剩余节点', description: '连接剩余部分', code: 'curr.next = (l1 != null) ? l1 : l2;\nreturn dummy.next;', explanation: '直接连接剩余的链表' }
    ],
    interview: {
      approach: '双指针 + 哑节点：创建哑节点简化头节点处理，每次比较两个链表的当前节点，选择较小的加入结果链表。',
      timeComplexity: 'O(m+n)：遍历两个链表',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能用递归实现吗？', answer: '可以，每次选择较小的节点，递归合并剩余部分' },
        { question: '如何合并K个有序链表？', answer: '使用最小堆或分治法' }
      ]
    }
  },
  {
    id: 'add-two-numbers',
    title: '两数相加',
    titleEn: 'Add Two Numbers',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。',
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807' }
    ],
    thinkingGuide: [
      { step: 1, question: '链表逆序存储有什么好处？', hint: '从哪位开始加？', answer: '可以直接从个位开始相加，符合加法运算顺序' },
      { step: 2, question: '如何处理进位？', hint: '用一个变量记录', answer: '用carry变量记录进位，每次计算时加上进位' }
    ],
    codeSteps: [
      { title: '初始化', description: '创建哑节点和进位变量', code: 'ListNode dummy = new ListNode(0);\nListNode curr = dummy;\nint carry = 0;', explanation: 'carry记录进位' },
      { title: '逐位相加', description: '处理两个链表和进位', code: 'while (l1 != null || l2 != null || carry != 0) {\n    int sum = carry;\n    if (l1 != null) { sum += l1.val; l1 = l1.next; }\n    if (l2 != null) { sum += l2.val; l2 = l2.next; }\n    carry = sum / 10;\n    curr.next = new ListNode(sum % 10);\n    curr = curr.next;\n}', explanation: '注意最后可能还有进位' },
      { title: '返回结果', description: '跳过哑节点', code: 'return dummy.next;', explanation: '返回实际的头节点' }
    ],
    interview: {
      approach: '模拟加法：从个位开始逐位相加，用carry记录进位。注意处理两个链表长度不同和最后可能还有进位的情况。',
      timeComplexity: 'O(max(m,n))：遍历较长的链表',
      spaceComplexity: 'O(max(m,n))：结果链表的长度',
      followUp: [
        { question: '如果链表是正序存储呢？', answer: '可以先反转链表，或者用栈' },
        { question: '如何优化空间复杂度？', answer: '可以复用输入链表的节点' }
      ]
    }
  },
  {
    id: 'remove-nth-node-from-end',
    title: '删除链表的倒数第N个结点',
    titleEn: 'Remove Nth Node From End of List',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: '删除倒数第2个节点，即节点4' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何找到倒数第N个节点？', hint: '双指针间隔N步', answer: '让快指针先走N步，然后快慢指针一起走，快指针到末尾时慢指针就在倒数第N个' },
      { step: 2, question: '如何删除节点？', hint: '需要找到要删除节点的前一个', answer: '让慢指针停在要删除节点的前一个位置' }
    ],
    codeSteps: [
      { title: '创建哑节点', description: '处理删除头节点的情况', code: 'ListNode dummy = new ListNode(0);\ndummy.next = head;\nListNode fast = dummy, slow = dummy;', explanation: '哑节点简化边界处理' },
      { title: '快指针先走n+1步', description: '保持间隔', code: 'for (int i = 0; i <= n; i++) {\n    fast = fast.next;\n}', explanation: '走n+1步是为了让slow停在要删除节点的前一个' },
      { title: '同时移动', description: '直到fast到末尾', code: 'while (fast != null) {\n    fast = fast.next;\n    slow = slow.next;\n}', explanation: 'slow现在在要删除节点的前一个位置' },
      { title: '删除节点', description: '跳过目标节点', code: 'slow.next = slow.next.next;\nreturn dummy.next;', explanation: '修改指针完成删除' }
    ],
    interview: {
      approach: '双指针 + 哑节点：快指针先走n+1步，然后快慢指针一起走，快指针到末尾时慢指针在要删除节点的前一个位置。',
      timeComplexity: 'O(L)：一次遍历',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能否用递归实现？', answer: '可以，递归到末尾后计数返回' },
        { question: '如果n大于链表长度怎么办？', answer: '题目保证n有效，实际中应该先检查' }
      ]
    }
  },
  {
    id: 'swap-nodes-in-pairs',
    title: '两两交换链表中的节点',
    titleEn: 'Swap Nodes in Pairs',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题。',
    examples: [
      { input: 'head = [1,2,3,4]', output: '[2,1,4,3]', explanation: '1和2交换，3和4交换' }
    ],
    thinkingGuide: [
      { step: 1, question: '交换两个节点需要改变哪些指针？', hint: '画图分析', answer: '需要改变前一个节点的next、第一个节点的next、第二个节点的next' },
      { step: 2, question: '如何处理边界情况？', hint: '节点数为奇数时', answer: '如果剩余节点不足两个，就不需要交换' }
    ],
    codeSteps: [
      { title: '创建哑节点', description: '简化头节点处理', code: 'ListNode dummy = new ListNode(0);\ndummy.next = head;\nListNode prev = dummy;', explanation: 'prev指向要交换的两个节点的前一个' },
      { title: '循环交换', description: '每次处理两个节点', code: 'while (prev.next != null && prev.next.next != null) {\n    ListNode first = prev.next;\n    ListNode second = prev.next.next;\n    first.next = second.next;\n    second.next = first;\n    prev.next = second;\n    prev = first;\n}', explanation: '交换后prev移动到下一对的前面' },
      { title: '返回结果', description: '跳过哑节点', code: 'return dummy.next;', explanation: '返回新的头节点' }
    ],
    interview: {
      approach: '迭代法 + 哑节点：每次处理两个节点，修改三个指针完成交换，然后移动到下一对。',
      timeComplexity: 'O(n)：遍历一次链表',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能用递归实现吗？', answer: '可以，每次交换前两个节点，递归处理剩余部分' },
        { question: '如何K个一组反转？', answer: '先检查是否有K个节点，然后反转K个节点，递归处理剩余部分' }
      ]
    }
  },
  {
    id: 'reverse-nodes-in-k-group',
    title: 'K个一组翻转链表',
    titleEn: 'Reverse Nodes in k-Group',
    difficulty: 'hard',
    category: 'linked-list',
    description: '给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。',
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]', explanation: '每2个一组翻转' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何判断是否有k个节点？', hint: '先遍历计数', answer: '从当前位置往后数k个，如果不够就不翻转' },
      { step: 2, question: '如何翻转k个节点？', hint: '和翻转整个链表类似', answer: '用反转链表的方法，但只反转k个节点' }
    ],
    codeSteps: [
      { title: '创建哑节点', description: '简化处理', code: 'ListNode dummy = new ListNode(0);\ndummy.next = head;\nListNode prev = dummy;', explanation: 'prev指向每组的前一个节点' },
      { title: '检查是否有k个节点', description: '计数检查', code: 'ListNode end = prev;\nfor (int i = 0; i < k && end != null; i++) {\n    end = end.next;\n}\nif (end == null) break;', explanation: 'end指向第k个节点' },
      { title: '翻转k个节点', description: '标准反转操作', code: 'ListNode start = prev.next;\nListNode next = end.next;\nend.next = null;\nprev.next = reverse(start);\nstart.next = next;\nprev = start;', explanation: '翻转后连接前后部分' }
    ],
    interview: {
      approach: '分组处理：每次检查是否有k个节点，如果有就翻转这k个节点，然后连接前后部分，继续处理下一组。',
      timeComplexity: 'O(n)：每个节点最多被访问两次',
      spaceComplexity: 'O(1)：只使用常数个指针',
      followUp: [
        { question: '能用递归实现吗？', answer: '可以，每次翻转k个节点，递归处理剩余部分' },
        { question: '如何从尾部开始分组？', answer: '先计算链表长度，然后从头开始，跳过 len % k 个节点' }
      ]
    }
  },
  {
    id: 'copy-list-with-random-pointer',
    title: '随机链表的复制',
    titleEn: 'Copy List with Random Pointer',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。构造这个链表的深拷贝。',
    examples: [
      { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', explanation: '深拷贝整个链表' }
    ],
    thinkingGuide: [
      { step: 1, question: '难点在哪里？', hint: 'random指针指向的节点可能还没创建', answer: '需要先创建所有节点，再处理random指针' },
      { step: 2, question: '如何O(1)空间实现？', hint: '把新节点插入到原节点后面', answer: '在每个原节点后面插入复制节点，这样可以通过原节点找到对应的复制节点' }
    ],
    codeSteps: [
      { title: '复制节点并插入', description: '在每个节点后插入复制', code: 'Node curr = head;\nwhile (curr != null) {\n    Node copy = new Node(curr.val);\n    copy.next = curr.next;\n    curr.next = copy;\n    curr = copy.next;\n}', explanation: '原链表变成 A->A\'->B->B\'->...' },
      { title: '设置random指针', description: '利用位置关系', code: 'curr = head;\nwhile (curr != null) {\n    if (curr.random != null) {\n        curr.next.random = curr.random.next;\n    }\n    curr = curr.next.next;\n}', explanation: '复制节点的random是原节点random的下一个' },
      { title: '分离两个链表', description: '恢复原链表，提取新链表', code: 'Node dummy = new Node(0);\nNode copyCurr = dummy;\ncurr = head;\nwhile (curr != null) {\n    copyCurr.next = curr.next;\n    curr.next = curr.next.next;\n    curr = curr.next;\n    copyCurr = copyCurr.next;\n}\nreturn dummy.next;', explanation: '分离原链表和复制链表' }
    ],
    interview: {
      approach: '三次遍历法：1.在每个节点后插入复制节点 2.设置复制节点的random指针 3.分离两个链表',
      timeComplexity: 'O(n)：三次遍历',
      spaceComplexity: 'O(1)：不算结果链表的空间',
      followUp: [
        { question: '用HashMap如何实现？', answer: '第一次遍历创建所有节点并存入HashMap，第二次遍历设置next和random' },
        { question: '时间和空间的权衡？', answer: 'HashMap方法更简单但需要O(n)空间，三次遍历法O(1)空间但代码更复杂' }
      ]
    }
  },
  {
    id: 'sort-list',
    title: '排序链表',
    titleEn: 'Sort List',
    difficulty: 'medium',
    category: 'linked-list',
    description: '给你链表的头结点 head ，请将其按升序排列并返回排序后的链表。',
    examples: [
      { input: 'head = [4,2,1,3]', output: '[1,2,3,4]', explanation: '升序排列' }
    ],
    thinkingGuide: [
      { step: 1, question: '链表适合用什么排序算法？', hint: '考虑链表的特性', answer: '归并排序，因为链表不支持随机访问，但合并操作很高效' },
      { step: 2, question: '如何找到链表中点？', hint: '快慢指针', answer: '快指针每次走两步，慢指针每次走一步' }
    ],
    codeSteps: [
      { title: '递归终止条件', description: '空链表或单节点', code: 'if (head == null || head.next == null) return head;', explanation: '不需要排序' },
      { title: '找中点并断开', description: '快慢指针', code: 'ListNode slow = head, fast = head.next;\nwhile (fast != null && fast.next != null) {\n    slow = slow.next;\n    fast = fast.next.next;\n}\nListNode mid = slow.next;\nslow.next = null;', explanation: '从中点断开成两个链表' },
      { title: '递归排序并合并', description: '分治思想', code: 'ListNode left = sortList(head);\nListNode right = sortList(mid);\nreturn merge(left, right);', explanation: '递归排序后合并' }
    ],
    interview: {
      approach: '归并排序：快慢指针找中点，断开成两个链表，递归排序后合并。',
      timeComplexity: 'O(n log n)：归并排序的时间复杂度',
      spaceComplexity: 'O(log n)：递归栈深度',
      followUp: [
        { question: '能用迭代实现吗？', answer: '可以，自底向上归并，但代码更复杂' },
        { question: '如何实现O(1)空间的归并排序？', answer: '自底向上迭代，每次合并长度为1,2,4,8...的子链表' }
      ]
    }
  },
  {
    id: 'merge-k-sorted-lists',
    title: '合并K个升序链表',
    titleEn: 'Merge k Sorted Lists',
    difficulty: 'hard',
    category: 'linked-list',
    description: '给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: '合并三个有序链表' }
    ],
    thinkingGuide: [
      { step: 1, question: '如何高效地找到k个链表中的最小值？', hint: '使用什么数据结构？', answer: '使用最小堆（优先队列），每次取出最小的节点' },
      { step: 2, question: '还有什么方法？', hint: '分治', answer: '两两合并，类似归并排序的思想' }
    ],
    codeSteps: [
      { title: '创建最小堆', description: '按节点值排序', code: 'PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);', explanation: '优先队列存储各链表的当前节点' },
      { title: '初始化堆', description: '加入所有链表的头节点', code: 'for (ListNode node : lists) {\n    if (node != null) pq.offer(node);\n}', explanation: '跳过空链表' },
      { title: '依次取出最小节点', description: '构建结果链表', code: 'ListNode dummy = new ListNode(0);\nListNode curr = dummy;\nwhile (!pq.isEmpty()) {\n    ListNode node = pq.poll();\n    curr.next = node;\n    curr = curr.next;\n    if (node.next != null) pq.offer(node.next);\n}\nreturn dummy.next;', explanation: '取出后将其下一个节点加入堆' }
    ],
    interview: {
      approach: '最小堆：将所有链表的头节点加入最小堆，每次取出最小的节点加入结果链表，然后将其下一个节点加入堆。',
      timeComplexity: 'O(n log k)：n是所有节点总数，k是链表数量',
      spaceComplexity: 'O(k)：堆的大小',
      followUp: [
        { question: '分治法如何实现？', answer: '两两合并，每次合并后链表数量减半' },
        { question: '两种方法的优劣比较？', answer: '最小堆代码简单，分治法空间更优' }
      ]
    }
  },
  {
    id: 'lru-cache',
    title: 'LRU 缓存',
    titleEn: 'LRU Cache',
    difficulty: 'medium',
    category: 'linked-list',
    description: '请你设计并实现一个满足 LRU (最近最少使用) 缓存约束的数据结构。',
    examples: [
      { input: '["LRUCache", "put", "put", "get", "put", "get"]', output: '[null, null, null, 1, null, -1]', explanation: 'LRU缓存操作示例' }
    ],
    thinkingGuide: [
      { step: 1, question: 'LRU需要什么操作？', hint: '查找、插入、删除', answer: '需要O(1)的查找、O(1)的插入到头部、O(1)的删除任意节点' },
      { step: 2, question: '用什么数据结构？', hint: '结合两种数据结构', answer: 'HashMap + 双向链表：HashMap实现O(1)查找，双向链表实现O(1)插入删除' }
    ],
    codeSteps: [
      { title: '定义双向链表节点', description: '存储key和value', code: 'class DLinkedNode {\n    int key, value;\n    DLinkedNode prev, next;\n}', explanation: '需要key是为了删除时能从HashMap中移除' },
      { title: '初始化', description: '创建哑头尾节点', code: 'private Map<Integer, DLinkedNode> cache = new HashMap<>();\nprivate int capacity;\nprivate DLinkedNode head, tail;', explanation: '哑节点简化边界处理' },
      { title: '实现get操作', description: '查找并移到头部', code: 'public int get(int key) {\n    DLinkedNode node = cache.get(key);\n    if (node == null) return -1;\n    moveToHead(node);\n    return node.value;\n}', explanation: '访问后移到头部表示最近使用' },
      { title: '实现put操作', description: '插入或更新', code: 'public void put(int key, int value) {\n    DLinkedNode node = cache.get(key);\n    if (node != null) {\n        node.value = value;\n        moveToHead(node);\n    } else {\n        node = new DLinkedNode();\n        node.key = key;\n        node.value = value;\n        cache.put(key, node);\n        addToHead(node);\n        if (cache.size() > capacity) {\n            DLinkedNode removed = removeTail();\n            cache.remove(removed.key);\n        }\n    }\n}', explanation: '超出容量时删除尾部节点' }
    ],
    interview: {
      approach: 'HashMap + 双向链表：HashMap存储key到节点的映射实现O(1)查找，双向链表维护访问顺序实现O(1)插入删除。',
      timeComplexity: 'O(1)：所有操作都是O(1)',
      spaceComplexity: 'O(capacity)：存储capacity个键值对',
      followUp: [
        { question: '如何实现LFU缓存？', answer: '需要额外维护访问频率，可以用HashMap + 多个双向链表' },
        { question: '如何实现线程安全的LRU？', answer: '可以用ConcurrentHashMap和锁，或者使用LinkedHashMap' }
      ]
    }
  }
];
