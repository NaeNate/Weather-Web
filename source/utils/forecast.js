const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/6a4f86c199afab05342e0438006efab0/' + longitude + ',' + latitude + '?lang=en'

  request({ url, json: true}, (error, response) => {
  if (error) {
  callback('Unable to connect to weather services', undefined)
  } else if (response.body.error) {
    callback('Unable to find loaction', undefined)
  } else (
    callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees. There is a ' + response.body.currently.precipProbability * 100 + '% chance of rain.'
    )
  )
  })
  
}

module.exports = forecast

