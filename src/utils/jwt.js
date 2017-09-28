const jwt = require('jsonwebtoken')
const uuid = require('uuid')

class Jwt {
  constructor(expirationTime = Math.floor(Date.now() / 1000) + (5 * 60)) {
    this.header = {
      typ: 'jwt',
      alg: 'hs256',
    }

    this.defaultPayload = {
      exp: expirationTime,
      sub: 'http://react-antd-admin-server',
      iss: 'react-antd-admin-server',
      nbf: Math.floor(Date.now() / 1000),
    }
  }

  create(payload, secretOrPrivateKey) {
    const finalPayload = Object.assign({}, payload, this.defaultPayload)
    const options = {
      algorithm: 'HS256',
      jwtid: uuid.v4(),
    }

    return jwt.sign(finalPayload, secretOrPrivateKey, options)
  }

  static verify(token, secretOrPublicKey) {
    const options = {
      maxAge: '6m',
    }

    return jwt.verify(token, secretOrPublicKey, options)
  }

  static decode(token) {
    return jwt.decode(token, { complete: true })
  }
}

module.exports = Jwt
