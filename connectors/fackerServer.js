let request = require('superagent')
let facker = {
    access_token: '',
    url: '',
    connect: function (config, cb) {
        var root = this
        this.url = config.PM_URL;
        console.log('connected');

        // request.post(this.url + '/oauth/access_token')
        //     .send({
        //         grant_type: 'password',
        //         client_id: config.PM_CLIENT_ID,
        //         client_secret: config.PM_CLIENT_SECRET,
        //         username: config.PM_USERNAME,
        //         password: config.PM_PASSWORD
        //     })
        //     .end(function (err, res) {
        //         if (err || !res.ok) {
        //             console.log('ERROR');
        //         } else {
        //             root.access_token = res.body.access_token
        //             cb(res.body.access_token)
        //         }
        //     })
        cb();
    },

    getFackerList: function (cb) {

        // if (this.access_token !== '') {
        console.log(this.url);
        request.get(this.url + '/posts')
            // .set('Authorization', 'Bearer ' + this.access_token)
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.log('ERROR');
                } else {
                    cb(res.body)
                }
            })
        // } else {
        //     console.log('NOT AUTHORIZED')
        // }
    },
    getProcessList: function (cb) {

        // if (this.access_token !== '') {
        // console.log(this.url);
        // request.get(this.url + '/processList')
        //     // .set('Authorization', 'Bearer ' + this.access_token)
        //     .end(function (err, res) {
        //         if (err || !res.ok) {
        //             console.log('ERROR');
        //         } else {
        var res = {};
        res.body = [
            {
                "text": "Impuestos (Bien Inmueble)",
                "processId": "83273528458cd5c0f43c3d9089092560",
                "taskId": "35066809558cd7a3562e5d2097334761",
                "forms": [
                    {
                        "formId": "90804388958cd82e4777107026620285",
                        "formUpdateDate": "2017-03-18 15:03:42",
                        "index": 1,
                        "title": "Impuesto Bien Inmueble",
                        "description": "",
                        "stepId": "82646363158cd852fca0fb6082592600",
                        "stepUidObj": "90804388958cd82e4777107026620285",
                        "stepMode": "EDIT",
                        "stepPosition": 1,
                        "triggers": {
                            "before": false,
                            "after": false
                        }
                    }
                ]
            },
            {
                "text": "Impuestos (Vehículo)",
                "processId": "83273528458cd5c0f43c3d9089092560",
                "taskId": "87612335758cd7a350a1555088167875",
                "forms": [
                    {
                        "formId": "14313870358cd7b1093c692015375504",
                        "formUpdateDate": "2017-03-18 15:02:39",
                        "index": 1,
                        "title": "Impuesto Vehículo",
                        "description": "",
                        "stepId": "65476940458cd853f36a253020751735",
                        "stepUidObj": "14313870358cd7b1093c692015375504",
                        "stepMode": "EDIT",
                        "stepPosition": 1,
                        "triggers": {
                            "before": false,
                            "after": false
                        }
                    }
                ]
            }
        ];
        cb(res.body)
        //     }
        // })
        // } else {
        //     console.log('NOT AUTHORIZED')
        // }
    },
}

module.exports = facker