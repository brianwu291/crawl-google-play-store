const { getAppDetail } = require('../appDetail')

function parseUriArrayToAppIdArray(inputUri = []) {
  return inputUri.map(uri => uri.split('?id=')[1])
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
