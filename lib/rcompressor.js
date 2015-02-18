var Compressor  = require('./rcompressor/rcompressor');
var Revert  = require('./rcompressor/revert');

var rCompressor = function(){};

rCompressor.prototype = {

    request: {},

    compress: function()
    {
        new Compressor(this.request.config);
    },

    run: function()
    {
        this.setRelativeBaseUrlPath();
        this.request.action == "compress" ?
            this.compress() :
            this.revert();
    },

    revert: function()
    {
        new Revert(this.request.config)
    },

    setRelativeBaseUrlPath: function()
    {
        this.request.config.baseUrl = '../..' + this.request.config.baseUrl;
    }

};

module.exports = rCompressor;