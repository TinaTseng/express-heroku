const express = require('express')
const request = require('request');

const app = express()
const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/hi', function (req, res) {
  let address = 'National Taiwan University'
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
  request(url, 
      function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.statusCode);
    console.log('body:', body);
    res.send(body)    
  });
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})