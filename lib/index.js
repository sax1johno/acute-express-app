/**
 * Creates and returns a new express app.  The app returned will be used throughout the
 * application and will be listened to as part of the server.
 **/

/**
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
module.exports = function setup(options, imports, register) {
    var express = require('express'),
        app = express(),          // The main running app
        subapp = express,         // A constructor for subapps
        router = express.Router,  // A constructor / factory for new routers.
        // defaultConfig = require('../config'), // contains all possible configuration options
        // userConfig = options.configFileLocation || (__dirname + '../../config.js'),
        sutil = require('util'),
        async = require('async'),
        _ = require("underscore"),
        finalConfig = {};
      
    console.log("************options = ", options);
    // Run the app config function in the settings if it's present.
    if (!_.isUndefined(options.appConfig) && _.isFunction(options.appConfig)) {
      options.appConfig(app);
    }
    // console.log('finalConfig = ', finalConfig);
    register(null, {
      // "app" is the service this plugin provides
      app: {
        config: finalConfig,
        app: app,
        Router: router,
        Subapp: subapp
      }
  });
};
//   var db = imports.database;

