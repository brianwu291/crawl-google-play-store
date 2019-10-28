import createPTagElementGroup from './createDom.js'

function renderElement(inputResponseArr) {
  const main = document.querySelector('.main')
  inputResponseArr.forEach(itemArr => {
    main.appendChild(createPTagElementGroup(itemArr))
  })
}

export default renderElement