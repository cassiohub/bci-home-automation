require('dotenv').config();
var express = require('express');
var http = require('http');
var request = require('request');
var bodyParser = require("body-parser");

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

var port = process.env.SERVER_PORT;
server.listen(port, function() {
	console.log("Server listen on http://localhost:"+server.address().port);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/calibrate', function (req, res) {
  res.sendFile(__dirname + '/public/html/calibrate.html');
});

app.get("/blinkHistory", function(req, res) {
	res.sendFile(__dirname + "/public/data/calibration.json");
});

app.get("/table", function(req, res) {
	res.sendFile(__dirname + "/public/html/table.html");
});

app.get("/table-db", function(req, res) {
	res.sendFile(__dirname + "/public/html/table-db.html");
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
		var currState = data.currState;

		var apiURL = "http://localhost:"+port+"/api/toggleDeviceState?slug="+roomSlug+"&deviceId="+deviceId+"&currState="+currState;		
		request(apiURL, function() {
			//console.log("toggleDeviceState", data);
		});


		var arduinoURL = "http://"+process.env.ARDUINO_IP+"/?slug="+roomSlug+"&deviceId="+deviceId+"&currState="+currState;
		request(arduinoURL, function() {
			console.log("requested to arduino: ", arduinoURL);
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
