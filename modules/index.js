const { getAppDetail } = require('../appDetail')

function getIdValOnStr(str) {
  return str.split('&').map(item => {
    const keyValArr = item.split('=')
    let returnObj = {}
    returnObj[`${keyValArr[0]}`] = keyValArr[1]
    return returnObj
  })
  .filter(item => item.hasOwnProperty('id'))[0].id
}

function parseUriArrayToAppIdArray(inputUri = []) {
  return inputUri.map(uri => uri.split('?')[1]).map(search => getIdValOnStr(search))
}

function getAllAppData(target = []) {
  return target.length === 0 ? [] :
    Promise.all(parseUriArrayToAppIdArray(target).map(appId => (
      getAppDetail(appId)
      .then(res => res))
      .catch(err => err)
    ))
    .then(res => res)
    .catch(err => err)
}

module.exports = {
  getAllAppData
}
