var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')

};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // May need to change path as first argument of readFile
  fs.readFile(this.paths.list,function (err, data) {
    if (err) throw err;
    var arrData = data.toString().split('\n');
    callback(arrData);
  });
}  

exports.isUrlInList = function(urlTarget, callback){
  var isFound = false;
  fs.readFile(this.paths.list,function (err, data) {
    if (err) throw err;
    var arrData = data.toString().split('\n');
    for(var i = 0; i< arrData; i++){
      if(arrData[i] === urlTarget){
        isFound = true;
      }
    }
    callback(isFound);
  });
};

exports.addUrlToList = function(urlToAdd, callback){
  fs.writeFile(this.paths.list, urlToAdd, function (err) {
    if (err) throw err;
    callback();
  });
};

exports.isUrlArchived = function(urlTarget,callback){
 var isFound = false;
 fs.readdir(this.paths.archivedSites,function (err, files) {
  if (err) throw err;
  for(var i = 0; i< files; i++){
    if(files[i] === urlTarget){
      isFound = true;
    }
  }
  callback(isFound);
});



};

exports.downloadUrls = function(urlsToAdd){
  for (var i = 0; i < urlsToAdd.length; i++) {
    fs.writeFile(this.paths.archivedSites + '/'+ urlsToAdd[i], urlsToAdd[i], function(err) {
      if (err) throw err;
    });
  }

};
