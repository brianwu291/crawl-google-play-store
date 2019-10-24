import utils from './utils.js'

const { get, formatNumToStr, replaceTargetWithEmptyStr } = utils

function filterDataWeWant(input = {}, index = 0) {
  return ([
    { PT: 'J' },
    { AU: get(input, 'developer', '') },
    { AF: get(input, 'developerEmail', '') },
    { TI: replaceTargetWithEmptyStr(get(input, 'title', ''), new RegExp(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|<br>|•|★|〜|O|∩|_|∩/gm)) },
    { AB: replaceTargetWithEmptyStr(get(input, 'description', ''), new RegExp(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|<br>|•|★|〜|O|∩|_|∩/gm)) },
    { C1: [ get(input, 'ratings', 0), parseFloat(get(input, 'scoreText', 0)) ] },
    { CR: replaceTargetWithEmptyStr(get(input, 'recentChanges', ''), new RegExp(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|<br>|•|★|〜|O|∩|_|∩/gm)) },
    { TC: get(input, 'minInstalls', 0) },
    { PY: get(input, 'released', '2019').slice(0, 4) },
    { UT: formatNumToStr(index + 1) },
    { SC: get(input, 'genre', 'other') },
    { DE: '' },
    { ER: '' },
  ])
}

export default filterDataWeWant