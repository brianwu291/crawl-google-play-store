const GooglePlay = require('google-play-scraper')

function getAppDetailData(inputAppId) {
  return GooglePlay.app({ appId: inputAppId, lang: 'zh_TW', country:'TW' })
}

module.exports = {
  getAppDetail: getAppDetailData
}