//var nodeThinkGear = require('node-thinkgear');
var nodeThinkGear = require('node-thinkgear-sockets');
var io = require('./server');
var filterInput = require('./lib/filterInput');

/*var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});*/
var client = nodeThinkGear.createClient({ enableRawOutput: true });


var lastBlink = false;
// client.on("data", function(data) {
// 	console.log(data);
	
// 	if(filterInput.filterSignal(data)) {
// 		//if(filterInput.filterAttention(data)) {
// 			if(data.blinkStrength) {
// 				var lastBlinkReturn = filterInput.filterBlink(lastBlink, data.blinkStrength);
// 				lastBlink = lastBlinkReturn;
// 			}
// 		// }
// 		// else {
// 		// 	io.emit("message", {message: "Not enough attention!"})
// 		// }
// 	}
// });

client.on("blink_data", function(data) {
	if(filterInput.filterSignal(data)) {
		console.log(data);
		var lastBlinkReturn = filterInput.filterBlink(lastBlink, data.blinkStrength);
		lastBlink = lastBlinkReturn;
	}
});

//client.connect();
