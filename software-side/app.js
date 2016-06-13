var nodeThinkGear = require('node-thinkgear');
var io = require('./socket-test');

var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});


var lastBlink = false;
client.on("data", function(data) {
	console.log(data);
	if(data.blinkStrength) {
		//console.log("Blink Strength: ", data.blinkStrength);
		filterBlink(data.blinkStrength);
	}
});

function filterBlink(blinkData) {

	if(lastBlink == false) {
		lastBlink = new Date().getTime();	
	}
	else {
		var currBlink = new Date().getTime();
		var diff = currBlink - lastBlink;
		
		if(diff >= 0 && diff <= 300) {
			console.log("Diff", diff);
			console.log("DoubleBlink");
			io.emit('doubleBlink', { blinkStrength: blinkData, doubleBlink: true });
		}
		else {
			io.emit('blink', { blinkStrength: blinkData, doubleBlink: false });
			console.log("Blink");
		}
		lastBlink = currBlink;
	}
}

client.connect();