/*
Load Twilio configuration from .env config file - the following environment
variables should be set:

process.env.TWILIO_ACCOUNT_SID
process.env.TWILIO_API_KEY
process.env.TWILIO_API_SECRET
process.env.TWILIO_IPM_SERVICE_SID

*/

var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
require('dotenv').load();
var http = require('http');
var path = require('path');
var AccessToken = require('twilio').AccessToken;
var IpMessagingGrant = AccessToken.IpMessagingGrant;
var express = require('express'),
    app     = express();


var randomUsername = require('./randos');
var assert = require('assert');
var chrono = require('chrono-node')
var bodyParser = require('body-parser');


//Keywords
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Create Express webapp
// var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.post('/date', function(req,res){
    console.log(req.body.hello);
    // console.log(req.key);
//chrono.parseDate('An appointment on Sep 12-13')
});
/*

Generate an Access Token for a chat application user - it generates a random
username for the client requesting a token, and takes a device ID as a query
parameter.
*/



app.get('/token', function(request, response) {
    var appName = 'TwilioChatDemo';
    var identity = randomUsername();
    var deviceId = request.query.device;

    // Create a unique ID for the client on their current device
    var endpointId = appName + ':' + identity + ':' + deviceId;

    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    var ipmGrant = new IpMessagingGrant({
        serviceSid: process.env.TWILIO_IPM_SERVICE_SID,
        endpointId: endpointId
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );
    token.addGrant(ipmGrant);
    token.identity = identity;

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});

// Create http server and run it
var server = http.createServer(app);
var port = process.env.PORT || 3333;
server.listen(port, function() {
    console.log('Express server running on *:' + port);
});

// app.post('/alch', function(req, res) {
//
//     var obj = {};
// 	console.log('body: ' + JSON.stringify(req.body));
//     console.log(req.body);
//     console.log(req.data);
//     console.log(req)
// 	res.send(req.body);
//
// });


app.get('/alch/:message', function(req,res){

    //console.log(req.params.message)
    //res.send
    //console.log(keywords(req.params.message))
    var msg=req.params.message
    alchemyapi.keywords('text', msg, null, function(response) {
        //console.log(response['status']);
        //console.log(response.keywords);
        console.log(response)
        console.log(response.keywords)
        res.send(response.keywords)
});







});
