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
    res.sendFile('api.js', createOption('js'))
    res.sendFile('fetchData.js', createOption('js'))
    res.sendFile('utils.js', createOption('js'))
    res.sendFile('filterData.js', createOption('js'))
    res.sendFile('createDom.js', createOption('js'))
    res.sendFile('render.js', createOption('js'))
    res.sendFile('controlFilterAndRender.js', createOption('js'))
    res.sendFile('script.js', createOption('js'))
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
    
    getAllAppData(req.body.data)
    .then(handleHasResponse)
    .catch(handleHasError)
  })
}
