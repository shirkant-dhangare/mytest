var express = require("express");
var mongoose = require("mongoose");
var http = require("http");
var app = express();

//setup database connections

mongoose.connect('mongodb://127.0.0.1/test');

var Users = mongoose.model('Users', {
	name: String
});


Users.findOne({ name: 'pagal_munna' }, function(err, result) {
	console.log("errrr===>",err);
	console.log("mydata",result.name);
});




var newSave = new Users();
newSave.name = "mrunal";
newSave.save(function(err, result){
	console.log("errrr===>",err);
	console.log("mydata",result.name);
})

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

app.get("/about", function(request, response) {
	response.end("about page");
  
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(8081);