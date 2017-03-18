var wheather = require('./models/weather');
var facker = require('./models/facker');
var wait = require('wait.for');

/**
 * example to use the factory
 */


module.exports = {
	getWeather: wheather.getWeather
    // facker: facker.getFacker
}
