var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var server = http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
  	if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(3000, function(){
	console.log("Server listening on: http://localhost:%s", 3000);
});