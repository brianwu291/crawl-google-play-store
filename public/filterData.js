import utils from './utils.js'

const { get, formatNumToStr } = utils

function filterDataWeWant(input = {}, index = 0) {
  return ([
    { PT: 'J' },
    { AU: get(input, 'developer', '')},
    { AF: get(input, 'developerEmail', '')},
    { TI: get(input, 'title', '')},
    { AB: get(input, 'summary', '')},
    { C1: [ get(input, 'reviews', 0), parseFloat(get(input, 'scoreText', 0)) ] },
    { CR: get(input, 'recentChanges', '')},
    { TC: get(input, 'minInstalls', 0) },
    { PY: get(input, 'released', '2019').slice(0, 4) },
    { UT: formatNumToStr(index + 1) },
    { SC: get(input, 'genre', 'other') },
    { DE: '' },
    { ER: '' },
  ])
}

export default filterDataWeWant