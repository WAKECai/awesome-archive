# 开源项目归档 · awesome-archive

逛 GitHub 时收藏的好项目，记录**为什么值得存**。纯静态站点，Markdown 为唯一真相源。

- 在线访问：<https://wakecai.github.io/awesome-archive/>
- 技术栈：Astro + GitHub Actions + GitHub Pages

## 快速开始

```bash
npm install
npm run dev      # 本地预览 http://localhost:4321
npm run build    # 生成数据 + 构建（产物在 dist/）
```

## 如何维护

- **新增/修改/删除项目**：编辑 `archive/` 下的 Markdown，然后 `npm run build`。
- **详细流程、字段说明、常见问题**：见 [docs/维护手册.md](docs/维护手册.md)。

> ⚠️ `src/data/archives.json` 由 `scripts/build-data.mjs` 自动生成，请勿手动编辑。

## 目录

```
archive/            # 内容区（唯一真相源）
├── 01-foundations/    基础 / 教育
├── 02-ai-skills/      AI 编程技能
├── 03-ai-agents/      AI 智能体与应用
├── 04-computer-vision/ 计算机视觉
├── 05-dev-tools/      开发工具与框架
├── 06-apps/           应用与娱乐
├── 07-websites/       资源与网站
└── _template.md       新建项目模板
```

## 发布

推送到 `main` 分支即自动部署（GitHub Actions）：`git push origin main`。