function to2Chars(num) {
  return num >= 10 ? num : ('0' + num)
}

function toWeekday(num) {
  switch (num) {
    case 1: return '星期一'
    case 2: return '星期二'
    case 3: return '星期三'
    case 4: return '星期四'
    case 5: return '星期五'
    case 6: return '星期六'
    case 7: return '星期日'
    default: return '星期日'

  }
}


exports.getRandom = function getRandom(length = 2) {
  length = +length
  return Math.random().toString().slice(-length - 1)
}

exports.getDate = function getDate({ weekday = false, time = false }) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const withDetail = weekday || time
  const extra = withDetail ? ` ${time ? (to2Chars(date.getHours()) + ':' + to2Chars(date.getMinutes()) + ':' + to2Chars(date.getSeconds())) : ''} ${weekday ? toWeekday(date.getDay()) : ''}` : ''
  return year + '-' + to2Chars(month) + '-' + to2Chars(day) + extra
}

function toCamelCase(str) {

}
function toKebabCase(str) {

}
function toPascalCase(str) {

}

exports.formatFilename = function ({ filename, ext = '.md', caseStyle = 'pascal' }) {
  ext = ext.includes('.') ? ext : ('.' + ext)
  return String(filename).includes('.') ? filename : (filename + ext)

}