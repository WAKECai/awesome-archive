---
# ===== 客观信息（AI Agent 抓取仓库真实数据填写）=====
name: Graphify
github: https://github.com/Graphify-Labs/graphify
category: 02-ai-skills
tagline: 把整个代码库变成可查询的知识图谱的 Agent 技能
stack: Python, tree-sitter
tags: Agent技能, 代码理解, 知识图谱, 开发效率
status: active
# 快照信息（用于回溯，approximate）
stars: 4000
updated: 2026-08-08

# ===== 主观信息（手动补充）=====
---

# Graphify

> 把整个代码库变成可查询的知识图谱的 Agent 技能

## 它解决什么问题

AI 编码助手面对大代码库时靠 grep 逐个文件探索，低效且烧 token。

## 为什么收藏它

以 /graphify 技能把仓库（含文档、SQL、配置、PDF）映射成带 EXTRACTED/INFERRED 边标签的知识图谱，本地确定性子解析(不调 LLM)，可「查图代替 grep」。

## 我的笔记

核心价值是边缘标注来源（提取 vs 推断），避免把推断当事实。适合接进 Claude Code/Cursor/Codex 的每日工作流。

## 技术栈与状态

- 技术栈：Python, tree-sitter
- 状态：active
- 链接：https://github.com/Graphify-Labs/graphify
