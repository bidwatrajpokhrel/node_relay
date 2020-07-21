var https = require('follow-redirects').https;


var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'apex.oracle.com',
  'path': '/pls/apex/kiosk_/oauth/token',
  'headers': {
    'Authorization': 'Basic cFRnbWJEc0x6WG9raDUtS19fdDVzdy4uOnd3MkRudklWVjlzaXFkY0U5Mm9vOWcuLg==',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  'maxRedirects': 0
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'grant_type': 'client_credentials'
});

req.write(postData);

req.end();