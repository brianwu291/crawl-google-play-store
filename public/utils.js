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

const result = { get, formatNumToStr, formatUriListsToArray, replaceTargetWithEmptyStr }

export default result