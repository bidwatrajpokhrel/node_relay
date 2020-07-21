const express = require('express');
const getToken = require('./test');

const app = express();

app.listen(3000, ()=> console.log('Initialized at port 3000'))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.post('/api', (request, response) => {
    const client_credentials = {
        client_id: request.body.client_id,
        client_secret: request.body.client_secret
    }

    if(!client_credentials.client_id || !client_credentials.client_secret){
        response.status(400).json({message: 'Please send in client_id and a client_secret'});
    }
    console.log(getToken.postOauthRequest(client_credentials.client_id, client_credentials.client_secret))

    
});