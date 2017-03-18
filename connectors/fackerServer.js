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
}

module.exports = facker