'use strict';

exports.billionairesGET = function(args, res, next) {
  /**
   * list of the world's billionaires
   * get top ten billionaires in the world
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "name" : "Bill Gates",
  "ranking" : {
    "number" : 1,
    "trend" : "steady"
  },
  "netWorth" : {
    "value" : "$86.0 billion",
    "trend" : "increase"
  },
  "age" : 61,
  "nationality" : "USA",
  "sourceOfWealth" : "Microsoft"
}, {
  "name" : "Warren Buffett",
  "ranking" : {
    "number" : 2,
    "trend" : "increase"
  },
  "netWorth" : {
    "value" : "$75.6 billion",
    "trend" : "increase"
  },
  "age" : 86,
  "nationality" : "USA",
  "sourceOfWealth" : "Berkshire Hathaway"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

