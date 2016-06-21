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
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


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
		
		request(url, function() {
			console.log("toggleDeviceState", data);	
		});

	});
});



function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

module.exports = io;
