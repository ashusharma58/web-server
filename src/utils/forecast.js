const request = require('request');

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c31c2039f4529fdf33dc54e8ac702e17/' + latitude + ',' + longitude;
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service !', undefined);
        } else if(body.error){
            callback('Unable to find location !', undefined);
        } else {
          let temp = body.currently && body.currently.temperature;
          let prob = body.currently && body.currently.precipProbability;
          callback(undefined, `It is ${temp} degrees out now. There is ${prob} % chances of rain`);
        }
          
      
      })

}

module.exports = forecast;