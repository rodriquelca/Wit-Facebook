

const _ = require('lodash');
weatherServer = require('../connectors/weatherServer.js') // need to change if we use processmakaer 
config = require('../processmaker.json')
/**
 * gets the weather
 */
const getWeather = (id, cb) => {
    var tpl;
    // console.log('asdas');
    // connecto to requiered services
    weatherServer.connect(id, function (res) {
        /************** HERE WE CAN CONNECT *********+ */
        // console.log('test call');
        weatherServer.getForecast(id, function (res) {
            // console.log('respuesta del server');
            res = JSON.parse(res);
            //     tpl = res;
            // console.log(res[1].current.temperature);
            // tpl = processTpl(res);
            cb(res[0].current.temperature + ' ºC');
        });
    });
};


module.exports = {
    getWeather: getWeather
};