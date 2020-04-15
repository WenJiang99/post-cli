#!/usr/bin/env node
const yargs = require('yargs')
const path = require('path')
const child_process = require('child_process')

yargs
  .command(
    'leetcode',
    '创建Leetcode仓库的hexo文章模板',
    function (yargs) {
      return yargs
        .option('pattern', { alias: 'p', description: '创建的Leecode题目的分类模板，例如字符串(string)、数组(array)，会使用指定的leetcode配置文件下的同名属性作为配置', type: 'string' })
        .option('dirname', { alias: 'd', description: '创建的Leetcode题目的文件夹名，即markdown文件所在的目录名', type: 'string' })
        .option('filename', { alias: 'f', description: '创建的markdown文件的文件名，默认是readme.md', type: 'string' })
        .option('title', { description: '文章的标题', type: 'string' })
        .option('link', { description: 'LeetCode题目链接', type: 'string' })
        .option('pic', { description: '自动引用的图片文件名', type: 'string' })
        .option('repo', { description: '仓库链接', alias: '-r', type: 'string' })
        .option('branch', { description: '仓库分支', alias: '-b', type: 'string' })
        .option('username', { description: 'github用户名', alias: '-u', type: 'string' })
        .option('url', { description: 'github仓库中pattern类型题目对应的路径', type: 'string' })
        .help()
    },
    function (argv) {
      let optionsStr = ''
      for (let key in argv) {
        if (!key || key.includes('_') || key.includes('$') || key.length <= 1) continue;
        optionsStr += `--${key} ${JSON.stringify(argv[key])} `
      }
      console.log('index ==> ', argv)
      child_process.exec(
        `node ${path.resolve(__dirname, './scripts/leetcode.js')} ${optionsStr} `,
        function (err, stdout, stderr) {
          if (err) return console.log('exec_child_process_err', stderr);
          console.log(`模板目录生成成功.`)
        })
    }
  )
  .help()
  .argv


