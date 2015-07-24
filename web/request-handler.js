var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!
var url = require('url');
var helpers = require('./http-helpers');

var getPost = function(request, response){
  var bodyParsed = '';
  var obj = null;

  helpers.collectData(request,function(data){
    var formattedUrl = data.substr(4);
    console.log('only', formattedUrl);
    //bodyParsed = JSON.parse(data).url + '\n';
    archive.addUrlToList(bodyParsed, function() {
      sendResponse(response, obj, 302);
    });
  });

}

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
    getPost(req, res);

}

};

var sendResponse = function(response,obj,status){
  status = status || 200;
  response.writeHead(status,helpers.headers);
  response.end(obj);
}
