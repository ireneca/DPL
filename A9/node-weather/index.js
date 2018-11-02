const request = require('request');
const argv = require('yargs').argv;
let apiKey = '411ded87545ceb105b008ae4a9e28801';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);
    let message = `Son ${weather.main.temp}ºC en ${weather.name}!`;
    console.log(message);
  }
});
