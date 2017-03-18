
const _ = require('lodash');

const get = (id) => {
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

    return tpl;
}

module.exports = {
    get: get
};