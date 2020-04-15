#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const utils = require('./utils/common')

const gitConfig = {
    username: 'WenJiang99',
    repo: 'leetcode',
    branch: 'master'
}

const rootPath = process.cwd()
const dir = rootPath.split(path.sep).pop()

const defaultConfig = {
    branch: gitConfig.branch,
    repo: `https://github.com/${gitConfig.username}/${gitConfig.repo}.git`,
    url: `https://github.com/${gitConfig.username}/${gitConfig.repo}/tree/${gitConfig.branch}/${dir}`,
    dirname: utils.getDate({ weekday: false, time: false }) + '-' + utils.getRandom(),
    filename: 'readme.md'
}

const argv = yargs
    .alias('-d', '--dirname') // 创建的目录名，存放 markdown 文件的目录
    .alias('-f', '--filename') // markdown 文件名，默认为 readme.md
    .alias('-c', '--catagories')
    .alias('-t', '--tags')
    .alias('-l', '--link')
    .array('--tags')
    .array('--catagories')
    .argv

let { title, tags, catagories, filename, date, pic, dirname, link } = argv

dirname = dirname || defaultConfig.dirname
filename = filename ? utils.formatFilename({ filename, ext: '.md' }) : defaultConfig.filename

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
[github-链接](${defaultConfig.url}/${dirname})

![](./${pic || 'problem'}.png)

`
if (!fs.existsSync(path.join(rootPath, dirname))) fs.mkdirSync(path.join(rootPath, dirname));

fs.writeFileSync(path.join(rootPath, dirname, filename), template)

