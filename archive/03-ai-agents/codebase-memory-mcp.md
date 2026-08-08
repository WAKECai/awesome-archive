---
# ===== 客观信息（AI Agent 抓取仓库真实数据填写）=====
name: Codebase Memory MCP
github: https://github.com/DeusData/codebase-memory-mcp
category: 03-ai-agents
tagline: 用纯 C 单二进制实现的极速代码智能 MCP 服务
stack: C, SQLite, tree-sitter
tags: MCP, 代码理解, 知识图谱, 性能, 开发效率
status: active
# 快照信息（用于回溯，approximate）
stars: 2200
updated: 2026-08-08

# ===== 主观信息（手动补充）=====
---

# Codebase Memory MCP

> 用纯 C 单二进制实现的极速代码智能 MCP 服务

## 它解决什么问题

AI 代理理解大型代码库时逐文件探索，token 消耗高、速度慢。

## 为什么收藏它

零依赖纯 C 编译成单静态二进制，内置 158 语言 tree-sitter，把代码库索引成持久知识图谱，暴露 15 个工具（搜索、追踪、架构、Cypher 查询、变更检测），号称省 99% token。

## 我的笔记

性能导向。与 [[graphify]] 同为「代码库建图」思路，但走 MCP 协议 + 极速 C 实现，适合大仓库。

## 技术栈与状态

- 技术栈：C, SQLite, tree-sitter
- 状态：active
- 链接：https://github.com/DeusData/codebase-memory-mcp
