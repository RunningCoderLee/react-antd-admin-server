const url = require('url')

const Billionaires = require('./BillionairesService')

module.exports.billionairesGET = function billionairesGET(req, res, next) {
  Billionaires.billionairesGET(req.swagger.params, res, next)
}
