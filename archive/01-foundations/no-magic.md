---
# ===== 客观信息（AI Agent 抓取仓库真实数据填写）=====
name: no-magic
github: https://github.com/no-magic-ai/no-magic
category: 01-foundations
tagline: 手写现代 AI 算法原理的教学仓库，零依赖、单文件、可运行
stack: Python
tags: AI教育, 深度学习, 算法, 自监督学习, 强化学习, 大模型, 教学
status: active
# 快照信息（用于回溯，approximate）
stars: 0
updated: 2026-08-08

# ===== 主观信息（手动补充）=====
---

# no-magic

> Because `model.fit()` isn't an explanation.

## 它解决什么问题

填补机器学习学习的断层：教程教你调用库函数，论文全是数学符号，但"算法本身以可读代码呈现"这一层缺失。它用 48 个单文件、仅标准库、无依赖的 Python 脚本，从零实现并训练现代 AI 算法（GPT、Transformer、RLHF、Flash Attention、MCTS 等），覆盖基础、对齐、系统、智能体四层。

## 为什么收藏它

学习现代 AI 底层原理的优质一手资料。想真正理解 `model.fit()` 背后发生了什么，而不是只会调包。适合后续深入某个算法时对照源码理解。

## 我的笔记

- 核心约束：单文件、零 pip 依赖、CPU 几分钟可跑、注释即引导。
- 分层结构：01 基础 / 02 对齐 / 03 系统 / 04 智能体，按需挑层级看。
- 配套：21 个预测行为挑战题、190 张 Anki 卡、离线 EPUB 电子书。
- 项目由 Claude(Anthropic) 合作编写，人类设计结构并验证运行。
- 起点：`python 01-foundations/microgpt.py`，首次运行自动下载小数据集。

## 技术栈与状态

- 技术栈：Python 3.10+（标准库，零依赖）
- 状态：active
- 链接：https://github.com/no-magic-ai/no-magic