var chai = require('chai');
var processmaker = require('../../../connectors/processmaker');
var should = chai.should();

describe('Blobs', function() {
    let config = {
    "PM_URL" : "54.80.253.90:8082",
    "PM_CLIENT_ID" : "2",
    "PM_CLIENT_SECRET" : "eGVLVooooza3sc4tGmhXgKmLcYntG4pA1azq77wu",
    "PM_USERNAME" : "ronald.otn@gmail.com",
    "PM_PASSWORD" : "123456"
}
    
    it('should retrieve access token', function(done) {
        

        processmaker.connect(config, function(res) {
            processmaker.access_token.should.be.equal(res)
            done()
        })
    })

    it('should retrieve process list', function(done) {
        

        processmaker.connect(config, function(res) {
            processmaker.getProcessList(function(res) {
                console.log(res)
                done()
            })
            
        })
    })

    it('should retrieve users list', function(done) {
   

        processmaker.connect(config, function(res) {
            processmaker.getUserList(function(res) {
                console.log(res)
                done()
            })
            
        })
    })
});