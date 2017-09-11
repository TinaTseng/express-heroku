const express = require('express')
const request = require('request')
const getAddress = require('./get-address')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/home', function(req,res){
  res.render('home', { title:'hello world' })
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//https://csiejs911.herokuapp.com/query-address?address=NTU
app.get('/query-address', function (req, res) {
  let address = req.query.address; //取得user url輸入的address
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
  request(url, 
      function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.statusCode);
    console.log('body:', body);
    res.send(getAddress(JSON.parse(body)))    
  });
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})