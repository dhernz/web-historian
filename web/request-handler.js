var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
	var statusCode;

	var indexData = null;
	if (req.method === 'GET') {
		fs.readFile(archive.paths.index, function (err, data) {
			if (err) throw err;
			indexData = data.toString();
		});
		statusCode = 200;
	}

	res.end("/<input/");
};
