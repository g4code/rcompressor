var requirejs = require('requirejs');

process.on('message', function(config) {

    requirejs.optimize(config, function (buildResponse) {
        console.log( buildResponse);
        process.exit();
    }, function(err) {
        console.log(err);
        process.exit();
    });

});