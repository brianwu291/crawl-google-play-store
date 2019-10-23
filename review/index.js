const GooglePlay = require('google-play-scraper')

function getAppReview(option) {
  return GooglePlay.reviews(option)
}

module.exports = {
  getAppReview
}