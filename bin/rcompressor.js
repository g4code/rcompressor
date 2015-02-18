#!/usr/bin/env node
var RCompressor   = require("../lib/rcompressor"),
	commander     = require("commander"),
	packageData   = require(__dirname + "/../package.json"),

	informer      = require("informer");

	commander.version(packageData.version)
		.usage("[options] [dir]")
		.option('-a, --action <n>',     'action - compress/revert')
		.option('-c, --config <n>',     'config file path')
		.option('-u, --baseUrl <n>',   'base url')
		.parse(process.argv);

var rCompressor = new RCompressor();
rCompressor.request.configPath	= commander.config;
rCompressor.request.action	= commander.action;
rCompressor.request.baseUrl = commander.baseUrl;
rCompressor.run();
