var nodeThinkGear = require('node-thinkgear');
var request = require('request');

var client = nodeThinkGear.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

client.on("data", function(data) {
	console.log(data);

	if(data.blinkStrength) {
		console.log("Blink Strength: ", data.blinkStrength);

		request('http://localhost:3000/changeCor?blinkStrength='+data.blinkStrength, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log(body)
		  }
		})
	}
});

client.connect()