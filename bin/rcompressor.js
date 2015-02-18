#!/usr/bin/env node
var RCompressor = require("../lib/rcompressor"),
	commander     = require("commander"),
	packageData   = require(__dirname + "/../package.json"),
	informer      = require("informer");

	commander.version(packageData.version)
		.usage("[options] [dir]")
		.option('-a, --action <n>',     'action - compress/revert')
		.option('-c, --config <n>',     'config file path')
		.option('-u, --baseUrl <n>',   'base url')
		.parse(process.argv);


config = require(commander.config);
config.baseUrl = commander.baseUrl;

var rCompressor = new RCompressor();
rCompressor.request.config	= config;
rCompressor.request.action	= commander.action;
rCompressor.run();
