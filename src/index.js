const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const router = require('./router')
const port = 3535

app.disable('etag')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(`/api`, router)

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`==============================`)
  console.log(`Service running on port: ${port}`)
  console.log(`==============================`)
})
