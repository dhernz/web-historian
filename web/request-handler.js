var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
	
	var indexData = null;
  var website = null;
  var body = '';
  var bodyParsed = '';
  if (req.method === 'GET') {

    // Examine the incoming url. If it's simply a slash, return the index path
    if(req.url === '/'){
      fs.readFile(archive.paths.index, function (err, data) {
       if (err) throw err;
       indexData = data.toString();
      // console.log('indexData', indexData);  
      res.end(indexData);
    });

    } 
    else if (req.url === '/arglebargle'){
      res.statusCode = 404;
      res.end();
    }
    // ************ NOTE: our file google.com was deleted from archives after running this file
    else { // If url is something besides a slash, attach the url to the archived sites path and return
      website = req.url;

      fs.readFile(archive.paths.archivedSites + website, function (err, data) {
       if (err) throw err;
       indexData = data.toString();
      // console.log('indexData', indexData);  
      res.end(indexData);
    });
    } 

  }

  if(req.method === 'POST'){

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function (){
        bodyParsed = JSON.parse(body).url;
        console.log('bodyParsed', bodyParsed );
      fs.writeFile(archive.paths.list, bodyParsed, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
        res.statusCode = 302;

      });

    });

  }

};


//@params url
// 