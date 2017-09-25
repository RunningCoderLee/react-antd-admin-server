

exports.postAuthentication = function postAuthentication(args, res) {
  /**
   * post username and password
   * Will send the authenticated user info if authentication is succesful, otherwise it will send `Authentication failed`
   *
   * userInfo UserInfo user info for authenticate
   * returns inline_response_200
   * */
  const { userInfo: { value: { username, password } } } = args
  const authenticatedInfo = {}

  if (username === 'admin' && password === 'admin') {
    authenticatedInfo.name = 'admin'
    authenticatedInfo.token = 'token'
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(authenticatedInfo || {}, null, 2))
  } else {
    res.status(400).send('Bad Request')
  }
}

