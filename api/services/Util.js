/*
 * Util
 *
 */

var Url = require("url");

module.exports = {

  toUrl: function(path, query, options) {
    options = options || {};

    try {
      var urlObj = Url.parse(path, true);

      if (options.usingSSL) {
        urlObj.protocol = "https";
      } else {
        urlObj.protocol = urlObj.protocol || ((sails.config.usingSSL) ? "https" : "http");
      }
      urlObj.hostname = urlObj.hostname || sails.config.host;
      urlObj.port = urlObj.port || sails.config.port;
      urlObj.search = null;
      if (parseInt(urlObj.port) == 80) {
        urlObj.host = urlObj.hostname;
      }

      urlObj.query = urlObj.query || {};
      _.merge(urlObj.query, query || {});
    } catch (e) {
      return null;
    }

    return Url.format(urlObj);
  },

  //----------------------------------------------------------------------------

  toAssetsUrl: function(path) {
    var assetsVersion = sails.config.assets.version || "1";
    var assetsBaseUrl = sails.config.assets.base_url || "";

    var assetsUrl = assetsBaseUrl + (path || "/") + "?v=" + assetsVersion;
    return assetsUrl;
  }

};
