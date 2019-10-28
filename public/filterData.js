import utils from './utils.js'

const { get, formatNumToStr, replaceTargetWithEmptyStr, replaceStrangeWithEmpty } = utils

function allReplaceWithEmptyStr(target) {
  return replaceTargetWithEmptyStr(replaceStrangeWithEmpty(target), new RegExp(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|<br>|●|•|★|〜|∩|_|O|-|∩|＊|#|=|/gm))
}

function filterDataWeWant(input = {}, index = 0) {
  return ([
    { PT: 'J' },
    { AU: get(input, 'developer', '') },
    { AF: get(input, 'developerEmail', '') },
    { TI: allReplaceWithEmptyStr(get(input, 'title', '')) },
    { AB: allReplaceWithEmptyStr(get(input, 'description', '')) },
    { C1: get(input, 'ratings', 0) },
    { CR: parseFloat(get(input, 'scoreText', 0)) },
    { TC: get(input, 'minInstalls', 0) },
    { PY: get(input, 'released', '2019').slice(0, 4) },
    { UT: formatNumToStr(index + 1) },
    { SC: get(input, 'genre', 'other') },
    { DE: allReplaceWithEmptyStr(get(input, 'recentChanges', '')) },
    { ER: '' },
  ])
}

export default filterDataWeWant