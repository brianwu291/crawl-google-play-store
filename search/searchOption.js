
function getDefaultSearchOption(inputTerm) {
  let defaultSearchOption = {
    term: inputTerm,
    num: 250,
    lang: 'zh_TW',
    country: 'TW',
    fullDetail: true,
    price: 'all'
  }
  return defaultSearchOption
}

function getCustomSearchOption(term = '', otherOption = { num, lang, country, fullDetail, price }) {
  return ({
    term,
    num: otherOption.num || 250,
    lang: otherOption.lang || 'zh_TW',
    country: otherOption.country || 'TW',
    fullDetail: otherOption.fullDetail || true,
    price: otherOption.price || 'all'
  })
}

module.exports = {
  getDefaultSearchOption,
  getCustomSearchOption,
}