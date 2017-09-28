const Jwt = require('../../src/utils/jwt')
const config = require('config')

function securityHandler(req, authOrSecDef, scopesOrApiKey, callback) {
  try {
    Jwt.verify(scopesOrApiKey, config.jwt.secret)

    callback()
  } catch (err) {
    err.statusCode = 401
    callback(err)
  }
}

module.exports = securityHandler
