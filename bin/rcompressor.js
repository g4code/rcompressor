#!/usr/bin/env node
var RCompressor = require("../lib/rcompressor"),
	commander     = require("commander"),
	packageData   = require(__dirname + "/../package.json"),
	informer      = require("informer");

	commander.version(packageData.version)
		.usage("[options] [dir]")
		.option('-a, --action <n>',     'action - compress/revert')
		.option('-c, --config <n>',     'config file path')
		.parse(process.argv);

try {
    config = require(commander.config);
    var rCompressor = new RCompressor();
    rCompressor.request.config	= config;
    rCompressor.request.action	= commander.action;
    rCompressor.run();
} catch (err) {
    informer.error('Wrong config path');
}