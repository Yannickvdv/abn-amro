
const express = require('express')
const app = express()
const port = 3000

// enable CORS
let cors = require('cors');
app.use(cors())

// routes
const nodes = require('./routes/nodes')
app.use('/nodes', nodes)

// start app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
