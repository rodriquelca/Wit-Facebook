var wheather = require('./models/weather');
var facker = require('./models/facker');
var wait = require('wait.for');

/**
 * example to use the factory
 */


  wheather.getWeather(0, function(tpl){
        console.log('la data:')
        console.log(tpl);
        return tpl;
      });
module.exports = {
	getWeather: wheather.getWeather
    // facker: facker.getFacker
}
