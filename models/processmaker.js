

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
    console.log('into de template');
    console.log(res);
    var elements = [];
    var process;
    for (let i = 0; i < res.length; i += 1) {
        process = res[i];
        console.log('testttttttttt');
        console.log(process);
        var payload = "startProcess,"+process.text+","+process.processId+","+ process.taskId+","+process.forms[0].formId;
        console.log(payload);
        elements.push(
            {
                "title": process.text,
                "image_url": "http://i3.wp.com/auraportal.com/wp-content/uploads/2016/06/what-bpm1.jpg",
                "subtitle": 'user2@aa.com',
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Start Process",
                        "payload": payload
                    },
                    {
                        "type": "postback",
                        "title": "View details",
                        "payload": "hello Processmaker",

                    }]
            }
        );
    }

    let tpl = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
    // console.log('--- result tpl ----');
    // console.log(tpl);
    return tpl;
};
// console.log('connect to pm');
// getProcessList(0, function (tpl) {
//     console.log('finiches');
//     console.log(tpl);
// });
module.exports = {
    getProcessList: getProcessList
};