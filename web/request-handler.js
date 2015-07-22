var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
	
	var indexData = null;
  var website = null;

	if (req.method === 'GET') {

    // Find out url of req object
    console.log('req.url', req.url);
    if(req.url === '/'){
      fs.readFile(archive.paths.index, function (err, data) {
       if (err) throw err;
       indexData = data.toString();
      // console.log('indexData', indexData);  
      res.end(indexData);
    });

    } else {
      website = req.url;

      fs.readFile(archive.paths.archivedSites + website, function (err, data) {
       if (err) throw err;
       indexData = data.toString();
      // console.log('indexData', indexData);  
      res.end(indexData);
    });
    }
 
  }

};


//@params url
// 