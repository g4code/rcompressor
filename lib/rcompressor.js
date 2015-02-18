var Compressor  = require('./rcompressor/rcompressor');
var Revert  = require('./rcompressor/revert');
var path  = require('path');

var rCompressor = function(){};

rCompressor.prototype = {

    request: {},

    compress: function()
    {
        new Compressor(this.request.config);
    },

    getAbsolutePath: function(pathValue)
    {
        return path.normalize(pathValue.charAt(0) === '/' ?
            pathValue :
            process.cwd() + '/' + pathValue);
    },

    run: function()
    {
        this.setConfig();
        this.request.action == "compress" ?
            this.compress() :
            this.revert();
    },

    revert: function()
    {
        new Revert(this.request.config)
    },

    setConfig: function()
    {
        this.request.config = require(this.getAbsolutePath(this.request.configPath));
        this.request.config.baseUrl = this.getAbsolutePath(this.request.baseUrl);
    }

};

module.exports = rCompressor;