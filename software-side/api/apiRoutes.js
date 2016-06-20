var express = require("express");
var Router = express.Router();
var devicesDAO = require("../lib/devicesDAO");

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


module.exports = Router