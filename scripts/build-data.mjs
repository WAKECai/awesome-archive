// build-data.mjs
// 从 archive/**/*.md 解析出站点数据 JSON（唯一真相源 = Markdown）
// 产物: src/data/archives.json
// 用法: node scripts/build-data.mjs   （ASTRO_BUILD 由 npm run build 传入）

import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename, extname, relative } from 'node:path';

const ROOT = process.cwd();
const ARCHIVE_DIR = join(ROOT, 'archive');
const OUT_DIR = join(ROOT, 'src', 'data');
const OUT_FILE = join(OUT_DIR, 'archives.json');

// 分类目录的显示名映射（可扩展）
const CATEGORY_NAMES = {
  '01-foundations': '基础 / 教育',
  '02-ai-skills': 'AI 编程技能',
  '03-ai-agents': 'AI 智能体与应用',
  '04-computer-vision': '计算机视觉',
  '05-dev-tools': '开发工具与框架',
  '06-apps': '应用与娱乐',
  '07-websites': '资源与网站',
};

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (extname(entry) === '.md' && !entry.startsWith('.') && !entry.startsWith('_') && entry !== 'README.md') {
      out.push(full);
    }
  }
  return out;
}

// 解析 YAML frontmatter（极简解析，覆盖本项目用到的标量字段）
function parseFrontmatter(content) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(content);
  if (!m) return { frontmatter: {}, body: content };
  const raw = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    raw[key] = val;
  }
  return { frontmatter: raw, body: content.slice(m[0].length) };
}

function build() {
  const files = walk(ARCHIVE_DIR);
  const items = files.map((file) => {
    const content = readFileSync(file, 'utf8');
    const { frontmatter, body } = parseFrontmatter(content);
    const relPath = relative(ARCHIVE_DIR, file).replace(/\\/g, '/');
    const slug = basename(file, '.md');
    // 从正文提取各小节（用于展示）
    const sections = {};
    const bodyLines = body.split(/\r?\n/);
    let current = null;
    for (const line of bodyLines) {
      const h = /^## (.+)$/.exec(line.trim());
      if (h) { current = h[1]; sections[current] = []; continue; }
      if (current) sections[current].push(line);
    }
    // 从 GitHub 仓库 URL 解析属主名，用于取属主头像作为项目图标
    const ownerMatch = /github\.com\/([^/]+)/.exec(frontmatter.github || '');
    return {
      slug,
      relPath,
      owner: ownerMatch ? ownerMatch[1] : '',
      category: frontmatter.category || '未分类',
      categoryName: CATEGORY_NAMES[frontmatter.category] || frontmatter.category || '未分类',
      name: frontmatter.name || slug,
      github: frontmatter.github || '',
      website: frontmatter.website || '',
      // 多链接：格式 "名称|URL; 名称|URL"，用于聚合条目（如一个归档包含多个网站）
      links: (frontmatter.links || '').split(';').map((s) => s.trim()).filter(Boolean).map((s) => {
        const [name, url] = s.split('|').map((x) => x.trim());
        return url ? { name: name || url, url } : null;
      }).filter(Boolean),
      tagline: frontmatter.tagline || '',
      stack: (frontmatter.stack || '').split(',').map((s) => s.trim()).filter(Boolean),
      tags: (frontmatter.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
      status: frontmatter.status || '',
      featured: frontmatter.featured === 'true',
      stars: Number(frontmatter.stars) || 0,
      updated: frontmatter.updated || '',
      sections,
    };
  });

  // 按分类分组
  const byCategory = {};
  for (const it of items) {
    (byCategory[it.categoryName] ||= []).push(it);
  }

  // 汇总全部标签（去重，按出现次数降序），用于站点端筛选
  const tagCounts = {};
  for (const it of items) {
    for (const t of it.tags) tagCounts[t] = (tagCounts[t] || 0) + 1;
  }
  const tags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));

  const data = {
    generatedAt: new Date().toISOString(),
    total: items.length,
    tags,
    categories: Object.entries(byCategory).map(([name, list]) => ({ name, items: list })),
    items,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ 已生成 ${OUT_FILE}  (${items.length} 个项目)`);
}

build();