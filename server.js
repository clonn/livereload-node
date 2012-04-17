/**
 * @overview
 *
 * @author 
 * @version 2012/04/18
 */

var walk = require('walk'),
  fs = require('fs'),
  userPath = '/Users/clonn/node/livereload/',
  fileType = [
    '.js',
    '.css',
    '.scss',
    '.html',
    '.php',
  ],
  options,
  walker;

options = {
    followLinks: false,
};

walker = walk.walk(userPath, options);

// OR
// walker = walk.walkSync("/tmp", options);

walker.on("names", function (root, nodeNames) {
        console.log(nodeNames);
  nodeNames.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
});

walker.on("directories", function (root, dirStats, next) {
  // dirStatsArray is an array of `stat` objects with the additional attributes
  // * type
  // * error
  // * name

  next();
});

walker.on("file", function (root, fileStats, next) {
  console.log(root);
  console.log(fileStats.name);
  fileType.forEach(function (file) {
      if (fileStats.name.indexOf(file) > -1 && 
          fileStats.name.indexOf(".swp") == -1) {
          fs.watchFile(root + "/" + fileStats.name, function (curr, prev) {
            // doStuff
            console.log(root + "/" + fileStats.name);
          });
      }
  });
  next();
});

walker.on("errors", function (root, nodeStatsArray, next) {
  next();
});

walker.on("end", function () {
  console.log("all done");
});


