import utils from './utils.js'
import render from './render.js'
import filterDataWeWant from './filterData.js'
const { get, convertArrayKeyValToObj } = utils

function exportJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData)
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  let exportFileDefaultName = 'result.json'
  let linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

let responseArr = []
function filterResAndRender(res = []) {
  responseArr = responseArr.concat(get(res, 'data', [])).map((item, ind) => {
    return Array.isArray(item) ? item : filterDataWeWant(item, ind)
  })
  const finalData = responseArr.map(item => convertArrayKeyValToObj(item))
  document.querySelector('.download').addEventListener('click', () => {
    exportJsonFile(finalData)
  })
  render(responseArr)
}
function resetResponseArr() {
  window.location.reload()
  responseArr.length = 0
}

export default { filterResAndRender, resetResponseArr }
