// get Bot, const, and Facebook API
const bot = require('./bot.js');
const Config = require('./const.js');
const FB = require('./facebook.js');
//here the templates
const first = require('./tpls/first.js');

// Setting up our bot
const wit = bot.getWit();

// Webserver parameter
const PORT = process.env.PORT || 8445;


// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}


const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(Config.sessions).forEach(k => {
    if (Config.sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    Config.sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }; // set context, _fid_
  }
  return sessionId;
};



const msgProcess = (req, res) => {
  // Parsing the Messenger API response
  const messaging = FB.getFirstMessagingEntry(req.body);

  if (messaging && messaging.message) {
   console.log ('messaging.message' + messaging.message)
    // Yay! We got a new message!

    // We retrieve the Facebook user ID of the sender
    const sender = messaging.sender.id;

    // We retrieve the user's current session, or create one if it doesn't exist
    // This is needed for our bot to figure out the conversation history
    const sessionId = findOrCreateSession(sender);

    // We retrieve the message content
    const msg = messaging.message.text;
    const atts = messaging.message.attachments;

    if (atts) {
      // We received an attachment

      // Let's reply with an automatic message
      FB.fbMessage(
        sender,
        'Sorry I can only process text messages for now.'
      );
    } else if (msg) {

      // We received a text message
      if (msg === 'template') {
         FB.fbMessage(
          sender,
          'aqui se procesa el template'
        );
      } else {
          // Let's forward the message to the Wit.ai Bot Engine
          // This will run all actions until our bot has nothing left to do
          wit.runActions(
            sessionId, // the user's current session
            msg, // the user's message 
            Config.sessions[sessionId].context, // the user's current session state
            (error, context) => {
              if (error) {
                console.log('Oops! Got an error from Wit:', error);
              } else {
                // Our bot did everything it has to do.
                // Now it's waiting for further messages to proceed.
                console.log('Waiting for futher messages.');

                // Based on the session state, you might want to reset the session.
                // This depends heavily on the business logic of your bot.
                // Example:
                // if (context['done']) {
                //   delete sessions[sessionId];
                // }

                // Updating the user's current session state
                sessions[sessionId].context = context;
              }
            }
          );
      }

    }
  }
}
// public sources
module.exports = {
  msgProcess: msgProcess
};