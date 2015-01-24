var architect = require('architect'),
    path = require('path'),
    thisApp,
    sutil = require('util'),
    async = require('async');
    
describe('app', function() {
    before(function(done) {
        var configPath = path.join(__dirname, "testconfig.js");
        var config = architect.loadConfig(configPath);
        architect.createApp(config, function (err, arch) {
            if (err) {
                console.log("error was encountered", err);
                done(err);
            } else {
                // console.log(sutil.inspect(arch));
                thisApp = arch;
                done();
            }
        });
    });
    describe("#app", function() {
        it("should return an express app", function(done) {
            var serviceObject = thisApp.getService("app");
            var app = serviceObject.app;
            console.log(sutil.inspect(app));
            done();
        });
    });
    describe("#subapp", function() {
        it("should return a new express app", function(done) {
            var serviceObject = thisApp.getService("app");
            var subapp = serviceObject.Subapp();
            var app = serviceObject.app;
            subapp.get("/test", function(req, res, next) {
                console.log("Test get request");
            });
            serviceObject.app.use(subapp)
            console.log(sutil.inspect(app));
            done();
        });
    });
    describe("#router", function() {
        it("should return an express router", function(done) {
            var serviceObject = thisApp.getService("app");
            var router = serviceObject.Router();
            var app = serviceObject.app;
            router.get("/testRoute", function(req, res, next) {
                console.log("Test get request");
            });
            app.use('/test', router);
            console.log(sutil.inspect(app));
            done();
        });
    });

});
