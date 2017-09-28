const Jwt = require('../../src/utils/jwt')
const config = require('config')

/**
 * post username and password
 * Will send the authenticated user info if authentication is succesful, otherwise it will send `Authentication failed`
 *
 * userInfo UserInfo user info for authenticate
 * returns inline_response_200
 * */
exports.postAuthentication = function postAuthentication(args, res) {
  const { userInfo: { value: { username, password } } } = args
  const authenticatedInfo = {}
  const jwt = new Jwt()

  if (username === 'admin' && password === 'admin') {
    authenticatedInfo.id = '10000'
    authenticatedInfo.name = 'Running Coder'
    const token = jwt.create({ userId: authenticatedInfo.id }, config.jwt.secret)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Set-Cookie', [`api_key=${token}`, 'HttpOnly'])
    res.json(authenticatedInfo)
  } else {
    res.status(400).send('Bad Request')
  }
}

