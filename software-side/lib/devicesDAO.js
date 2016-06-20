var dp = require('./dataPersist');
var roomsFile = "public/data/rooms.json";


function _addNewDevice(roomSlug, newDevice) {
	dp.readJSONFile(roomsFile, function(rooms) {
		rooms.forEach(function(room) {
			if(room.roomSlug == roomSlug) {
				room.roomDevices.push(newDevice);
			}
		});

		dp.writeJSONFile(roomsFile, rooms);
	});	
}

function _removeNewDevice(roomSlug, deviceId) {
	dp.readJSONFile(roomsFile, function(rooms) {
		rooms.forEach(function(room) {
			if(room.roomSlug == roomSlug) {
				var devices = room.roomDevices.filter(function(device) {
					if(device.deviceId != deviceId) {
						return device;
					}
				});
				room.roomDevices = devices;
			}
		});

		dp.writeJSONFile(roomsFile, rooms);
	});
}


function _toggleDeviceState(roomSlug, deviceId, callback) {
	dp.readJSONFile(roomsFile, function(rooms) {
		rooms.forEach(function(room) {
			if(room.roomSlug == roomSlug) {
				room.roomDevices.forEach(function(device) {
					if(device.deviceId == deviceId) {
						if(device.deviceCurrState == device.deviceState) {
							device.deviceCurrState = device.deviceAltState;
						}
						else {
							device.deviceCurrState = device.deviceState;
						}

						callback(null, device.deviceCurrState);
					}
					else {
						callback({message: "Device not Found"});
					}
				});
			}
			else {
				callback({message: "Room not Found"});
			}
		});

		dp.writeJSONFile(roomsFile, rooms);
	});	
}



module.exports = devicesDAO = {
	addNewDevice: _addNewDevice,
	removeNewDevice: _removeNewDevice,
	toggleDeviceState: _toggleDeviceState
}