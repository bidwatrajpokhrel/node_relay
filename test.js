// We need this to build our post string
var querystring = require('querystring');
var http = require('https');

var returnData;
function postOauthRequest(client_id, client_secret){

    // Build the post string from an object
    var post_data = querystring.stringify({
    'grant_type': 'client_credentials'
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'apex.oracle.com',
        path: '/pls/apex/kiosk_/oauth/token',
        method: 'POST',
        headers: {    
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {

        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            returnData =  body.toString();
        });

        res.on("er", function (error) {
            console.error(error);
            returnData = body.toString();
        });       
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

module.exports.postOauthRequest = postOauthRequest;