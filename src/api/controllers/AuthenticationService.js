'use strict';

exports.postAuthentication = function(args, res, next) {
  /**
   * post username and password
   * Will send the authenticated user info if authentication is succesful, otherwise it will send `Authentication failed`
   *
   * userInfo UserInfo user info for authenticate
   * returns inline_response_200
   **/
  var examples = {};
  examples['application/json'] = {
  "id" : "10000",
  "name" : "Running Coder",
  "token" : "xxxxxxxxxx"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

