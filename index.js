const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'))
require('./routes')(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening at ' + PORT );
});
