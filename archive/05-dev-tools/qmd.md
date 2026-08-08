---
# ===== 客观信息（AI Agent 抓取仓库真实数据填写）=====
name: QMD
github: https://github.com/tobi/qmd
category: 05-dev-tools
tagline: 本地 Markdown 文档/知识库的微型 CLI 混合搜索引擎
stack: TypeScript, SQLite, llama.cpp
tags: 搜索, 知识库, 本地, CLI, MCP, 离线
status: active
# 快照信息（用于回溯，approximate）
stars: 2500
updated: 2026-08-08

# ===== 主观信息（手动补充）=====
---

# QMD

> 本地 Markdown 文档/知识库的微型 CLI 混合搜索引擎

## 它解决什么问题

本地 Markdown 笔记、文档、会议记录多起来后，缺一个能关键词 + 自然语言搜索的轻量引擎。

## 为什么收藏它

SQLite FTS5 BM25 + sqlite-vec 向量检索 + 本地 GGUF 模型（embedding/重排/查询扩展）全离线，提供 CLI、SDK、MCP server。

## 我的笔记

为 Agentic 工作流打造，可接 MCP 让 Agent 检索本地知识库。与 [[obsidian-skills]]、[[files.md]] 的知识管理生态互补。

## 技术栈与状态

- 技术栈：TypeScript, SQLite, llama.cpp
- 状态：active
- 链接：https://github.com/tobi/qmd
