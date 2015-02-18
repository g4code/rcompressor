var fs = require('fs'),
    _  = require('underscore');

var revert = function(config){
    this.config = config;
    this.run();
};

revert.prototype = {

    getDistPath: function()
    {
        return this.config.baseUrl + '/' +  this.config.distPath;
    },

    run: function()
    {
        var allFiles = fs.readdirSync(this.getDistPath());

        _.each(allFiles, _.bind(this.revertSingle, this));
    },

    revertSingle: function(element, index, array)
    {
        if(element.indexOf(".save") > -1){
            var oldName = element.replace(".save", '');
            fs.rename(this.getDistPath() + element , this.getDistPath() + oldName, function(err) {
                if ( err ) {
                    console.log('ERROR: ' + err);
                }
            });
        }
    }
};

module.exports = revert;