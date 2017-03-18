var wheather = require('./models/weather');
var facker = require('./models/facker');

/**
 * example to use the factory
 */
// console.log('init the process');
// var result = wheather.getWeather(0, function(tpl) {
//     console.log('---all has been finixed---');
//     console.log(tpl);
// });

module.exports = {
	getWeather: wheather.getWeather
    // facker: facker.getFacker
}
