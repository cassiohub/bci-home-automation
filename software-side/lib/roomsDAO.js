var dp = require('./dataPersist');
var roomsFile = "../public/data/rooms.json";


function _changeRoomName(roomName, newRoomName) {
	dp.readJSONFile(roomsFile, function(rooms) {
		rooms.forEach(function(room) {
			if(room.roomName == roomName) {
				room.roomName = newRoomName;

				var slug = newRoomName.toLowerCase().trim().replace(" ", "-");
				room.roomSlug = slug;
			}
		});

		dp.writeJSONFile(roomsFile, rooms);
	});
}


function _addNewRoom(roomName, newRoom) {
	dp.readJSONFile(roomsFile, function(rooms) {
		rooms.push(newRoom);
		dp.writeJSONFile(roomsFile, rooms);
	});	
}


module.exports = roomsDAO = {
	changeRoomName: _changeRoomName,
	addNewRoom: _addNewRoom
}

