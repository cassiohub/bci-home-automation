var nodeThinkGear = require('node-thinkgear');
var io = require('./server');
var filterInput = require('./lib/filterInput');

var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});


var lastBlink = false;
client.on("data", function(data) {
	console.log(data);
	
	if(filterInput.filterSignal(data)) {
		//if(filterInput.filterAttention(data)) {
			if(data.blinkStrength) {
				var lastBlinkReturn = filterInput.filterBlink(lastBlink, data.blinkStrength);
				lastBlink = lastBlinkReturn;
			}
		// }
		// else {
		// 	io.emit("message", {message: "Not enough attention!"})
		// }
	}
});

var count = 0;
setTimeout(function() {
	var intervalo = setInterval(function() {
		filterInput.filterBlink(false, Math.floor(Math.random() * 10));
		//io.emit('data', { blinkStrength: Math.floor(Math.random() * 10), doubleBlink: false });
		count++;
		console.log(count)
		if(count == 18) {
			console.log("parou")
			clearInterval(intervalo);
			strongBlinkTest();
		}
	}, 1000);	
}, 3000);

function strongBlinkTest() {
	var count = 0;
	setTimeout(function() {
		var intervalo = setInterval(function() {
			filterInput.filterBlink(false, Math.floor(Math.random() * 100));
			count++;
			console.log(count)
			if(count == 18) {
				console.log("parou")
				clearInterval(intervalo);
				doubleBlinkTest();
			}
		}, 1000);	
	}, 5000);
}

function doubleBlinkTest() {
	var count = 0;
	setTimeout(function() {
		var intervalo = setInterval(function() {
			filterInput.filterBlink(false, Math.floor(Math.random() * 100));
			count++;
			console.log(count)
			if(count == 2) {
				console.log("parou")
				clearInterval(intervalo);
			}
		}, 300);
	}, 5000);
}


//client.connect();
