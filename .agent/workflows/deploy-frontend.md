---
description: 部署前端项目到 GitHub Pages 和 Vercel 的完整流程
---

# 前端项目双平台部署指南

本 skill 用于将前端项目（React/Vue/Vite 等）部署到 GitHub Pages 和 Vercel，实现双平台访问。

---

## 前置条件

1. 项目已推送到 GitHub 仓库
2. 用户已有 GitHub 账号
3. 用户已有 Vercel 账号（可选，用于中国访问加速）

---

## 第一阶段：项目分析

### 1.1 检查项目类型和配置
```bash
# 检查 package.json 确定项目类型
cat package.json | grep -E "(vite|webpack|next|react|vue)"

# 检查当前分支
git branch -a
```

### 1.2 识别构建配置
- **Vite 项目**: 查看 `vite.config.ts` 或 `vite.config.js`
- **Webpack 项目**: 查看 `webpack.config.js`
- **Next.js 项目**: 查看 `next.config.js`

### 1.3 识别输出目录
常见输出目录：
- Vite: `dist` 或 `dist/public`
- Create React App: `build`
- Next.js: `out` (静态导出)

---

## 第二阶段：GitHub Pages 部署

### 2.1 创建 GitHub Actions 工作流

创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master  # ⚠️ 注意：根据实际分支名修改（master 或 main）

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm run build
        env:
          GITHUB_ACTIONS: true  # 触发 GitHub Pages base 路径
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'  # ⚠️ 修改为实际输出目录
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2.2 配置 Vite base 路径（重要！）

修改 `vite.config.ts`，添加环境感知的 base 路径：

```typescript
// 根据部署环境选择 base 路径
const getBase = () => {
  if (process.env.VERCEL) return '/';
  if (process.env.GITHUB_ACTIONS) return '/repo-name/';  // ⚠️ 替换为仓库名
  return '/';
};

export default defineConfig({
  base: getBase(),
  // ... 其他配置
});
```

### 2.3 配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 等待 Actions 工作流执行完成

### 2.4 常见错误排查

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 404 错误 | workflow 分支名错误 | 检查 `on.push.branches` 是否与实际分支一致 |
| 资源加载失败 | base 路径未配置 | 添加 `base: '/repo-name/'` |
| 白屏 | SPA 路由问题 | 确保有 404.html 或正确的路由配置 |

---

## 第三阶段：Vercel 部署（中国访问加速）

### 3.1 创建 vercel.json 配置

在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> ⚠️ **注意**：`outputDirectory` 需要与项目实际输出目录一致

### 3.2 在 Vercel 创建项目

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. 选择正确的 **Root Directory**（通常是 `.`）
4. Vercel 会自动检测框架类型

### 3.3 配置生产分支（重要！）

如果代码在 `master` 分支而不是 `main` 分支：

**方法一：切换生产分支**
1. 进入项目设置 → **Domains**
2. 找到环境设置，将 Production 环境关联到 `master` 分支

**方法二：手动提升部署**
1. 进入 **Deployments** 页面
2. 找到 `master` 分支的最新部署
3. 点击菜单，选择 **Promote to Production**

### 3.4 常见错误排查

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 404 NOT_FOUND | base 路径配置为 GitHub Pages 格式 | 使用环境变量动态设置 base |
| 主域名 404 | 生产分支绑定错误 | 将正确分支提升为生产版本 |
| 路由 404 | SPA 路由未配置 | 在 vercel.json 添加 rewrites |

---

## 第四阶段：验证部署

### 4.1 访问链接确认

```plaintext
GitHub Pages: https://<username>.github.io/<repo-name>/
Vercel: https://<project-name>.vercel.app/
```

### 4.2 测试清单

- [ ] 首页正常加载
- [ ] 页面路由正常跳转
- [ ] 静态资源（图片、CSS、JS）正常加载
- [ ] 刷新页面不会 404

---

## 完整代码模板

### vite.config.ts 模板

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 环境感知 base 路径
const getBase = () => {
  if (process.env.VERCEL) return '/';
  if (process.env.GITHUB_ACTIONS) return '/your-repo-name/';
  return '/';
};

export default defineConfig({
  base: getBase(),
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
});
```

### vercel.json 模板

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/public",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### .github/workflows/deploy.yml 模板

见上方 2.1 节。

---

## 快速执行清单

// turbo-all

1. 确认当前分支名：`git branch --show-current`
2. 创建 `.github/workflows/deploy.yml`
3. 修改 `vite.config.ts` 添加环境感知 base 路径
4. 创建 `vercel.json` 配置文件
5. 提交并推送：`git add . && git commit -m "Add deployment configs" && git push`
6. 在 GitHub 设置 Pages 使用 GitHub Actions
7. 在 Vercel 导入项目并确认生产分支
8. 验证两个平台是否正常访问
