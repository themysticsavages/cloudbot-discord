const rp = require('request-promise');
const api = require('./api.json')

function get(place, callback) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q='+place+'&appid='+api.apikey

        rp(url)
        .then(function(html){
          var json = JSON.parse(html)

          // Weather synthisizing
          var weather = json['weather']
          var weather = JSON.stringify(weather)
          var weather = weather.replace('[','')
          var weather = weather.replace(']','')
          var weather = JSON.parse(weather)
          var weather = weather['main']
          
          // Temperature
          var temp = json['main']['temp']
          var temp = Math.round((1.8*temp) - 459.67)

          // High
          var high = json['main']['temp_max']
          var high = Math.round((1.8*high) - 459.67)

          // Low
          var low = json['main']['temp_min']
          var low = Math.round((1.8*low) - 459.67)

          // Feels like
          var feel = json['main']['feels_like']
          var feel = Math.round((1.8*feel) - 459.67)
          
          if (temp > 30) { var emoji = '❄' }
          if (temp > 50) { var emoji = '🧥' }
          if (temp > 70) { var emoji = '😎' }
          if (temp > 80) { var emoji = '🌡' }

          return callback(emoji+' Today in '+json['name']+', '+json['sys']['country']+', it is '+temp+'° with '+weather+'. You can expect a high of '+high+'° and a low of '+low+'°.')
        })
        .catch(function(err){
        });
}

module.exports = { get }