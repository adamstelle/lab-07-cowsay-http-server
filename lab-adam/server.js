'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const queryString = require('querystring');
const PORT = process.env.PORT || 3000;

http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log(req.url.query.text);
  console.log(req.method);

  if (req.url === '/'){
    res.writeHead('200', {'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end();
  }

  if (req.url.pathname === '/cowsay') {
    switch(req.method){
    case 'POST':
      parseBody(req, res, function(err, data){
        if (err) return console.error(err);
        var body = JSON.parse(data);
        res.statusCode = 200;
        res.write(cowsay.say({text:body['body']}));
        res.end();
      });
      break;

    case 'GET':
      if (req.url.query.text){
        console.log(req.url.query.text);
        res.writeHead('200', {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.url.query.text}));
        res.end();
      } else {
        res.writeHead('400', {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\n try: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
      break;
    }
  }
}).listen(PORT);
