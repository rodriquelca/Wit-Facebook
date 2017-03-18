

const _ = require('lodash');
PM = require('../connectors/fackerServer.js') // need to change if we use processmakaer 
config = require('../processmaker.json')
/**
 * gets the weather
 */
const getProcessList = (id, cb) => {
    var tpl;
    // console.log('asdas');
    // connecto to requiered services
    PM.connect(config, function (res) {
        /************** HERE WE CAN CONNECT *********+ */
        console.log('connecte to server success');
        PM.getProcessList(function (res) {
            // console.log('respuesta del server');
            //  console.log(res);
            tpl = processTplList(res);
            cb(tpl);
        });
    });
};

var processTplList = (res) => {
    // console.log('into de template');
    // console.log(res);

    let tpl = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "elements": [
                    {
                        "title": 'title 1 sdsd',
                        "image_url": "https://www.processmaker.com/sites/all/themes/pmthemev2/img/white-badge.png",
                        "subtitle": user.attributes.email,
                        "buttons": [
                            {
                                "title": "View Details",
                                "type": "web_url",
                                "url": "https://processmaker.com",
                                //"messenger_extensions": true,
                                "webview_height_ratio": "tall"
                                //"fallback_url": "https://processmaker.com"
                            }
                        ]
                    },
                    {
                        "title": 'title 2',
                        "image_url": "https://www.processmaker.com/sites/all/themes/pmthemev2/img/white-badge.png",
                        "subtitle": user.attributes.email,
                        "buttons": [
                            {
                                "title": "View Details",
                                "type": "web_url",
                                "url": "https://processmaker.com",
                                //"messenger_extensions": true,
                                "webview_height_ratio": "tall"
                                //"fallback_url": "https://processmaker.com"
                            }
                        ]
                    }
                ],

                "buttons": [
                    {
                        "title": "View More",
                        "type": "postback",
                        "payload": "payload"
                    }
                ]
            }
        }
    };
    // console.log('--- result tpl ----');
    // console.log(tpl);
    return tpl;
};
console.log('connect to pm');
getProcessList(0, function (tpl) {
    console.log('finiches');
    console.log(tpl);
});
module.exports = {
    getProcessList: getProcessList
};