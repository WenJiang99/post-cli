# post-cli

## Description

用来快速生成 Hexo 博客文章模板文件的 cli

## Start

`git clone https://github.com/WenJiang99/post-cli.git` 克隆仓库到本地   

进入 **post-cli** 目录下执行 `npm install` 安装项目依赖   

执行 `npm link` 添加全局快捷方式    

然后就可以使用 `post-cli` 命令了   

需要解除全局快捷方式时候，在**post-cli**目录下执行 `npm unlink`

## Docs

- `post-cli leetcode [options] ` 在当前目录下创建Leetcode仓库的hexo文章模板，使用项目中 `config/leetcode.js` 中的配置
  - `--pattern` or `-p`   string 指定要创建的leetcode题目类型模板，具体取值由 `config/leetcode.js`下进行配置
  - `--dirname` or `-d`   string 生成的模板目录名称，存放 `markdown`文件的目录
  - `--filename` or `-f`  string 生成的模板文件名，默认为 `readme.md`,会在同级目录下同时使用这个文件名（不带扩展名）生成一个文件夹用于存放markdown中要使用的资源

  ```shell
  PS G:\GitHub\post-cli> post-cli leetcode -p string -d reverseWords -f ignoreme.md

  # 例如指定 -p string,则会去使用 config/leetcode.js 中导出的 string 配置

  # 指定了 -d reverseWords ，则会在当前目录下生成 reverseWords 目录

  # reverseWords 目录下生成指定的 ignoreme.md 文件和对应的 ignoreme 目录，这里是为了解决hexo下markdown引用静态文件的问题
  ```
  - `--title`  string 博客文章标题
  - `--link`  string  题目的链接
  - `pic`  string 题目的图片，会自动在markdown文件中引入
  - `--repo` or `-r`  string  leetcode仓库地址，可以在配置文件`config/leetcode.js`中的`git`属性中配置`repo`，也可以通过选项传入。选项传入会覆盖配置文件
  - `--branch` or `-b`  string 仓库分支，默认为 `master`
  - `--username` or `-u`    string 仓库的用户名
  - `--url`   string  

  ```js
  // config/leetcode.js
  module.exports = {
    git: {
      username: 'WenJiang99',
      repo: 'leetcode',
      branch: 'master'
    },
    global: {
      tags: ['Leetcode#刷题'],
      categories: ['刷题#Javascript', 'Leetcode#Javascript']

    },
    string: {
      treeDir: 'String', // github仓库中String类型题目存放的文件夹名称 leetcode/String
      tags: [''],
      categories: ['Leetcode#String', 'Javascript#String'],
    },
    default: {
      tags: ['Leetcode#题目'],
      categories: []
    }

  }
  ```

  ```shell
  PS G:\GitHub\post-cli> post-cli leetcode -p string -d reverseWords --title "Leetcode#String 反转字符串中的单词" --link https://leetcode-cn.com/problems/reverse-words-in-a-string/submissions/
  ```
  生成的文件模板如下：

  ```markdown
  ---
  title: Leetcode#String 反转字符串中的单词
  date: 2020-04-15 23:37:08 
  categories: 
  - 刷题#Javascript 
  - Leetcode#Javascript 
  - Leetcode#String 
  - Javascript#String 

  tags: 
  - Leetcode#刷题 
  -  

  summary: 
  link: https://leetcode-cn.com/problems/reverse-words-in-a-string/submissions/
  ---

  ## 题目
  [Leetcode-题目链接](https://leetcode-cn.com/problems/reverse-words-in-a-string/submissions/)
  [github-链接](https://github.com/WenJiang99/leetcode/tree/master/String/reverseWords)

  ![](./problem.png)
  ![](https://raw.githubusercontent.com/WenJiang99/leetcode/master/String/reverseWords/problem.png)
  ```