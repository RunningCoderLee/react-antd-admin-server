const url = require('url')

const Authentication = require('./AuthenticationService')

module.exports.postAuthentication = function postAuthentication(req, res, next) {
  Authentication.postAuthentication(req.swagger.params, res, next)
}
