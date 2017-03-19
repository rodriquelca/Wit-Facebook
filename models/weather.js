

const _ = require('lodash');
weatherServer = require('../connectors/weatherServer.js') // need to change if we use processmakaer 
config = require('../processmaker.json')
/**
 * gets the weather
 */
const wheather = (id, cb) => {
    var tpl;
    // console.log('asdas');
    // connecto to requiered services
    weatherServer.connect(id, function (res) {
        /************** HERE WE CAN CONNECT *********+ */
        // console.log('test call');
        weatherServer.getForecast(id, function (res) {
            // console.log('respuesta del server');
            // res = JSON.parse(res);
            //     tpl = res;
            // console.log(res[1].current.temperature);
            tpl = processTpl(res);
            cb(tpl);
        });
    });
};
const processTpl = (res) => {
    return tpl = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_checkin",
        "intro_message": "Check-in is available now.",
        "locale": "en_US",
        "pnr_number": "ABCDEF",
        "flight_info": [
          {
            "flight_number": "f001",
            "departure_airport": {
              "airport_code": "SFO",
              "city": "San Francisco",
              "terminal": "T4",
              "gate": "G8"
            },
            "arrival_airport": {
              "airport_code": "SEA",
              "city": "Seattle",
              "terminal": "T4",
              "gate": "G8"
            },
            "flight_schedule": {
              "boarding_time": "2016-01-05T15:05",
              "departure_time": "2016-01-05T15:45",
              "arrival_time": "2016-01-05T17:30"
            }
          }
        ],
        "checkin_url": "https:\/\/www.airline.com\/check-in"
      }
    }
  }
};

module.exports = {
    wheather: wheather
};