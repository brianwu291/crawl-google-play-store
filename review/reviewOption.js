const GooglePlay = require('google-play-scraper')

const defaultReviewOption = {
  appId: '',
  lang: 'zh_TW',
  country: 'TW',
  sort: GooglePlay.sort.NEWEST, // Accepted values are: sort.NEWEST, sort.RATING and sort.HELPFULNESS.
  num: 100, // defaults to 100)
}

function getDefaultReviewOption(inputAppId) {
  defaultReviewOption.appId = inputAppId
  return defaultReviewOption
}

function getCustomReviewOption(appId = '', otherOption = { lang, country, sort, num }) {
  return ({
    appId,
    lang: otherOption.lang || 'zh_TW',
    country: otherOption.country || 'TW',
    sort: otherOption.sort || GooglePlay.sort.NEWEST,
    num: otherOption.num || 100,
  })
}

module.exports = {
  getDefaultReviewOption,
  getCustomReviewOption,
}