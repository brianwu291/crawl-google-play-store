function createPTagElement(appDataItem = {}) {
  let result = document.createElement('p')
  let key = Object.keys(appDataItem)[0]
  result.textContent = Array.isArray(appDataItem[key]) ?
  `${key}${'  '}${appDataItem[key][0]}, ${appDataItem[key][1]}` : `${key}${'  '}${appDataItem[key]}`
  return result
}

function createPTagElementGroup(appData = []) {
  let result = document.createElement('div')
  result.classList.add('group_item') 
  appData.forEach(item => {
    result.appendChild(createPTagElement(item))
  })
  return result
}

export default createPTagElementGroup