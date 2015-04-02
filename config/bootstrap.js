/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  //-- set usingSSL and appURL properties
  //-- copied from sails/lib/app/index.js
  sails.config.usingSSL = (
      sails.config.serverOptions &&
      sails.config.serverOptions.key &&
      sails.config.serverOptions.cert
      );
  sails.config.appURL = (sails.config.usingSSL ? "https" : "http") + "://" + sails.config.host
    + (parseInt(sails.config.port) != 80 ? ":" + sails.config.port : "");

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
