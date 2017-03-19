// get Bot, const, and Facebook API
const bot = require('./bot.js');
const Config = require('./const.js');
const FB = require('./facebook.js');
//here the templates

// Setting up our bot
const wit = bot.getWit();

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
    console.log('use webhook 6666');
    const messaging = FB.getFirstMessagingEntry(req.body);
    console.log(messaging);
    if (messaging && messaging.message) {
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
    } else if (messaging && messaging.postback.payload) {
        // console.log('start process procesdure');
        // console.log(messaging.postback.payload);
        var res = messaging.postback.payload.split(",");
        const sender = messaging.sender.id;
        console.log(res);
        switch (res[0]) {
            case 'startProcess':
                FB.fbMessageReply(
                    sender,
                    'El Processo: ' + res[1] + ' sera iniciado.?',
                    'initProcess'
                );

                break;
            case 'initProcess':
                FB.fbMessageReply(
                    sender,
                    'Excriba su Nombre: ',
                    'needName'
                );

                break;
            case 'needName':
                FB.fbMessage(
                    sender,
                    'Se inicio el proceso exitosamente gracias '
                );
                break;
            default:

        }



    }
}

module.exports = {
    msgProcess: msgProcess
};