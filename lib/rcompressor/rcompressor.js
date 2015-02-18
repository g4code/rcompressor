var fs = require('fs'),
    _  = require('underscore'),
    process = require('child_process');

var Compressor = function(config){
    this.config = config;
    this.run();
};

Compressor.prototype = {

    status: true,

    filesForCompress: [],

    run:function()
    {
        this.getFiles();

        if(this.status){
            this.compress();
        }else{
            console.log(this.status, "Already compressed");
        }
    },

    getDistPath: function()
    {
         return this.config.baseUrl + '/' +  this.config.distPath;
    },

    getFiles: function()
    {
        var allFiles = fs.readdirSync(this.getDistPath());
        _.each(allFiles, _.bind(this.checkSingleFile, this));
    },

    checkSingleFile: function(element, index, array)
    {
        if(element != "config.js"){
            this.filesForCompress.push(element);
        }

        if(element.indexOf(".save") > -1){
            this.status = false;
        }
    },

    compress: function()
    {
        _.each(this.filesForCompress, _.bind(this.compressSingle, this));
    },

    compressSingle: function(element, index, array)
    {
        fs.writeFileSync(this.getDistPath()  + element + '.save', fs.readFileSync(this.getDistPath() + element));

        var name = element.replace(".js", '');
        this.config.name = "../dist/" + name;
        this.config.out = this.getDistPath() + element;

        var compress = process.fork(__dirname + '/compress.js');
        compress.send(this.config);
        compress.on('exit', function() {
            console.log("compress finished");
        })
    }

};

module.exports = Compressor;