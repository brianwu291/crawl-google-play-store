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
  return uri.split('\n')
}

const result = { get, formatNumToStr, formatUriListsToArray }

export default result