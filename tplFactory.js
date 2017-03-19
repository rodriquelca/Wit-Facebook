var wheather = require('./models/weather');
var facker = require('./models/facker');
var processmaker = require('./models/processmaker');
var wait = require('wait.for');

/**
 * example to use the factory
 */


//   wheather.getWeather('El Alto', function(tpl){
//         console.log('la data:')
//         console.log(tpl);
//         return tpl;
//       });
module.exports = {
	getWeather: wheather.getWeather,
    facker: facker.getFacker,
    getProcessList: processmaker.getProcessList
}
