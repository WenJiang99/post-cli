#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const utils = require('../utils/common')
const post = require('../config/post')
const leetcode = require('../config/leetcode')
const git = require('../config/git')
const rootPath = process.cwd()
const treeDir = leetcode.string.treeDir

const argv = yargs
    .alias('-b', '--branch')
    .alias('-r', '--repo')
    .alias('-u', '--username')
    .alias('-d', '--dirname') // 创建的目录名，存放 markdown 文件的目录
    .alias('-f', '--filename') // markdown 文件名，默认为 readme.md
    .alias('-c', '--catagories')
    .alias('-t', '--tags')
    .alias('-l', '--link')
    .alias('-s', '--summary')
    .alias('-a', '--author')
    .boolean('--top')
    .boolean('--cover')
    .boolean('--mathjax')
    .array('--tags')
    .array('--catagories')
    .argv

let {
    title,
    tags,
    catagories,
    filename,
    date,
    pic,
    dirname,
    link,
    branch,
    pattern,
    repo,
    username,
    url,
    summary,
    author,
    img,
    top,
    cover,
    mathjax
} = argv

dirname = dirname || (utils.getDate({ weekday: false, time: false }) + '-' + utils.getRandom(1))
filename = filename ? utils.formatFilename({ filename, ext: '.md' }) : 'readme.md'

const patternConfig = leetcode[pattern]
tags = [...leetcode.global.tags, ...(patternConfig.tags || leetcode.default.tags), ...(tags || [])]
catagories = [...leetcode.global.catagoreis, ...(patternConfig.catagories || leetcode.default.catagories), ...(catagories || [])]

branch = branch || leetcode.git.branch || git.branch || 'master'
repo = repo || leetcode.git.repo || 'leetcode'
username = username || leetcode.git.username || git.username
url = url || `https://github.com/${username}/${repo}/tree/${branch || 'master'}/${treeDir}`
const picUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch || 'master'}/${treeDir}/${dirname}/${pic || 'problem'}.png`
const catagoriesStr = (catagories || []).reduce((str, item) => { return str + `- ${item} \n` }, 'catagories: \n')
const tagsStr = (tags || []).reduce((str, item) => str + `- ${item} \n`, 'tags: \n')

// 生成与文件同名的数据目录用于存放markdown文件中引用的静态资源，解决hexo下markdown文件相对路径引用不到的问题
const dataDir = filename.split('.').shift()

const template = `---
title: ${(patternConfig && patternConfig.titlePrefix) || 'Leetcode#'} ${title || ''}
date: ${date || utils.getDate({ time: true, weekday: false })}
${catagoriesStr}
${tagsStr}
summary: ${summary || title || ''}
author: ${author || post.author || ''}
img: ${img || post.defaultImg}
coverImg: 
top: ${!!top}
cover: ${!!cover}
mathjax: ${!!mathjax}
keywords: ${title}
link: ${link || ''}
---

## 题目

[Leetcode-题目链接](${link || ''})   

[github-链接](${url}/${dirname})

![](./${pic || 'problem'}.png)   
<--! select a type of post img ref -->
![](${picUrl || ''})   
![](./${dataDir}/${pic || 'problem'}.png)

## 解法

### 思路

### 代码
\`\`\`js 


\`\`\`

### 效率
耗时： ,  %
内存： ,  %

## 参考

- []()

`
if (!fs.existsSync(path.join(rootPath, dirname))) fs.mkdirSync(path.join(rootPath, dirname));

fs.writeFileSync(path.join(rootPath, dirname, filename), template)

if (!fs.existsSync(path.join(rootPath, dirname, dataDir))) fs.mkdirSync(path.join(rootPath, dirname, dataDir))