/*
  Someone please help me make this code better
  
  ////////////////////////////////////////////
  /      HOW TO USE THE WEATHER COMMAND      /
  ////////////////////////////////////////////
  
    Since I was too lazy to make a README, I
  incorporated a how-to inside the code!
  So let me explain.
  
    First, you need a OpenWeatherMap account.
  Luckily, you can make one for free. Just
  head over to openweathermap.org.
  
    Second, you need to get the API key. 
  Note that the default key takes a few 
  minutes to activate once you create 
  your account. After a bit, you can
  try it with an api link, like:
  
  api.openweathermap.org/data/2.5/weather?q=place&appid=key
  
    Then put the api key into api.json,
  start the bot, and run c.weather place (single str)
  You should get the temperature, the weather, 
  and the high and low. And that's it.
*/

const rp = require('request-promise');
const api = require('../../config.json')

function get(place, callback) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q='+place+'&appid='+api['api']['OWP_KEY']

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
