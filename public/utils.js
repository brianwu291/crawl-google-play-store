function get(target = {}, props = '', def) {
  if (props === '') {
    return target
  }
  const propsArr = props.split('.')
  const result = propsArr.reduce((pre, cur) => {
    return pre[cur] === undefined ? def : pre[cur]
  }, target)
  return result
}

function formatNumToStr(num) {
  return num.toString().length === 1 ? `${0}${num.toString()}` : num.toString()
}

function formatUriListsToArray(uri = '') {
  return uri.trim().split('\n')
}

function replaceTargetWithEmptyStr(target = '', regex) {
  return target.replace(new RegExp(regex), '')
}

function replaceStrangeWithEmpty(target) {
  return target.replace(/\*/gm, '')
}

function convertArrayKeyValToObj(arr = []) {
  let result = {}
  arr.forEach(item => {
    const keyValArr = Object.entries(item)[0]
    result[keyValArr[0]] = keyValArr[1]
  })
  return result
}

const result = { get, formatNumToStr, formatUriListsToArray, replaceTargetWithEmptyStr, replaceStrangeWithEmpty, convertArrayKeyValToObj }

export default result