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

- `post-cli leetcode [options] `
在当前目录下创建Leetcode仓库的hexo文章模板，使用项目中 `config/leetcode.js` 中的配置
```shell
Options:
  --version         显示版本号                                                   [布尔]
  --pattern, -p     创建的Leecode题目的分类模板，例如字符串(string)、数组(array)
                    ，会使用指定的leetcode配置文件下的同名属性作为配置            [字符串]
  --dirname, -d     创建的Leetcode题目的文件夹名，即markdown文件所在的目录名
                                                                                 [字符串]
  --filename, -f    创建的markdown文件的文件名，默认是readme.md                  [字符串]
  --title           文章的标题                                                   [字符串]
  --link            LeetCode题目链接                                             [字符串]
  --pic             自动引用的图片文件名                                         [字符串]
  --repo, -r      仓库链接                                                     [字符串]
  --branch,-b    仓库分支                                                     [字符串]
  --username, -u  github用户名                                                 [字符串]
  --url             github仓库中pattern类型题目对应的路径                        [字符串]
  --help            显示帮助信息                                                   [布尔]
```