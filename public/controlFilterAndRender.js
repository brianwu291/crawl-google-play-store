import renderElement from './render.js'
import filterDataWeWant from './filterData.js'

let responseArr = []
function filterResAndRender(res) {
  responseArr = responseArr.concat(...res.data).map((item, ind) => {
    return Array.isArray(item) ? item : filterDataWeWant(item, ind)
  })
  renderElement(responseArr)
}

export default filterResAndRender
