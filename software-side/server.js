var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(8080, function() {
	console.log("Server listen on http://localhost:8080/");
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});


io.on('connection', function (socket) {
	socket.on("clicou", function(data) {
		//console.log("Clicou", data);
	});
});



module.exports = io;
