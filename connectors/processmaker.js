let request = require('superagent')
let Processmaker = {
    access_token: '',
    url: '',
    connect: function (config, cb) {
        root = this
        this.url = config.PM_URL
        request.post(this.url+'/oauth/access_token')
            .send ({
                grant_type: 'password', 
                client_id: config.PM_CLIENT_ID,
                client_secret: config.PM_CLIENT_SECRET,
                username: config.PM_USERNAME,
                password: config.PM_PASSWORD
            })
            .end (function(err, res) {
                if (err || !res.ok) {
                    console.log('ERROR');
                } else {
                    root.access_token = res.body.access_token
                    cb(res.body.access_token)
                }
            })
    },
    getProcessList: function (cb) {
        if (this.access_token !== '') {
            request.get(this.url+'/api/v1/processes')
                .set('Authorization', 'Bearer ' + this.access_token)
                .end (function(err, res) {
                    if (err || !res.ok) {
                        console.log('ERROR');
                    } else {
                        cb(res.body)
                    }
                })
        } else {
            console.log('NOT AUTHORIZED')
        } 
    },
    getStartProcessList: function (cb) {
        cb();
    },
    getUserList: function (cb) {
        if (this.access_token !== '') {
            request.get(this.url+'/api/v1/users')
                .set('Authorization', 'Bearer ' + this.access_token)
                .end (function(err, res) {
                    if (err || !res.ok) {
                        console.log('ERROR');
                    } else {
                        cb(res.body)
                    }
                })
        } else {
            console.log('NOT AUTHORIZED')
        }
    }
}
 
module.exports = Processmaker