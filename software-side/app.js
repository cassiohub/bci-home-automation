var nodeThinkGear = require('node-thinkgear');
var io = require('./server');
var filterInput = require('./lib/filterInput');

var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});


var lastBlink = false;
client.on("data", function(data) {
	//console.log(data.blinkStrength);

	filterInput.filterSignal(data);

	if(filterInput.filterAttention(data)) {
		if(data.blinkStrength) {
			filterInput.filterBlink(lastBlink, data.blinkStrength);
		}
	}
	else {
		io.emit("message", {message: "Not enough attention!"})
	}
});

client.connect();
