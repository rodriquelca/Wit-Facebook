

const _ = require('lodash');
fackerServer = require('../connectors/fackerServer.js') // need to change if we use processmakaer 
config = require('../processmaker.json')
/**
 * gets the weather
 */
const getFacker = (id) => {
    var tpl;
    console.log('asdas');
    // connecto to requiered services
    fackerServer.connect(config, function (res) {

        /************** HERE WE CAN CONNECT *********+ */
        console.log('test call');
        fackerServer.getFackerList(function (res) {
            //     console.log(res);
            //     tpl = res;
            console.log('respuesta del server');
            console.log(res);
            tpl = processTpl(1);
        });
    })
    return tpl;
};

var processTpl = (id) => {

    let tpl = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "airline_update",
                "intro_message": "Your flight is delayed",
                "update_type": "delay",
                "locale": "en_US",
                "pnr_number": "CF23G2",
                "update_flight_info": {
                    "flight_number": "KL123",
                    "departure_airport": {
                        "airport_code": "SFO",
                        "city": "San Francisco",
                        "terminal": "T4",
                        "gate": "G8"
                    },
                    "arrival_airport": {
                        "airport_code": "AMS",
                        "city": "Amsterdam",
                        "terminal": "T4",
                        "gate": "G8"
                    },
                    "flight_schedule": {
                        "boarding_time": "2015-12-26T10:30",
                        "departure_time": "2015-12-26T11:30",
                        "arrival_time": "2015-12-27T07:30"
                    }
                }
            }
        }
    };
    console.log('--- result tpl ----');
    console.log(tpl);
    return tpl;
};
module.exports = {
    getFacker: getFacker
};