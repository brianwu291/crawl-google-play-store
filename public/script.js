(function () {
  document.querySelector('.submit').addEventListener('click', submitUriLists)
  document.querySelector('.reset').addEventListener('click', resetAllData)

  let Header = new Headers({ 'Content-Type': 'application/json' })
  let postInit = { method: 'POST', headers: Header, body: {} }
  let request = new Request('/app/group')

  let responseArr = []

  function formatNumToStr(num) {
    return num.toString().length === 1 ? `${0}${num.toString()}` : num.toString()
  }

  function formatUriListsToArray(uri = '') {
    return uri.split('\n')
  }

  function formatUriListsToObj(uri = '') {
    return { data: uri.split('\n') }
  }

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

  function renderElement(inputResponseArr) {
    const main = document.querySelector('.main')
    inputResponseArr.forEach(itemArr => {
      if (itemArr.length < 14) {
        main.appendChild(createPTagElementGroup(itemArr))
        itemArr.push({})
      }
    })
  }

  function getData(req, init) {
    return fetch(req, init).then(res => res.json())
    .then(res => {
      responseArr = responseArr.concat(...res.data).map((item, ind) => {
        return Array.isArray(item) ? item : filterDataWeWant(item, ind)
      })
      renderElement(responseArr)
    })
    .catch(err => console.log('err', err))
  }

  function delayFetch(inputReq, inputInit, sec) {
    window.setTimeout((() => getData(inputReq, inputInit)), 700 * sec)
  }

  function filterDataWeWant(input = {}, index = 0) {
    return ([
      { PT: 'J' },
      { AU: input.developer || '' },
      { AF: input.developerEmail || '' },
      { TI: input.title || '' },
      { AB: input.summary || '' },
      { C1: [ input.reviews || 0, parseFloat(input.scoreText) || 0 ] },
      { CR: input.recentChanges || '' },
      { TC: input.minInstalls || 0 },
      { PY: input.released.slice(0, 4) || '2019' },
      { UT: formatNumToStr(index + 1) },
      { SC: input.genre || 'other' },
      { DE: '' },
      { ER: '' },
    ])
  }

  function submitUriLists() {
    const target = document.querySelector('.textarea_itself')

    if (target.value === '') {
      alert('input must have value')
      return
    }
    if (formatUriListsToArray(target.value).length >= 10) {
      let oriValArray = formatUriListsToArray(target.value), newReqData = []
      for (let i = 0; i < oriValArray.length; i += 1) {
        if (newReqData.length === 5) {
          postInit.body = JSON.stringify({ data: newReqData })
          delayFetch(request, postInit, Math.floor(i / 5))
          newReqData.length = 0
          newReqData.push(oriValArray[i])
        } else {
          newReqData.push(oriValArray[i])
          if (i === oriValArray.length - 1 && newReqData.length > 0) {
            postInit.body = JSON.stringify({ data: newReqData })
            getData(request, postInit)
          }
        }
      }
    } else {
      postInit.body = JSON.stringify(formatUriListsToObj(target.value))
      getData(request, postInit)
    }
  }

  function resetAllData() {
    responseArr.length = 0
    document.querySelector('.textarea_itself').value = ''
    document.querySelector('.main').innerHTML = ''
  }
})()