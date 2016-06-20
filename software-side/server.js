var express = require('express');
var http = require('http');
var request = require('request');

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

var apiRoutes = require('./api/apiRoutes');
app.use("/api", apiRoutes);


io.on('connection', function (socket) {

	socket.on("clicou", function(data) {
		//console.log("Clicou", data);
	});

	socket.on("toggleDeviceState", function(data) {
		var roomSlug = data.room;
		var deviceId = data.deviceId;
		var url = "http://localhost:8080/api/toggleDeviceState?slug="+roomSlug+"&deviceId="+deviceId;
		
		request(url);

		console.log("toggleDeviceState", data);
	});
});



module.exports = io;
