const path = require('path')
const middleware = require('../middlewares')
const { getAllAppData } = require('../modules')

function createOption(input = 'js') {
  const mappingObj = {
    js: 'application/javascript',
    html: 'text/html'
  }
  return {
    root: path.join(__dirname, 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*/*',
      'Content-Type': mappingObj[input]
    }
  }
}

module.exports = app => {
  app.get('*', (req, res) => {
    res.sendFile('index.html', createOption('html'))
  })
  app.post('/app/group', middleware, (req, res) => {
    const reqData = req.body.data
    if (reqData.length === 0) {
      return res.send({ data: [] })
    }
    function handleHasResponse(result) {
      res.header("Access-Control-Allow-Origin", '*/*')
      res.set('Content-Type', 'application/json')
      return res.status(200).send({ data: result, message: 'succeed' })
    }
    function handleHasError(error) {
      res.header("Access-Control-Allow-Origin", '*/*')
      res.set('Content-Type', 'application/json')
      return res.status(403).send({ data: null, message: `bad request because ${error}` })
    }
    async function splitRequestToMultipleTimes() {
      const urlLists = req.body.data, result = []
      if (urlLists.length <= 5) return getAllAppData(urlLists)
      let divideUrlGroups = [], tempArray = []
      for (let i = 0; i < urlLists.length; i += 1) {
        if (tempArray.length < 5) {
          tempArray.push(urlLists[i])
          if (i === urlLists.length - 1) {
            divideUrlGroups.push(tempArray)
            tempArray = []
          }
        }
        if (tempArray.length === 5) {
          divideUrlGroups.push(tempArray)
          tempArray = [] 
        }
      }
      for (const item of divideUrlGroups) {
        const res = await getAllAppData(item)
        result.push(...res)
      }
      return result
    }
    splitRequestToMultipleTimes()
    .then(handleHasResponse)
    .catch(handleHasError)
  })
}
