import api from './api.js'
import fetchData from './fetchData.js'
import utils from './utils.js'
import controlFilterAndRender from './controlFilterAndRender.js'
const { request, createPostInit } = api
const { formatUriListsToArray } = utils
const { filterResAndRender, resetResponseArr } = controlFilterAndRender

document.querySelector('.submit').addEventListener('click', submitUriLists)
document.querySelector('.reset').addEventListener('click', resetAllData)

function resetAllData() {
  document.querySelector('.textarea_itself').value = ''
  document.querySelector('.main').innerHTML = ''
  resetResponseArr()
}

function submitUriLists() {
  const target = document.querySelector('.textarea_itself')
  const userInput = formatUriListsToArray(target.value)
  if (target.value === '') {
    alert('input must have value')
    return
  }
  fetchData(request, createPostInit(userInput))
  .then(res => {
    if (res.message === 'succeed') {
      document.querySelector('.download').classList.remove('display_none')
      document.querySelector('.convert_excel').classList.remove('display_none')
    }
    return res
  })
  .then(filterResAndRender)
  .catch(err => console.log('err', err))
}