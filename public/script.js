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
  function delayFetchAndRender(inputReq, inputInit, sec) {
    window.setTimeout(() => {
      fetchData(inputReq, inputInit)
      .then(filterResAndRender)
      .catch(err => console.log('err', err))
    }, 700 * sec)
  }
  function progressiveFetchAndRender() {
    let newReqData = []
    for (let i = 0; i < userInput.length; i += 1) {
      if (newReqData.length === 5) {
        delayFetchAndRender(request, createPostInit(newReqData), Math.floor((i + 1) / 5))
        newReqData = []
        newReqData.push(userInput[i])
      } else {
        newReqData.push(userInput[i])
        if (i === userInput.length - 1 && newReqData.length > 0) {
          fetchData(request, createPostInit(newReqData))
          .then(filterResAndRender)
          .catch(err => console.log('err', err))
        }
      }
    }
  }
  if (userInput.length >= 10) {
    return progressiveFetchAndRender()
  }
  fetchData(request, createPostInit(userInput))
  .then(filterResAndRender)
  .catch(err => console.log('err', err))
}