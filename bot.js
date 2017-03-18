'use strict';

// Weather Example testing  
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart
// const Wit = require('node-wit').Wit
const {Wit, log} = require('node-wit');
const {interactive} = require('node-wit');
const FB = require('./facebook.js');
const Config = require('./const.js');
const _ = require('lodash');


const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    console.log('---session----');
    console.log(Config.sessions);
    const recipientId = Config.sessions[sessionId].fbid;
    
    if (recipientId) {
      // validating if has Tpl
      if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        //the json is ok
        var text = JSON.parse(text);
        let hasTpl = true;
      } else {

        //the json is not ok
         hasTpl = false;
      }
      
      l
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return FB.fbMessage(recipientId, text, hasTpl)
        .then(() => null)
        .catch((err) => {
          console.error(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err.stack || err
          );
        });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
   getForecast({context, entities}) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.forecast = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },

  getTemplate({context, entities}) {
     var ordinal = firstEntityValue(entities, 'ordinal');

    console.log('revision');
    console.log(ordinal);
    // var location = firstEntityValue(entities, 'location');
    // if (location) {
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
      context.template = JSON.stringify(tpl); // we should call a weather API here

      // delete context.missingLocation;
    // } else {
    //   context.missingLocation = true;
    //   delete context.forecast;
    // }
    return context;
  }
};


const getWit = () => {
  return new Wit({
    accessToken: Config.WIT_TOKEN,
    actions,
    logger: new log.Logger(log.DEBUG) // optional
  });
};

exports.getWit = getWit;

// bot testing mode
// http://stackoverflow.com/questions/6398196
if (require.main === module) {
  console.log("Bot testing mode.");
  const client = getWit();
  interactive(client);
}