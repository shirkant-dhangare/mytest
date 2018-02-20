var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = {};
connections = [];

mydataSockets = [];
server.listen( process.env.PORT || 3000 );
console.log('server running....');


app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	//console.log("socket name");
	console.log(socket.name);
	console.log('Connected : %s sockets Connected',connections.length);
	//console.log(connections);
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket),1);
		console.log("disconnected %s",connections);
	});

	socket.on('saveSocket', function(data){
		socket.name = data;
        console.log(data);
		users[socket.name] = socket;
        console.log(users);
	});

	socket.on('mymessage', function(data){
		var dataname = data.mymessage;
		var namett = dataname.split('-');
		var name = namett[0]
		console.log("name==>", name);
		//io.sockets.emit('newmessage',{msg:data.mymessage});
		users[name].emit('newmessage',{msg:data.mymessage});
	});
	

})
