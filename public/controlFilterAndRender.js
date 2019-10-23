import utils from './utils.js'
import render from './render.js'
import filterDataWeWant from './filterData.js'
const { get } = utils

let responseArr = []
function filterResAndRender(res = []) {
  responseArr = responseArr.concat(get(res, 'data', [])).map((item, ind) => {
    return Array.isArray(item) ? item : filterDataWeWant(item, ind)
  })
  render(responseArr)
}
function resetResponseArr() {
  responseArr.length > 50 ? window.location.reload() : responseArr.length = 0
  responseArr.length = 0
}

export default { filterResAndRender, resetResponseArr }
