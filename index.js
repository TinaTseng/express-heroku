const path = require('path')
const express = require('express')
const request = require('request')
const getAddress = require('./get-address')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs') // express支援ejs, jade etc.

// 讓bundle.js可以被瀏覽器讀取
app.use('/static', express.static(path.resolve(__dirname, 'static')))

// .set: 儲存變數，初始化history參數
app.set('history',[{
  address: 'NTU',
  result: {
    formatted_address:'羅斯福路四段一號',
    lat: '123',
    lng:'456',
  }
}])

app.get('/history', function(req, res){
  res.send(app.get('history'))
})

app.get('/home', function(req, res){
  res.render('home', {
    title: 'hello world',
    menu: ['Features', 'Contact', 'About']
  });
})

// 丟出檔案，也可丟出圖片等
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views/index.html'))
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
    
    let result = getAddress(JSON.parse(body))
    res.send(result)
    let history = app.get('history')
    history.push({address,result})
    app.set('history', history)
  });
})

const getPlaceInfoByGoogle = (location, type) => {
  let promise = new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    let options = {
      url: url,
      qs: {
        key: 'AIzaSyBhO2blgJq1SGHskjVhSU6CaV1IogBAdpw',
        location: location,
        radius: '1000',
        type: type,
      },
      method:'GET'
    };
    request(options, function (error, response, body) {
      if (error) { reject(error) }
      else { resolve(body) }    
    });
  })
  return promise;
}

const getPlaceInfoByFacebook = (center) => {
  let promise = new Promise((resolve, reject) => {
    let url = 'https://graph.facebook.com/v2.10/search';
    let options = {
      url: url,
      qs: {
        type: 'place',
        center: center,
        access_token: 'EAAMSmojZAWnABAAR3eXG2KDv0dpYh9oIBZCakYJIyyfp56ARl947RCnvrOFPkZBUE4korgZCFZBVUE3eqsaSZBWV7eCz2atfSfoc48tSPziP2noXxmZARsoLmI3mIxsNuLEXh3EqZBzpTepA9mZCQqI6MrZBw8fe259te2nWSvpCJj9nplSx09xldbTuWknY4nSifywJAz52W51gZDZD',
        fields: 'about,name,checkins,picture',
      },
      method:'GET'
    };
    request(options, function (error, response, body) {
      if (error) { reject(error) }
      else { resolve(body) }    
    });
  })
  return promise;
}

app.get('/query-place', function(req, res) {
  let location = req.query.location;
  let type = req.query.type;
  let promise1 = getPlaceInfoByGoogle(location, type);
  let promise2 = getPlaceInfoByFacebook(location);
  Promise.all([promise1,promise2]).then((result) => {
    res.send({
      google: JSON.parse(result[0]),
      facebook: JSON.parse(result[1])
    })
  })
})

// homework
app.get('/homework', function(req, res){
  let body = {
    name: "曾子安",
    email: "zooeytseng@gmail.com"
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(body);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})