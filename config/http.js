/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
      'assetsConfig',
      'startRequestTimer',
      'cookieParser',
      'session',
      'requestLogger',
      'miscellaneous',
      'flashMessage',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Custom middleware                                                         *
  *                                                                           *
  ****************************************************************************/

    requestLogger   : requestLogger(),
    miscellaneous   : miscellaneous(),
    flashMessage    : require("flash")(),
    assetsConfig    : assetsConfig(),


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};

//==============================================================================
//-- private...

function requestLogger() {
  return function(req, res, next) {
    if (sails.config.environment === "development") {
      sails.log.verbose("Requested :: ", req.method, req.url);
    }
    next();
  };
}

//------------------------------------------------------------------------------

function assetsConfig() {
  return function(req, res, next) {
    //-- assets version
    res.locals.assetsVersion = sails.config.assets.version;

    //-- assets base_url
    res.locals.assetsBaseUrl = sails.config.assets.base_url;

    next();
  };
}

//------------------------------------------------------------------------------

function miscellaneous() {
  return function(req, res, next) {
    var userAgent = req.headers["user-agent"];
    var xForwardedProto = req.headers["x-forwarded-proto"];
    var referer = req.headers["referer"] || "";

    //-- set SSL flag
    req.usingSSL = /^https$/i.test(xForwardedProto);

    //-- modify base url if using ssl
    if (req.usingSSL) {
      req.baseUrl = (req.baseUrl || "").replace("http:", "https:");
    }

    //-- set referer
    var pattern = "https?://" + req.host + "(:[0-9]+)?([^?]*)";
    var match = referer.match(new RegExp(pattern));
    req.referer = (match) ? match[2] || "/" : referer;

    //-- set isMobile property
    req.isMobile = /^m\./i.test(req.host) || /opera mini/i.test(userAgent) || !!(req.session.isMobile);
    if (!req.isMobile) {
      req.isMobile = req.session.isMobile = (req.query.m === ".");
    }

    //-- Util
    res.locals.Util = Util;

    next();
  };
}
