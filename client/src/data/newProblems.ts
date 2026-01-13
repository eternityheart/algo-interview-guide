import { Problem } from './problems';

// 二叉树题目 (15道)
export const binaryTreeProblems: Problem[] = [
  {
    id: 'binary-tree-inorder',
    title: '二叉树的中序遍历',
    titleEn: 'Binary Tree Inorder Traversal',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给定一个二叉树的根节点 root，返回它的中序遍历结果。',
    examples: [
      { input: 'root = [1,null,2,3]', output: '[1,3,2]', explanation: '中序遍历顺序：左-根-右' },
      { input: 'root = []', output: '[]', explanation: '空树返回空列表' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 什么是中序遍历？', hint: '左-根-右', answer: '中序遍历的顺序是：先递归访问左子树，然后访问根节点，最后递归访问右子树。对于二叉搜索树，中序遍历结果是有序的。' },
      { step: 2, question: '🤔 递归的基本结构是什么？', hint: '三要素', answer: '1. 确定参数和返回值；2. 确定终止条件（节点为空）；3. 确定单层逻辑（左->根->右）。' },
      { step: 3, question: '💻 迭代法怎么实现？', hint: '用栈模拟', answer: '递归的本质是栈。可以用栈来模拟：先一路向左入栈，到底后弹出节点处理（访问），然后转向右子树。' },
      { step: 4, question: '📝 递归和迭代的区别？', hint: '空间复杂度', answer: '递归代码简洁但有栈溢出风险；迭代控制力更强，空间复杂度都是O(h)。' }
    ],
    codeSteps: [
      { title: '第1步：定义结果列表', description: '初始化', code: 'public List<Integer> inorderTraversal(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    // 启动递归\n    inorder(root, result);\n    return result;\n}', explanation: '主函数创建结果列表，调用辅助递归函数。' },
      { title: '第2步：定义递归函数', description: '接收节点和列表', code: 'private void inorder(TreeNode node, List<Integer> result) {\n    // TODO: 终止条件和遍历逻辑\n}', explanation: '辅助函数负责具体的递归遍历。' },
      { title: '第3步：终止条件', description: '节点为空', code: 'if (node == null) {\n    return;\n}', explanation: '遇到空节点直接返回，结束当前分支的递归。' },
      { title: '第4步：单层递归逻辑', description: '左-根-右', code: '    inorder(node.left, result);   // 左\n    result.add(node.val);         // 根\n    inorder(node.right, result);  // 右', explanation: '先递归左子树，再将当前节点加入结果，最后递归右子树。' },
      { title: '第5步：完整代码', description: '汇总', code: 'public List<Integer> inorderTraversal(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    inorder(root, result);\n    return result;\n}\n\nprivate void inorder(TreeNode node, List<Integer> result) {\n    if (node == null) return;\n    inorder(node.left, result);\n    result.add(node.val);\n    inorder(node.right, result);\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)（h为树高）。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n可以用递归或迭代实现。\\n\\n递归法：按照左-根-右的顺序。定义辅助函数，终止条件是节点为空，单层逻辑是递归左、存根、递归右。\\n\\n迭代法：用栈模拟。一路向左入栈，弹出时访问并处理右子树。',
      timeComplexity: 'O(n)，访问每个节点一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '迭代法怎么写？', answer: '用栈。while(curr!=null || !stack.isEmpty())，先curr一直向左入栈，然后pop并访问，再curr=curr.right。' },
        { question: 'Morris遍历了解吗？', answer: 'O(1)空间的遍历方法，利用线索二叉树的思想，将叶子节点的右指针指向后继。' }
      ]
    }
  },
  {
    id: 'max-depth',
    title: '二叉树的最大深度',
    titleEn: 'Maximum Depth of Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给定一个二叉树，找出其最大深度。最大深度是从根节点到最远叶子节点的最长路径上的节点数。',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: '最长路径：3→20→15或3→20→7' },
      { input: 'root = [1,null,2]', output: '2', explanation: '路径：1→2' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 什么是树的深度？', hint: '最长路径', answer: '从根节点到最远叶子节点的最长路径上的节点数。注意叶子节点是指没有子节点的节点。' },
      { step: 2, question: '🤔 如何用子问题定义深度？', hint: '递归公式', answer: '当前树的深度 = max(左子树深度, 右子树深度) + 1（根节点本身）。' },
      { step: 3, question: '🛑 终止条件是什么？', hint: '节点为空', answer: '当节点为null时，深度为0。这是递归的基准情况。' },
      { step: 4, question: '💡 BFS能求吗？', hint: '层序遍历', answer: '可以。用队列进行层序遍历，每遍历一层，深度+1，直到队列为空。' }
    ],
    codeSteps: [
      { title: '第1步：方法签名', description: '接收根节点，返回深度', code: 'public int maxDepth(TreeNode root) {\n    // TODO: 递归实现\n}', explanation: '返回值为int类型。' },
      { title: '第2步：终止条件', description: '处理空节点', code: 'if (root == null) {\n    return 0;\n}', explanation: '空树的深度是0，这是递归的终点。' },
      { title: '第3步：递归计算子树', description: '分别计算左右深度', code: 'int leftDepth = maxDepth(root.left);\nint rightDepth = maxDepth(root.right);', explanation: '后序遍历：先得到左右子树的结果。' },
      { title: '第4步：返回结果', description: '取最大值加1', code: 'return Math.max(leftDepth, rightDepth) + 1;', explanation: '当前深度 = 左右子树最大深度 + 1（加上当前节点）。' },
      { title: '第5步：完整代码', description: '汇总', code: 'public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    int left = maxDepth(root.left);\n    int right = maxDepth(root.right);\n    return Math.max(left, right) + 1;\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n推荐用后序遍历（递归）。\\n\\n1. 终止条件：节点为空返回0。\\n2. 递归逻辑：分别求左子树和右子树深度。\\n3. 在中间逻辑：当前深度 = max(左, 右) + 1。\\n\\n也可以用BFS层序遍历，每做一次层遍历depth++。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '如何求最小深度？', answer: '最小深度是到最近叶子节点的距离。注意当一个子树为空时，要取另一个子树的深度+1，而不是min(0, right)+1。' },
        { question: 'N叉树最大深度？', answer: '遍历所有子节点取最大值 + 1。' }
      ]
    }
  },
  {
    id: 'invert-tree',
    title: '翻转二叉树',
    titleEn: 'Invert Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给你一棵二叉树的根节点 root，翻转这棵二叉树，并返回其根节点。',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: '左右子树互换' },
      { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: '1和3互换位置' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 翻转是什么意思？', hint: '镜像', answer: '以前是左孩子的现在变成右孩子，以前是右孩子的现在变左孩子。对每一个节点都要执行这个“交换”操作。' },
      { step: 2, question: '🤔 遍历顺序有要求吗？', hint: '前序/后序 vs 中序', answer: '前序（先交换再递归）和后序（先递归再交换）都可以。中序比较麻烦，因为交换后左孩子变右孩子，递归右孩子其实又递归回去了。' },
      { step: 3, question: '🛑 终止条件是什么？', hint: '节点为空', answer: '节点为null时，不用翻转，直接返回null。' },
      { step: 4, question: '📝 用前序遍历怎么写？', hint: '先交换', answer: '1. 交换root的左右子节点；2. 递归翻转root.left；3. 递归翻转root.right。' }
    ],
    codeSteps: [
      { title: '第1步：终止条件', description: '节点为空', code: 'public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    // 继续处理\n}', explanation: '空节点直接返回。' },
      { title: '第2步：交换左右子节点', description: '前序位置处理', code: '    // 交换左右\n    TreeNode temp = root.left;\n    root.left = root.right;\n    root.right = temp;', explanation: '先把当前节点的左右孩子交换。' },
      { title: '第3步：递归处理子树', description: '继续翻转', code: '    invertTree(root.left);\n    invertTree(root.right);', explanation: '交换后，原来的左子树变成了右子树，但没关系，继续递归翻转现在的左右子树即可。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    \n    TreeNode temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n    \n    invertTree(root.left);\n    invertTree(root.right);\n    \n    return root;\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用递归的前序遍历或后序遍历。\\n\\n前序遍历思路：\\n1. 终止条件：节点为空返回。\\n2. 交换当前节点的左右子节点。\\n3. 递归翻转左子树。\\n4. 递归翻转右子树。\\n\\n也可以用BFS层序遍历，每次取出节点交换其左右孩子。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '迭代法怎么写？', answer: '用栈模拟前序遍历，或者用队列模拟层序遍历。每次弹出节点，交换其左右孩子，然后把左右孩子入栈/队。' }
      ]
    }
  },
  {
    id: 'symmetric-tree',
    title: '对称二叉树',
    titleEn: 'Symmetric Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给你一个二叉树的根节点 root，检查它是否轴对称。',
    examples: [
      { input: 'root = [1,2,2,3,4,4,3]', output: 'true', explanation: '左右子树镜像对称' },
      { input: 'root = [1,2,2,null,3,null,3]', output: 'false', explanation: '不对称' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 对称的定义是什么？', hint: '镜像', answer: '树的左子树和右子树互为镜像。具体来说，左子树的左孩子 == 右子树的右孩子，左子树的右孩子 == 右子树的左孩子。' },
      { step: 2, question: '🤔 怎么判断两个节点互为镜像？', hint: '递归逻辑', answer: '1. 两个节点值相同；2. A的左与B的右成镜像；3. A的右与B的左成镜像。' },
      { step: 3, question: '🛑 终止条件有哪些？', hint: '节点为空', answer: '都为空->True；一个为空一个不为空->False；值不相等->False。' },
      { step: 4, question: '💡 主函数怎么写？', hint: '调用辅助函数', answer: '主函数只检查根节点是否为空，然后调用辅助函数比较(root.left, root.right)。' }
    ],
    codeSteps: [
      { title: '第1步：主函数', description: '判空并启动递归', code: 'public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    return isMirror(root.left, root.right);\n}', explanation: '检查左右子树是否镜像。' },
      { title: '第2步：辅助函数终止条件', description: '处理空指针和值比较', code: 'private boolean isMirror(TreeNode t1, TreeNode t2) {\n    if (t1 == null && t2 == null) return true;  // 都为空\n    if (t1 == null || t2 == null) return false; // 一个空一个不空\n    if (t1.val != t2.val) return false;         // 值不等\n    // 继续递归...\n}', explanation: '先处理基础情况，排除明显的非镜像。' },
      { title: '第3步：递归判断子节点', description: '交叉比较', code: '    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);', explanation: 't1左vs t2右，t1右vs t2左，必须同时满足。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    return isMirror(root.left, root.right);\n}\n\nprivate boolean isMirror(TreeNode t1, TreeNode t2) {\n    if (t1 == null && t2 == null) return true;\n    if (t1 == null || t2 == null || t1.val != t2.val) return false;\n    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用递归法比较左右子树。\\n\\n定义辅助函数check(p, q)：\\n1. 均为空->true\\n2. 只有一个空或值不等->false\\n3. 递归比较：p.left vs q.right 且 p.right vs q.left。\\n\\n也可以用队列进行迭代比较。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '迭代法怎么写？', answer: '用队列，每次放入成对的节点(left, right)，取出来比较，然后按(u.left, v.right, u.right, v.left)顺序入队。' }
      ]
    }
  },
  {
    id: 'diameter-of-binary-tree',
    title: '二叉树的直径',
    titleEn: 'Diameter of Binary Tree',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给定一棵二叉树，你需要计算它的直径长度。直径是任意两个节点路径长度中的最大值，这条路径可能穿过也可能不穿过根节点。',
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3', explanation: '路径[4,2,1,3]或[5,2,1,3]长度为3' },
      { input: 'root = [1,2]', output: '1', explanation: '路径[2,1]长度为1' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 直径是怎么定义的？', hint: '路径长度', answer: '任意两个节点间路径上的边数。注意，最长路径不一定经过根节点。' },
      { step: 2, question: '🤔 经过某个节点的直径是多少？', hint: '左+右', answer: '经过该节点的直径 = 左子树最大深度 + 右子树最大深度。' },
      { step: 3, question: '💡 如何找到全局最大直径？', hint: '遍历每个节点', answer: '在计算深度的递归过程中，顺便计算每个节点的“左+右”，并更新全局最大值。' },
      { step: 4, question: '📝 递归函数返回什么？', hint: '深度', answer: '递归函数必须返回当前节点的深度（max(L, R) + 1），而不是直径，否则父节点没法利用。' }
    ],
    codeSteps: [
      { title: '第1步：定义全局变量', description: '记录最大直径', code: 'class Solution {\n    int maxDiameter = 0;\n}', explanation: '因为直径可能出现在子树中，需要一个全局变量持续更新最大值。' },
      { title: '第2步：深度计算函数', description: '后序遍历', code: 'private int maxDepth(TreeNode node) {\n    if (node == null) return 0;\n    int left = maxDepth(node.left);\n    int right = maxDepth(node.right);\n    // 顺便更新直径\n    maxDiameter = Math.max(maxDiameter, left + right);\n    // 返回深度\n    return Math.max(left, right) + 1;\n}', explanation: '🔑 核心：在求深度的同时计算经过该节点的路径长度（left+right）。' },
      { title: '第3步：主函数', description: '启动递归', code: 'public int diameterOfBinaryTree(TreeNode root) {\n    maxDepth(root);\n    return maxDiameter;\n}', explanation: '调用递归函数，最后返回全局最大值。' },
      { title: '第4步：完整代码', description: '汇总', code: 'class Solution {\n    int maxDiameter = 0;\n    public int diameterOfBinaryTree(TreeNode root) {\n        maxDepth(root);\n        return maxDiameter;\n    }\n    private int maxDepth(TreeNode node) {\n        if (node == null) return 0;\n        int left = maxDepth(node.left);\n        int right = maxDepth(node.right);\n        maxDiameter = Math.max(maxDiameter, left + right);\n        return Math.max(left, right) + 1;\n    }\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n直径 = 左子树深度 + 右子树深度。\\n\\n但是最大直径不一定经过根节点，所以需要在递归求深度的过程中，维护一个全局变量maxDiameter，对每个节点计算left+right并更新maxDiameter。递归函数本身返回深度。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '如果要求返回路径上的节点数？', answer: '那就是边数+1，也就是left+right+1。' }
      ]
    }
  },
  {
    id: 'level-order',
    title: '二叉树的层序遍历',
    titleEn: 'Binary Tree Level Order Traversal',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给你二叉树的根节点 root，返回其节点值的层序遍历（即逐层地，从左到右访问所有节点）。',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: '按层分组' },
      { input: 'root = [1]', output: '[[1]]', explanation: '单节点' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 什么是层序遍历？', hint: 'BFS', answer: '按照从上到下、从左到右的顺序访问节点。通常使用队列（Queue）来实现。' },
      { step: 2, question: '🤔 队列里放什么？', hint: '节点', answer: '初始放入根节点。然后取出节点，如果有左右孩子，依次放入队列。' },
      { step: 3, question: '🚧 如何区分每一层？', hint: 'Size loop', answer: '这是关键点。在处理每一层之前，先记录当前队列的长度size。然后循环size次，处理的正好是这一层的所有节点。' },
      { step: 4, question: '📝 结果怎么存？', hint: 'List<List>', answer: '每层处理完得到一个List，最后把所有层的List加到大List里。' }
    ],
    codeSteps: [
      { title: '第1步：初始化', description: '结果集和队列', code: 'public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n}', explanation: '边界检查，并把根节点入队。' },
      { title: '第2步：循环处理每一层', description: '记录size', code: '    while (!queue.isEmpty()) {\n        int size = queue.size();  // 这一层的节点数\n        List<Integer> currentLevel = new ArrayList<>();\n        // 循环取出这一层的所有节点\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            currentLevel.add(node.val);\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        result.add(currentLevel);\n    }', explanation: '🔑 关键：固定size循环，确保只处理当前层的节点，新加入的节点下一轮才处理。' },
      { title: '第3步：返回', description: '结束', code: '    return result;\n}', explanation: '返回二维列表。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        List<Integer> level = new ArrayList<>();\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            level.add(node.val);\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        result.add(level);\n    }\n    return result;\n}', explanation: '📊 复杂度：时间O(n)，空间O(n)（队列最大宽度）。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用BFS（广度优先搜索）。\\n\\n核心技巧：\\n1. 维护一个队列，初始加入root。\\n2. 外层循环判断队列不空。\\n3. 关键点：每次循环开始前记录queue.size()，这通过了当前层的节点数。\\n4. 内层循环size次，弹出节点加入结果，并把左右子节点加入队列。',
      timeComplexity: 'O(n)，访问每个节点一次',
      spaceComplexity: 'O(n)，队列中最多存放最宽一层的节点（约n/2）',
      followUp: [
        { question: 'DFS能做吗？', answer: '可以。递归时传入depth参数，check结果列表的大小，如果size <= depth，说明到了新的一层，add一个新的list。' }
      ]
    }
  },
  {
    id: 'sorted-array-to-bst',
    title: '将有序数组转换为二叉搜索树',
    titleEn: 'Convert Sorted Array to BST',
    category: 'binary-tree',
    difficulty: 'easy',
    description: '给你一个整数数组 nums，其中元素已经按升序排列，请你将其转换为一棵高度平衡二叉搜索树。',
    examples: [
      { input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explanation: '选中间元素作为根' },
      { input: 'nums = [1,3]', output: '[3,1]', explanation: '选3或1作为根都可以' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 题目要求什么？', hint: '高度平衡', answer: '把有序数组转成高度平衡的二叉搜索树（BST）。高度平衡意味着任意节点的左右子树高度差不超过1。' },
      { step: 2, question: '🤔 怎么保证平衡？', hint: '中间节点当根', answer: '因为数组是有序的，只有选中间的元素作为根节点，左右两边的元素数量才差不多，树高也就差不多。' },
      { step: 3, question: '📝 递归结构是怎么样的？', hint: '分治法', answer: '1. 取数组中间元素 mid 作为根；2. 递归左半部分构建左子树；3. 递归右半部分构建右子树。' },
      { step: 4, question: '🛑 终止条件是什么？', hint: '区间无效', answer: '当 left > right 时，说明区间为空，返回 null。' }
    ],
    codeSteps: [
      { title: '第1步：主函数', description: '调用递归', code: 'public TreeNode sortedArrayToBST(int[] nums) {\n    return build(nums, 0, nums.length - 1);\n}', explanation: '启动递归，传入整个数组的范围。' },
      { title: '第2步：处理终止条件', description: '区间无效', code: 'private TreeNode build(int[] nums, int left, int right) {\n    if (left > right) return null;\n    // 继续处理\n}', explanation: '空区间返回null，这是叶子节点的下一层。' },
      { title: '第3步：构造根节点', description: '取中间值', code: '    int mid = left + (right - left) / 2;\n    TreeNode root = new TreeNode(nums[mid]);', explanation: '选择中间位置，避免整型溢出的写法。' },
      { title: '第4步：递归构造子树', description: '左右拆分', code: '    root.left = build(nums, left, mid - 1);\n    root.right = build(nums, mid + 1, right);', explanation: '左边区间构建左子树，右边区间构建右子树。' },
      { title: '第5步：完整代码', description: '汇总', code: 'public TreeNode sortedArrayToBST(int[] nums) {\n    return build(nums, 0, nums.length - 1);\n}\n\nprivate TreeNode build(int[] nums, int left, int right) {\n    if (left > right) return null;\n    int mid = left + (right - left) / 2;\n    TreeNode root = new TreeNode(nums[mid]);\n    root.left = build(nums, left, mid - 1);\n    root.right = build(nums, mid + 1, right);\n    return root;\n}', explanation: '📊 复杂度：时间O(n)，空间O(logn)（递归栈）。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用分治法（递归）。\\n\\n因为数组是有序的，为了保证高度平衡，我们每次选择区间中点作为根节点。\\n\\n逻辑：\\n1. Base case：left > right 返回null。\\n2. 找中点 mid。\\n3. 递归 nums[left..mid-1] 构建左子树。\\n4. 递归 nums[mid+1..right] 构建右子树。',
      timeComplexity: 'O(n)，每个元素访问一次',
      spaceComplexity: 'O(log n)，递归栈深度',
      followUp: [
        { question: '链表怎么做？', answer: '如果不支持随机访问，可以用快慢指针找中点（O(nlogn)），或者利用类似中序遍历的思路构建（O(n)）。' }
      ]
    }
  },
  {
    id: 'validate-bst',
    title: '验证二叉搜索树',
    titleEn: 'Validate Binary Search Tree',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给你一个二叉树的根节点 root，判断其是否是一个有效的二叉搜索树。',
    examples: [
      { input: 'root = [2,1,3]', output: 'true', explanation: '满足BST性质' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: '4在5的右子树但小于5' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 什么是BST？', hint: '定义', answer: '二叉搜索树：对于任意节点，左子树所有值 < 根节点值 < 右子树所有值。注意是“整个子树”，不只是直接子节点。' },
      { step: 2, question: '❌ 常见的陷阱是什么？', hint: '只比父子', answer: '只判断 root.left < root < root.right 是不够的，例如 [5,4,6,null,null,3,7]，3在6的左边单比5小，这是不对的。' },
      { step: 3, question: '💡 如何保证子树所有值都符合要求？', hint: '传递范围', answer: '递归时携带上下界 (min, max)。左子树的上界变小，右子树的下界变大。' },
      { step: 4, question: '🔄 中序遍历有什么性质？', hint: '升序', answer: 'BST的中序遍历结果一定是严格递增的。这也是一种验证方法。' }
    ],
    codeSteps: [
      { title: '第1步：主函数', description: '启动递归', code: 'public boolean isValidBST(TreeNode root) {\n    return validate(root, null, null);\n}', explanation: '初始范围 (-∞, +∞)，用null表示无穷。' },
      { title: '第2步：终止条件', description: '空节点', code: 'private boolean validate(TreeNode node, Integer min, Integer max) {\n    if (node == null) return true;\n    // 继续判断\n}', explanation: '空树是有效的BST。' },
      { title: '第3步：判断当前值', description: '是否在范围内', code: '    if (min != null && node.val <= min) return false;\n    if (max != null && node.val >= max) return false;', explanation: '必须严格大于min且小于max。' },
      { title: '第4步：递归子树', description: '更新范围', code: '    return validate(node.left, min, node.val) \n        && validate(node.right, node.val, max);\n}', explanation: '左孩子不能超过当前值，右孩子不能小于当前值。' },
      { title: '第5步：完整代码', description: '汇总', code: 'public boolean isValidBST(TreeNode root) {\n    return validate(root, null, null);\n}\n\nprivate boolean validate(TreeNode node, Integer min, Integer max) {\n    if (node == null) return true;\n    if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n两种方法：\\n1. 递归带范围：validate(node, min, max)。递归左子树时更新max=node.val，递归右子树时更新min=node.val。\\n2. 中序遍历：检查结果是否严格递增。可以用pre变量记录前一个节点值。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '为什么用Integer不用int？', answer: '因为节点值可能是Integer.MIN_VALUE或MAX_VALUE，用null表示无穷大/小更安全。或者用Long。' }
      ]
    }
  },
  {
    id: 'kth-smallest-bst',
    title: '二叉搜索树中第K小的元素',
    titleEn: 'Kth Smallest Element in a BST',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给定一个二叉搜索树的根节点 root，和一个整数 k，请你设计一个算法查找其中第 k 个最小的元素。',
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1', explanation: '最小元素是1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3', explanation: '第3小是3' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 题目求什么？', hint: '第k小', answer: '在二叉搜索树（BST）中找到第k小的元素。BST的特点是左 < 根 < 右。' },
      { step: 2, question: '💡 BST有什么重要性质？', hint: '有序', answer: 'BST的中序遍历（左-根-右）生成的序列是严格升序的。' },
      { step: 3, question: '🤔 怎么利用这个性质？', hint: '计数', answer: '进行中序遍历，每访问一个节点，计数器+1。当计数器等于k时，当前节点就是答案。' },
      { step: 4, question: '⏩ 能提前停止吗？', hint: '找到后', answer: '是的，一旦计数器达到k，记录结果并停止递归，不需要遍历剩余节点。' }
    ],
    codeSteps: [
      { title: '第1步：定义成员变量', description: '计数器和结果', code: 'class Solution {\n    private int count = 0;\n    private int result = 0;\n}', explanation: '使用全局变量方便在递归中更新状态。' },
      { title: '第2步：主函数', description: '启动遍历', code: 'public int kthSmallest(TreeNode root, int k) {\n    inorder(root, k);\n    return result;\n}', explanation: '启动中序遍历。' },
      { title: '第3步：递归中序遍历', description: '计数并判断', code: 'private void inorder(TreeNode node, int k) {\n    if (node == null) return;\n    inorder(node.left, k);  // 左\n    \n    count++;\n    if (count == k) {\n        result = node.val;\n        return;\n    }\n    \n    inorder(node.right, k); // 右\n}', explanation: '注意：找到这一步需要某种机制停止递归（这里是用count判断，但右子树还是会遍历一部分，优化可以用标记位）' },
      { title: '第4步：完整代码', description: '汇总', code: 'class Solution {\n    private int count = 0;\n    private int result = 0;\n    public int kthSmallest(TreeNode root, int k) {\n        inorder(root, k);\n        return result;\n    }\n    private void inorder(TreeNode node, int k) {\n        if (node == null) return;\n        inorder(node.left, k);\n        count++;\n        if (count == k) {\n            result = node.val;\n            return;\n        }\n        inorder(node.right, k);\n    }\n}', explanation: '📊 复杂度：时间O(H+k)，空间O(H)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n利用BST的中序遍历有序性。\\n\\n维护一个全局计数器count，进行中序遍历。每访问一个节点count++，当count等于k时，当前节点就是第k小的元素。',
      timeComplexity: 'O(H+k)，H是树高，只需要遍历前k个元素',
      spaceComplexity: 'O(H)，递归栈深度',
      followUp: [
        { question: '如果频繁查询怎么优化？', answer: '在TreeNode中维护子树大小（size）。这样就可以像二分查找一样，O(H)时间定位第k小。' }
      ]
    }
  },
  {
    id: 'right-side-view',
    title: '二叉树的右视图',
    titleEn: 'Binary Tree Right Side View',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给定一个二叉树的根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。',
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]', explanation: '每层最右边的节点' },
      { input: 'root = [1,null,3]', output: '[1,3]', explanation: '右侧视图' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 右视图看到的是哪些节点？', hint: '每层最右', answer: '想象从右边看这棵树，每一层只能看到最右边的一个节点。注意，不一定是右子节点，如果右边缺失，左子节点也能被看到。' },
      { step: 2, question: '🤔 怎么拿到每一层的最右节点？', hint: 'BFS', answer: '最直观的方法是层序遍历（BFS）。遍历每一层时，只把最后一个节点加入结果列表。' },
      { step: 3, question: '💡 DFS能做吗？', hint: '先右后左', answer: '可以。如果我们按照“根 -> 右 -> 左”的顺序遍历，那么每一层第一个被访问到的节点，一定是最右边的节点。' },
      { step: 4, question: '📝 DFS怎么判断是该层第一个？', hint: '深度vs结果集', answer: '记录当前深度depth。如果result.size() == depth，说明这一层还没加过节点，当前就是最右节点。' }
    ],
    codeSteps: [
      { title: '第1步：方法选择', description: '推荐BFS', code: 'public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    // 循环...\n}', explanation: 'BFS逻辑清晰，容易理解。' },
      { title: '第2步：循环处理每层', description: '取最后一个', code: 'while (!queue.isEmpty()) {\n    int size = queue.size();\n    for (int i = 0; i < size; i++) {\n        TreeNode node = queue.poll();\n        if (i == size - 1) {  // 这一层的最后一个\n            result.add(node.val);\n        }\n        // 加入子节点\n        if (node.left != null) queue.offer(node.left);\n        if (node.right != null) queue.offer(node.right);\n    }\n}', explanation: '只在 i == size-1 时记录结果。' },
      { title: '第3步：返回结果', description: '汇总', code: 'return result;', explanation: '返回列表。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public List<Integer> rightSideView(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    \n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            if (i == size - 1) result.add(node.val);\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n    }\n    return result;\n}', explanation: '📊 复杂度：时间O(n)，空间O(n)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n推荐BFS层序遍历。每次处理一层时，只将这一层的最后一个节点加入结果集中。\\n\\nDFS解法也很巧妙：按照根-右-左的顺序遍历，每当访问到一个新的深度时（result.size() == depth），记录当前节点。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(n)，队列最大宽度',
      followUp: [
        { question: '左视图怎么做？', answer: 'BFS每层取第一个；或者DFS按根-左-右顺序，每层第一个记录。' }
      ]
    }
  },
  {
    id: 'flatten-tree',
    title: '二叉树展开为链表',
    titleEn: 'Flatten Binary Tree to Linked List',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给你二叉树的根结点 root，请你将它展开为一个单链表。展开后的单链表应该同样使用 TreeNode，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null。',
    examples: [
      { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]', explanation: '前序遍历顺序' },
      { input: 'root = []', output: '[]', explanation: '空树' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 展开后的样子？', hint: '单链表', answer: '展开成一个只有右子节点的单链表，顺序是前序遍历（根-左-右）。' },
      { step: 2, question: '🤔 怎么把左子树移到右边？', hint: '插入', answer: '对于任意节点，如果它有左子树，应该把左子树放到右子树的位置，而原来的右子树接到左子树的“最右”节点后面。' },
      { step: 3, question: '🔄 具体流程是怎样的？', hint: '迭代', answer: '1. 找到当前节点的左子树；2. 找到左子树的最右节点；3. 把当前节点的右子树接到它后面；4. 把左子树移到右边；5. 左子树置空。' },
      { step: 4, question: '📝 需要辅助空间吗？', hint: 'O(1)', answer: '不需要，可以在遍历过程中原地修改指针。' }
    ],
    codeSteps: [
      { title: '第1步：主循环', description: '遍历每个节点', code: 'public void flatten(TreeNode root) {\n    TreeNode curr = root;\n    while (curr != null) {\n        // 处理当前节点\n        if (curr.left != null) {\n            // ...\n        }\n        curr = curr.right;\n    }\n}', explanation: '一直向右遍历链表化的树。' },
      { title: '第2步：处理左子树', description: '寻找前驱节点', code: '            TreeNode next = curr.left;\n            TreeNode predecessor = next;\n            // 找左子树的最右节点\n            while (predecessor.right != null) {\n                predecessor = predecessor.right;\n            }', explanation: '前驱节点是前序遍历中curr的左子树的最后一个节点。' },
      { title: '第3步：指针重连', description: '拼接', code: '            predecessor.right = curr.right; // 原右子树接在最右节点后\n            curr.right = next;              // 左子树移到右边\n            curr.left = null;               // 左指针置空', explanation: '完成一次“插入”操作。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public void flatten(TreeNode root) {\n    TreeNode curr = root;\n    while (curr != null) {\n        if (curr.left != null) {\n            TreeNode next = curr.left;\n            TreeNode predecessor = next;\n            while (predecessor.right != null) {\n                predecessor = predecessor.right;\n            }\n            predecessor.right = curr.right;\n            curr.right = next;\n            curr.left = null;\n        }\n        curr = curr.right;\n    }\n}', explanation: '📊 复杂度：时间O(n)，空间O(1)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n寻找前驱节点法（Morris遍历的变种）。\\n\\n对于每个节点，如果有左子树：\\n1. 找到左子树的最右节点（前驱）。\\n2. 将当前节点的右子树拼接到前驱节点的右边。\\n3. 将左子树移到当前节点的右边，做边置空。\\n4. 继续处理下一个节点。',
      timeComplexity: 'O(n)，每个节点被访问常数次',
      spaceComplexity: 'O(1)，原地修改',
      followUp: [
        { question: '递归法怎么写？', answer: '后序遍历（右-左-根）。维护一个prev指针，每次 current.right = prev; current.left = null; prev = current。' }
      ]
    }
  },
  {
    id: 'construct-tree',
    title: '从前序与中序遍历序列构造二叉树',
    titleEn: 'Construct Binary Tree from Preorder and Inorder',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给定两个整数数组 preorder 和 inorder，其中 preorder 是二叉树的前序遍历，inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。',
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]', explanation: '根据遍历序列重建' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]', explanation: '单节点' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 从哪里找到根节点？', hint: '前序/中序特性', answer: '前序遍历的第一个元素就是根节点。' },
      { step: 2, question: '🤔 怎么区分左右子树？', hint: '中序遍历', answer: '拿到根节点后，去中序遍历数组中找到它的位置。在它左边的就是左子树的所有节点，右边的就是右子树的所有节点。' },
      { step: 3, question: '🔄 接下来怎么做？', hint: '递归', answer: '有了根节点和左右子树的节点数量，就可以把前序数组也分成两部分。对左右子树分别递归重复上述过程。' },
      { step: 4, question: '💡 怎么快速找位置？', hint: '哈希表', answer: '每次遍历中序数组找根太慢了，可以用哈希表预存 value -> index 的映射。' }
    ],
    codeSteps: [
      { title: '第1步：预处理', description: '建立哈希映射', code: 'private Map<Integer, Integer> indexMap = new HashMap<>();\n\npublic TreeNode buildTree(int[] preorder, int[] inorder) {\n    for (int i = 0; i < inorder.length; i++) {\n        indexMap.put(inorder[i], i);\n    }\n    return build(preorder, 0, preorder.length - 1, 0, inorder.length - 1);\n}', explanation: 'O(1)时间查询值在中序数组中的位置。' },
      { title: '第2步：递归函数签名', description: '传入当前子树的范围', code: 'private TreeNode build(int[] preorder, int preStart, int preEnd, int inStart, int inEnd) {\n    if (preStart > preEnd) return null; // 终止条件\n    // ...\n}', explanation: '使用索引范围而不是切片数组，避免大量拷贝。' },
      { title: '第3步：构造当前节点', description: '确定根', code: '    int rootVal = preorder[preStart];\n    TreeNode root = new TreeNode(rootVal);\n    int inRootIndex = indexMap.get(rootVal);\n    int leftSize = inRootIndex - inStart;', explanation: '计算左子树的大小，这对于划分前序数组至关重要。' },
      { title: '第4步：递归子树', description: '准确划分区间', code: '    root.left = build(preorder, preStart + 1, preStart + leftSize, inStart, inRootIndex - 1);\n    root.right = build(preorder, preStart + leftSize + 1, preEnd, inRootIndex + 1, inEnd);\n    return root;', explanation: '前序：[根 | 左子树 | 右子树]，中序：[左子树 | 根 | 右子树]。' },
      { title: '第5步：完整代码', description: '汇总', code: 'private Map<Integer, Integer> indexMap = new HashMap<>();\npublic TreeNode buildTree(int[] preorder, int[] inorder) {\n    for (int i = 0; i < inorder.length; i++) indexMap.put(inorder[i], i);\n    return build(preorder, 0, preorder.length - 1, 0, inorder.length - 1);\n}\nprivate TreeNode build(int[] preorder, int preStart, int preEnd, int inStart, int inEnd) {\n    if (preStart > preEnd) return null;\n    int rootVal = preorder[preStart];\n    TreeNode root = new TreeNode(rootVal);\n    int inRootIndex = indexMap.get(rootVal);\n    int leftSize = inRootIndex - inStart;\n    root.left = build(preorder, preStart + 1, preStart + leftSize, inStart, inRootIndex - 1);\n    root.right = build(preorder, preStart + leftSize + 1, preEnd, inRootIndex + 1, inEnd);\n    return root;\n}', explanation: '📊 复杂度：时间O(n)，空间O(n)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n核心思想：前序确定根，中序切分左右。\\n\\n1. 使用HashMap存储inorder的索引，优化查找。\\n2. 定义递归函数：根据当前的前序范围和中序范围构建树。\\n3. 取前序第一个元素为根。\\n4. 在inorder中找到根的位置，算出左子树的大小size。\\n5. 递归构建左子树（前序后移1位，长度size）和右子树。',
      timeComplexity: 'O(n)，构建每个节点',
      spaceComplexity: 'O(n)，哈希表 + 递归栈',
      followUp: [
        { question: '从中序和后序构造？', answer: '后序的最后一个是根，逻辑类似，只是需要反向思考（先右后左更方便索引计算）。' }
      ]
    }
  },
  {
    id: 'path-sum-iii',
    title: '路径总和 III',
    titleEn: 'Path Sum III',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给定一个二叉树的根节点 root，和一个整数 targetSum，求该二叉树里节点值之和等于 targetSum 的路径的数目。',
    examples: [
      { input: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8', output: '3', explanation: '路径：5→3, 5→2→1, -3→11' },
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '3', explanation: '三条路径' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 暴力破解怎么做？', hint: '双重递归', answer: '对每个节点，都计算以它为起点的路径和。需要两层DFS，时间复杂度O(n²)，在最坏情况下（链状）很慢。' },
      { step: 2, question: '💡 能优化吗？', hint: '前缀和', answer: '类比数组题目“和为K的子数组”。如果记录从根到当前节点的路径和（currSum），那么target sum对应的就是 `currSum - target` 是否在之前出现过。' },
      { step: 3, question: '🔄 树与数组有什么不同？', hint: '回溯', answer: '树有分叉。当我们遍历完左子树回到根节点，再去右子树时，左子树的前缀和就不应该存在了。所以需要回溯（backtrack）。' },
      { step: 4, question: '📝 具体流程？', hint: 'Map', answer: '用Map记录前缀和出现的次数。进入节点时add，递归子节点，离开节点时remove。' }
    ],
    codeSteps: [
      { title: '第1步：主函数', description: '初始化', code: 'public int pathSum(TreeNode root, int targetSum) {\n    Map<Long, Integer> prefixSum = new HashMap<>();\n    // 前缀和为0出现1次（代表路径即为当前完整前缀）\n    prefixSum.put(0L, 1);\n    return dfs(root, 0L, targetSum, prefixSum);\n}', explanation: '注意使用Long类型防止溢出。' },
      { title: '第2步：DFS递归', description: '更新与查询', code: 'private int dfs(TreeNode node, long currSum, int target, Map<Long, Integer> prefixSum) {\n    if (node == null) return 0;\n    currSum += node.val;\n    // 核心：查找 currSum - target 的个数\n    int count = prefixSum.getOrDefault(currSum - target, 0);\n    // 更新当前前缀和\n    prefixSum.put(currSum, prefixSum.getOrDefault(currSum, 0) + 1);\n    // ...递归\n}', explanation: '当前路径和减去目标值，如果在map中存在，说明中间有一段和为target。' },
      { title: '第3步：递归与回溯', description: '左右与恢复', code: '    count += dfs(node.left, currSum, target, prefixSum);\n    count += dfs(node.right, currSum, target, prefixSum);\n    // 回溯：离开当前节点，移除其前缀和\n    prefixSum.put(currSum, prefixSum.get(currSum) - 1);\n    return count;\n}', explanation: '必须回溯，因为该前缀和只对当前节点的子节点有效。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public int pathSum(TreeNode root, int targetSum) {\n    Map<Long, Integer> map = new HashMap<>();\n    map.put(0L, 1);\n    return dfs(root, 0L, targetSum, map);\n}\nprivate int dfs(TreeNode node, long curr, int target, Map<Long, Integer> map) {\n    if (node == null) return 0;\n    curr += node.val;\n    int res = map.getOrDefault(curr - target, 0);\n    map.put(curr, map.getOrDefault(curr, 0) + 1);\n    res += dfs(node.left, curr, target, map);\n    res += dfs(node.right, curr, target, map);\n    map.put(curr, map.get(curr) - 1);\n    return res;\n}', explanation: '📊 复杂度：时间O(n)，空间O(n)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n最优解是前缀和 + DFS回溯。\\n\\n1. 维护一个Map记录从根到当前路径上各种前缀和出现的次数。\\n2. 初始化Map.put(0, 1)。\\n3. DFS遍历：currSum += val。\\n4. 累加结果：res += Map.get(currSum - target)。\\n5. 将currSum放入Map。\\n6. 递归左右子树。\\n7. 关键回溯：Map.put(currSum, count - 1)。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(n)，哈希表最大存储树的深度个元素（不平衡时为n）',
      followUp: [
        { question: '如果不允许用额外空间？', answer: '那就只能用双重递归方案，时间复杂度Degrade到O(n²)。' }
      ]
    }
  },
  {
    id: 'lowest-common-ancestor',
    title: '二叉树的最近公共祖先',
    titleEn: 'Lowest Common Ancestor of a Binary Tree',
    category: 'binary-tree',
    difficulty: 'medium',
    description: '给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explanation: '5和1的最近公共祖先是3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5', explanation: '5是4的祖先' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 什么是LCA？', hint: '公共祖先', answer: '最近公共祖先（LCA）是离两个节点最近的、同时是它们祖先的节点。' },
      { step: 2, question: '🤔 递归怎么思考？', hint: '后序遍历', answer: '对于当前节点 root，我们想知道 p 和 q 是否在它的子树中。' },
      { step: 3, question: '🛑 终止条件是什么？', hint: '空或匹配', answer: '1. 如果 root 为空，返回 null。2. 如果 root 是 p 或 q，那它自己就是候选LCA（或者p是q的祖先这种特殊情况），返回 root。' },
      { step: 4, question: '💡 如何处理返回值？', hint: '左右', answer: '如果左子树和右子树都找到了（都不为空），说明 p 和 q 分布在 root 两侧，root 就是 LCA。如果只有一边找到了，说明 p 和 q 都在那一边，返回那一边的结果。' }
    ],
    codeSteps: [
      { title: '第1步：终止条件', description: '基础检查', code: 'public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) {\n        return root;\n    }\n    // ...递归\n}', explanation: '只要当前节点是p或q，就返回自己。这意味着告诉父节点“我找到了p或q”。' },
      { title: '第2步：递归左右子树', description: '寻找目标', code: '    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);', explanation: '去左边找找有没有p或q，去右边找找有没有p或q。' },
      { title: '第3步：合并结果', description: '判断LCA', code: '    if (left != null && right != null) {\n        return root; // 两边都找到了，当前节点是LCA\n    }\n    return left != null ? left : right; // 否则返回找到的那一边\n}', explanation: '如果两边都不为空，说明p,q分居两侧。如果有为空，说明都在非空的那一侧。' },
      { title: '第4步：完整代码', description: '汇总', code: 'public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用递归法（后序遍历）。\\n\\n1. Base case：如果root为空，或root等于p或q，直接返回root。\\n2. 递归查找左右子树：得到left和right。\\n3. 判断：\\n   - 如果left和right都不为空，说明p、q分列在root两侧，root就是LCA，返回root。\\n   - 如果只有一个不为空，说明p、q都在那一侧，直接返回那个不为空的返回值。',
      timeComplexity: 'O(n)，访问每个节点一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '如果是二叉搜索树（BST）？', answer: '利用值大小：如果p,q都小于root，去左边找；都大于root，去右边找；一小一大，root就是LCA。' }
      ]
    }
  },
  {
    id: 'max-path-sum',
    title: '二叉树中的最大路径和',
    titleEn: 'Binary Tree Maximum Path Sum',
    category: 'binary-tree',
    difficulty: 'hard',
    description: '给你一个二叉树的根节点 root，返回其最大路径和。路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。',
    examples: [
      { input: 'root = [1,2,3]', output: '6', explanation: '路径2→1→3' },
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explanation: '路径15→20→7' }
    ],
    thinkingGuide: [
      { step: 1, question: '🎯 路径的定义是什么？', hint: '任意起点终点', answer: '路径可以从任意节点开始，到任意节点结束，但必须沿着父子连接。注意：路径可以“拐弯”经过根节点。' },
      { step: 2, question: '🤔 以一个节点为“转折点”的路径和怎么算？', hint: '左+右+根', answer: '如果是穿过当前节点 root 的路径，最大和 = root.val + max(左子树贡献, 0) + max(右子树贡献, 0)。' },
      { step: 3, question: '🔄 节点能向父节点“贡献”多大的和？', hint: '不拐弯', answer: '向父节点汇报时，路径只能走一边（不能分叉）。maxGain = root.val + max(左, 右, 0)。' },
      { step: 4, question: '📝 为什么负数要取0？', hint: '舍弃', answer: '如果子树的最大贡献是负数，那还不如不选它（断开连接），所以取 max(gain, 0)。' }
    ],
    codeSteps: [
      { title: '第1步：定义成员变量', description: '全局最大值', code: 'class Solution {\n    // 初始化为最小值，防止全为负数时出错\n    int maxSum = Integer.MIN_VALUE;\n}', explanation: '我们需要遍历所有节点作为“转折点”的情况，取最大值。' },
      { title: '第2步：递归函数', description: '计算最大单边贡献', code: 'private int maxGain(TreeNode node) {\n    if (node == null) return 0;\n    // 递归计算左右子树最大贡献，只有正数才要\n    int leftGain = Math.max(maxGain(node.left), 0);\n    int rightGain = Math.max(maxGain(node.right), 0);\n    // ...\n}', explanation: '后序遍历，先拿到子结果。' },
      { title: '第3步：更新全局最大值', description: '计算穿过当前节点的路径', code: '    // 当前节点作为“拐点”时的最大路径和\n    int currentPathSum = node.val + leftGain + rightGain;\n    maxSum = Math.max(maxSum, currentPathSum);\n    \n    // 返回给父节点：只能选一边\n    return node.val + Math.max(leftGain, rightGain);\n}', explanation: '更新全局最大值，但返回只能返回单边路径。' },
      { title: '第4步：完整代码', description: '汇总', code: 'class Solution {\n    int maxSum = Integer.MIN_VALUE;\n    public int maxPathSum(TreeNode root) {\n        maxGain(root);\n        return maxSum;\n    }\n    private int maxGain(TreeNode node) {\n        if (node == null) return 0;\n        int left = Math.max(maxGain(node.left), 0);\n        int right = Math.max(maxGain(node.right), 0);\n        maxSum = Math.max(maxSum, node.val + left + right);\n        return node.val + Math.max(left, right);\n    }\n}', explanation: '📊 复杂度：时间O(n)，空间O(h)。' }
    ],
    interview: {
      approach: '【面试回答模板】\\n\\n使用递归。对于每个节点，我们需要计算两件事：\\n1. **贡献值**（返回给父节点）：只能包含左子树或右子树中的一条（或者都不选），即 `node.val + max(left, right, 0)`。\\n2. **更新全局最大和**：假设当前节点是路径的最高点（可以连接左右），即 `node.val + left + right`。\\n\\n维护一个全局变量maxSum，在递归过程中不断更新。',
      timeComplexity: 'O(n)，每个节点访问一次',
      spaceComplexity: 'O(h)，递归栈深度',
      followUp: [
        { question: '如果全是负数？', answer: 'maxSum初始化为MIN_VALUE，逻辑依然成立，会选最大的那个负数（单个节点）。' }
      ]
    }
  },
];

// 导出新题目
export const newProblems = binaryTreeProblems;
