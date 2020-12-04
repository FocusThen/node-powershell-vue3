const express = require('express')
const Shell = require('node-powershell')
const cors = require('cors')
const app = express()

app.use(cors())

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true,
})

app.get('/', (req, res) => {
  ps.addCommand('Get-LocalUser | Select-Object Name | ConvertTo-Json -Compress')
  ps.invoke().then((output) => {
    res.json(JSON.parse(output))
  })
})
app.listen(3000, () => {
  console.log('server is running http://localhost:3000')
})
