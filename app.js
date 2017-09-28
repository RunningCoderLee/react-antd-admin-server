const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const swaggerTools = require('swagger-tools')
const jsyaml = require('js-yaml')
const fs = require('fs')
const cors = require('cors')
const securityHandler = require('./src/utils/securityHandler.js')

require('dotenv').config()

const apiFile = fs.readFileSync(path.join(__dirname, '/src/api/swagger.yaml'), 'utf8')
const apiJson = jsyaml.safeLoad(apiFile)
const routerOpt = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './src/controllers'),
  useStubs: process.env.NODE_ENV === 'development', // Conditionally turn on stubs (mock mode)
}


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))


// function handleApiKey(req, authOrSecDef, scopesOrApiKey, callback) {
//   let err = null
//   const val = scopesOrApiKey

//   if (scopesOrApiKey === '123123') {
//     return callback()
//   }

//   if (scopesOrApiKey === '') {
//     err = new Error('Unauthorized')
//   } else {
//     err = new Error('Forbidden')
//   }

//   return callback(err, val)
// }


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

swaggerTools.initializeMiddleware(apiJson, (swaggerMiddleware) => {
  const validatorOpt = { validateResponse: true }
  const securityOptions = { api_key: securityHandler }

  app.use(swaggerMiddleware.swaggerMetadata())

  app.use(swaggerMiddleware.swaggerSecurity(securityOptions))

  app.use(swaggerMiddleware.swaggerValidator(validatorOpt))

  app.use(swaggerMiddleware.swaggerRouter(routerOpt))

  app.use(swaggerMiddleware.swaggerUi())
})


module.exports = app

