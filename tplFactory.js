var wheather = require('./models/weather');
var facker = require('./models/facker');
var wait = require('wait.for');

/**
 * example to use the factory
 */


function  testWaitFunction(){
    console.log('fiber start');
    var result = wait.for(wheather.getWeather, 0);
    console.log('function returned:', result);
    console.log('fiber end');
};

// console.log('app start');
// wait.launchFiber(testWaitFunction);
// console.log('after launch');


module.exports = {
	getWeather: wait.launchFiber(testWaitFunction)
    // facker: facker.getFacker
}
