var io = require('../server');
var fs = require("fs");

function _filterSignal (dataSignal) {
	if(dataSignal != 'undefined') {

		if(dataSignal.poorSignalLevel > 0){
			io.emit('error', {message: "Poor signal received from headset"});
			return false;
		}
		else {
			io.emit('error-clear');
			return true;
		}
	}
	else {
		io.emit('error', {message: "No signal received from headset"});
		return false;
	}
}

function _filterAttention(dataSignal) {
	var attetion_threshold = 35;

	if(dataSignal.eSense.attention >= attetion_threshold) {
		return true;
	}
	else {
		return false;
	}
}

function _filterBlink (lastBlink, blinkData) {
	var calibrationData = JSON.parse(fs.readFileSync('public/data/calibration.json', "utf8"));

	var STRONG_BLINK = calibrationData.strongBlink.avarageStrength;
	var RAW_BLINK = calibrationData.rawBlink;
	console.log("filterblink: ", RAW_BLINK);
	var DOUBLE_BLINK_DELAY = calibrationData.doubleBlink.averageDelay;
	
	if(RAW_BLINK == true) {
		io.emit("rawBlink", { blinkStrength: blinkData });
	}
	else {
		if(lastBlink == false) {
			lastBlink = new Date().getTime();	
		}

		else {
			var currBlink = new Date().getTime();
			var diff = currBlink - lastBlink;
			
			if(blinkData > STRONG_BLINK) {
				if(diff > 500) {
					io.emit('violentBlink', { blinkStrength: blinkData, doubleBlink: false });
					return lastBlink;
				}
			}

			if(diff >= 0 && diff <= DOUBLE_BLINK_DELAY) {
				if(blinkData < STRONG_BLINK) {
					io.emit('doubleBlink', { blinkStrength: blinkData, doubleBlink: true });
					return lastBlink;
				}
			}
			else {
				io.emit('blink', { blinkStrength: blinkData, doubleBlink: false });
			}

			lastBlink = currBlink;
			return lastBlink;
		}
	}
}

module.exports = filterInput = {
	filterBlink:     _filterBlink,
	filterSignal:    _filterSignal,
	filterAttention: _filterAttention
}
