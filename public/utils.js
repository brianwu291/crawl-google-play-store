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

const result = { get, formatNumToStr, formatUriListsToArray, replaceTargetWithEmptyStr, replaceStrangeWithEmpty }

export default result