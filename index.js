const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public', {
  setHeaders: (res) => {
    res.set({
      'Access-Control-Allow-Origin': '*/*',
      'x-timestamp': Date.now(),
    })
  }
}))
require('./routes')(app)

function createOption(input = 'js') {
  const mappingObj = {
    js: 'application/javascript',
    html: 'text/html'
  }
  return {
    root: path.join(__dirname, 'public'),
    headers: { 'Content-Type': mappingObj[input] }
  }
}
app.get('*', (req, res) => {
  res.sendFile('index.html', createOption('html'))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Listening at ' + `http://localhost:${PORT}`)
})
