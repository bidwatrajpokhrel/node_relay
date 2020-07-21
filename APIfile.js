const express = require('express');
var querystring = require('querystring');
var http = require('https');
const { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } = require('constants');

const app = express();

var post_data = querystring.stringify({
    'grant_type': 'client_credentials'
    });

app.listen(3000, ()=> console.log('Initialized at port 3000'))

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.post('/api', (request, response) => {
    const client_credentials = {
        client_id: request.body.client_id,
        client_secret: request.body.client_secret
    }

    if(!client_credentials.client_id || !client_credentials.client_secret){
        response.status(400).json({message: 'Please send in client_id and a client_secret'});
    }

    var post_options = {
        host: 'apex.oracle.com',
        path: '/pls/apex/csk/oauth/token',
        method: 'POST',
        headers: {    
        'Authorization': 'Basic ' + Buffer.from(client_credentials.client_id + ':' + client_credentials.client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var post_req = http.request(post_options, function(res) {

        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            response.json(JSON.parse(body.toString()));
        });

        res.on("er", function (error) {
            console.error(error);
            response.json(JSON.parse(body.toString()));
        });       
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

    
});