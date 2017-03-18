var weather = require('weather-js');

const weatherServer = {
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

    getForecast: function (cb) {
        console.log(this.url);
        weather.find({search: 'El Alto, BO', degreeType: 'C'}, function(err, result) {

            if(err) console.log(err);
            // console.log(JSON.stringify(result, null, 2));
             cb(JSON.stringify(result, null, 2));
        });
    },
}

module.exports = weatherServer