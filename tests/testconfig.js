var express = require('express'),
    bodyparser = require('body-parser'),
    session = require('express-session');

module.exports = [
    {
        packagePath: "../",
        appConfig: function(app, fn) {
            // app.set('uploadDir', "/public/files");
            app.use(express.static(__dirname + '/app/public'));
            app.use(session({ secret: "keyboardcat" }));
            app.set('views', __dirname + "/views");
            app.set('view engine', "jade");
        }
    }
]