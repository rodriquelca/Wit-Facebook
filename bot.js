'use strict';

// Weather Example testing  
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart
// const Wit = require('node-wit').Wit
const {Wit, log} = require('node-wit');
const {interactive} = require('node-wit');
const FB = require('./facebook.js');
const Config = require('./const.js');


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

// Bot actions
// const actions = {
//   say(sessionId, context, message, cb) {
//     console.log('messageaasdsa' + message);

//     // Bot testing mode, run cb() and return
//     if (require.main === module) {
//       cb();
//       return;
//     }

//     // Our bot has something to say!
//     // Let's retrieve the Facebook user whose session belongs to from context
//     // TODO: need to get Facebook user name
//     const recipientId = context._fbid_;
//     if (recipientId) {
//       // Yay, we found our recipient!
//       // Let's forward our bot response to her.
      // FB.fbMessage(recipientId, message, (err, data) => {
      //   if (err) {
      //     console.log(
      //       'Oops! An error occurred while forwarding the response to',
      //       recipientId,
      //       ':',
      //       err
      //     );
      //   }

      //   // Let's give the wheel back to our bot
      //   cb();
      // });
//     } else {
//       console.log('Oops! Couldn\'t find user in context:', context);
//       // Giving the wheel back to our bot
//       cb();
//     }
//   },
//   merge(sessionId, context, entities, message, cb) {
//     // Retrieve the location entity and store it into a context field
//     const loc = firstEntityValue(entities, 'location');
//     if (loc) {
//       context.loc = loc; // store it in context
//     }

//     cb(context);
//   },

//   error(sessionId, context, error) {
//     console.log(error.message);
//   },

//   // fetch-weather bot executes
//   ['fetch-weather'](sessionId, context, cb) {
//     // Here should go the api call, e.g.:
//     // context.forecast = apiCall(context.loc)
//     context.forecast = 'sunny';
//     cb(context);
//   },
// };

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    console.log('---session----');
    console.log(Config.sessions);
    const recipientId = Config.sessions[sessionId].fbid;
    if (recipientId) {

      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return FB.fbMessage(recipientId, text)
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
  }

};


const getWit = () => {
  return new Wit( {
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