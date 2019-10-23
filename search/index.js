const GooglePlay = require('google-play-scraper')

function getRowDataFromGPBySearchTerm(inputOption) {
  return GooglePlay.search(inputOption)
}

module.exports = {
  search: getRowDataFromGPBySearchTerm
}