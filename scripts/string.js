#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const path = require('path')

function to2Chars(num) {
    return num >= 10 ? num : ('0' + num)
}

function getDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + '-' + to2Chars(month) + '-' + to2Chars(day)
}

function getRandom(length = 2) {
    length = +length
    return Math.random().toString().slice(-length - 1)
}

const gitConfig = {
    username: 'WenJiang99',
    repo: 'leetcode',
    branch: 'master'
}

const dir = process.cwd().split(path.sep).pop()

console.log(dir)

const defaultConfig = {
    branch: gitConfig.branch,
    repo: `https://github.com/${gitConfig.username}/${gitConfig.repo}.git`,
    url: `https://github.com/${gitConfig.username}/${gitConfig.repo}/tree/${gitConfig.branch}/${dir}`,
    dirname: getDate() + '-' + getRandom(),
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

const catagoriesStr = (catagories || []).reduce((str, item) => { return str + `- ${item} \n` }, '')

const tagsStr = (tags || []).reduce((str, item) => str + `- ${item} \n`, '')

const template = `---
title: ${title || ''}
date: ${date || new Date().toLocaleString()}
catagories:
${catagoriesStr}
tags:
${tagsStr}
summary: 
link: ${link || ''}
---

## 题目
[Leetcode-题目链接]()
[github-链接](${defaultConfig.url}/${dirname})

![](./${pic || 'problem'}.png)

`
if (!fs.existsSync(path.join(__dirname, dirname))) fs.mkdirSync(path.join(__dirname, dirname));

fs.writeFileSync(path.join(__dirname, dirname, filename || defaultConfig.filename), template)

