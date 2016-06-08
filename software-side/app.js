var nodeThinkGear = require('node-thinkgear');
var io = require('./socket-test');

var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

client.on("data", function(data) {
	//console.log(data);
	if(data.blinkStrength) {
		console.log("Blink Strength: ", data.blinkStrength);
		io.emit('blink', { blinkStrength: data.blinkStrength });
	}
});

client.connect();