const path = require('path')
const middleware = require('../middlewares')
const { getAllAppData } = require('../modules')

module.exports = app => {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
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
