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
};

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (extname(entry) === '.md' && !entry.startsWith('_') && entry !== 'README.md') {
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
    return {
      slug,
      relPath,
      category: frontmatter.category || '未分类',
      categoryName: CATEGORY_NAMES[frontmatter.category] || frontmatter.category || '未分类',
      name: frontmatter.name || slug,
      github: frontmatter.github || '',
      tagline: frontmatter.tagline || '',
      stack: (frontmatter.stack || '').split(',').map((s) => s.trim()).filter(Boolean),
      status: frontmatter.status || '',
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

  const data = {
    generatedAt: new Date().toISOString(),
    total: items.length,
    categories: Object.entries(byCategory).map(([name, list]) => ({ name, items: list })),
    items,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ 已生成 ${OUT_FILE}  (${items.length} 个项目)`);
}

build();