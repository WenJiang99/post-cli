#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const utils = require('../utils/common')
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
    .array('--tags')
    .array('--catagories')
    .argv

let { title, tags, catagories, filename, date, pic, dirname, link, branch, pattern, repo, username, url } = argv

dirname = dirname || (utils.getDate({ weekday: false, time: false }) + '-' + utils.getRandom(1))
filename = filename ? utils.formatFilename({ filename, ext: '.md' }) : 'readme.md'
tags = [...leetcode.global.tags, ...((leetcode[pattern] && leetcode[pattern].tags) || leetcode.default.tags)]
catagories = [...leetcode.global.catagoreis, ...((leetcode[pattern] && leetcode[pattern].catagoreis) || leetcode.default.catagories)]

branch = branch || leetcode.git.branch || git.branch || 'master'
repo = repo || leetcode.git.repo || 'leetcode'
username = username || leetcode.git.username || git.username
url = url || `https://github.com/${username}/${repo}/tree/${branch || 'master'}/${treeDir}`
const picUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch || 'master'}/${treeDir}/${dirname}/${pic || 'problem'}.png`
const catagoriesStr = (catagories || []).reduce((str, item) => { return str + `- ${item} \n` }, 'catagories: \n')
const tagsStr = (tags || []).reduce((str, item) => str + `- ${item} \n`, 'tags: \n')

const template = `---
title: ${title || ''}
date: ${date || utils.getDate({ time: true, weekday: false })}
${catagoriesStr}
${tagsStr}
summary: 
link: ${link || ''}
---

## 题目
[Leetcode-题目链接]()
[github-链接](${url}/${dirname})

![](./${pic || 'problem'}.png)
![](${picUrl || ''})

`
if (!fs.existsSync(path.join(rootPath, dirname))) fs.mkdirSync(path.join(rootPath, dirname));

fs.writeFileSync(path.join(rootPath, dirname, filename), template)
