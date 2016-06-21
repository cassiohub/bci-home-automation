var io = require('../server');


function _filterSignal (dataSignal) {
	if(dataSignal != 'undefined') {

		if(dataSignal.poorSignal > 0){
			io.emit('error', {message: "Poor signal received from headset"});
			return false;
		}
		else {
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

	if(lastBlink == false) {
		lastBlink = new Date().getTime();	
	}

	else {
		var currBlink = new Date().getTime();
		var diff = currBlink - lastBlink;
		
		if(blinkData > 90) {
			if(diff > 500) {
				io.emit('violentBlink', { blinkStrength: blinkData, doubleBlink: false });
				return lastBlink;
			}
		}

		if(diff >= 0 && diff <= 400) {
			if(blinkData < 90) {
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

module.exports = filterInput = {
	filterBlink:     _filterBlink,
	filterSignal:    _filterSignal,
	filterAttention: _filterAttention
}
