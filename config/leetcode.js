const TITLE_PREFIX = 'Leetcode'
module.exports = {
  git: {
    username: 'WenJiang99',
    repo: 'leetcode',
    branch: 'master'
  },
  global: {
    tags: [],
    categories: ['leetcode']

  },
  string: {
    treeDir: 'String', // github仓库中String类型题目存放的文件夹名称 leetcode/String,
    titlePrefix: TITLE_PREFIX,
    tags: ['string'],
    categories: [],
  },
  stack:{
    treeDir:'Stack',
    titlePrefix:TITLE_PREFIX,
    tags:['stack'],
    categories:[]

  },
  default: {
    tags: ['leetcode'],
    categories: []
  }

}
