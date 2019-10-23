import createPTagElementGroup from './createDom.js'

function renderElement(inputResponseArr) {
  const main = document.querySelector('.main')
  inputResponseArr.forEach(itemArr => {
    if (itemArr.length < 14) {
      main.appendChild(createPTagElementGroup(itemArr))
      itemArr.push({})
    }
  })
}

export default renderElement