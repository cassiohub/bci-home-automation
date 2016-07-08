var express = require("express");
var Router = express.Router();
var devicesDAO = require("../lib/devicesDAO");
var blinkHistoryDAO = require("../lib/blinkHistoryDAO");

Router.get("/toggleDeviceState", function(req, res, next) {
	var roomSlug = req.query.slug;
	var deviceId = req.query.deviceId;
	
	if(roomSlug && deviceId) {
		devicesDAO.toggleDeviceState(roomSlug, deviceId, function(err, data) {
			if(err) {
				res.end(err.message.toString());
			}
			else {
				res.end(data.toString());
			}
		});
	}
});

Router.post("/saveBlinkHistory", function(req, res) {
	console.log(req.body);
	blinkHistoryDAO.saveBlinkHistory(req.body);
	res.writeHeader(200);
});

Router.get("/resetBlinkHistory", function(req, res) {
	blinkHistoryDAO.resetBlinkHistory();
	res.writeHeader(200);
});


module.exports = Router