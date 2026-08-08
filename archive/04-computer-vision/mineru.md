---
# ===== 客观信息（AI Agent 抓取仓库真实数据填写）=====
name: MinerU
github: https://github.com/opendatalab/mineru
category: 04-computer-vision
tagline: 高质量文档解析工具：PDF/图片/DOCX/PPTX/XLSX → Markdown/JSON
stack: Python, PaddleOCR, vLLM
tags: 文档解析, OCR, PDF, RAG, 公式, 表格
status: active
# 快照信息（用于回溯，approximate）
stars: 42000
updated: 2026-08-08

# ===== 主观信息（手动补充）=====
---

# MinerU

> 高质量文档解析工具：PDF/图片/DOCX/PPTX/XLSX → Markdown/JSON

## 它解决什么问题

复杂文档（公式→LaTeX、表格→HTML、多栏版式、多语言 OCR）难转成机器可读格式。

## 为什么收藏它

VLM + OCR 双引擎（PP-OCRv6、PaddleOCR、vLLM/LMDeploy），支持 109 语言，CLI/API/Docker/多 GPU 部署。

## 我的笔记

做 RAG 预处理的明星项目。与 [[firecrawl]]（在线网页）互补，mineru 处理离线/扫描文档。

## 技术栈与状态

- 技术栈：Python, PaddleOCR, vLLM
- 状态：active
- 链接：https://github.com/opendatalab/mineru
