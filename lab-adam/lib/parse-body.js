'use strict';

module.exports = function(req, res, callback) {
  var body = '';
  req.on('data', function(data){
    body += data.toString();
    // res.write(req.body);
  });
  res.on('error', function(err) {
    console.log(err);
  });
  req.on('end', function() {
    callback(null, body);
  });
};
