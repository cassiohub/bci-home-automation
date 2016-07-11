var dp = require('./dataPersist');
var blinkHistoryFile = "public/data/calibration.json";

function _saveBlinkHistory(blinkHistory) {
	dp.writeJSONFile(blinkHistoryFile, blinkHistory);
}

function _resetBlinkHistory(blinkHistory) {
	dp.readJSONFile(blinkHistoryFile, function(blinkHistory) {
		blinkHistory.rawBlink = true;
		dp.writeJSONFile(blinkHistoryFile, blinkHistory);
	});
}

module.exports = blinkHistoryDAO = {
	saveBlinkHistory: _saveBlinkHistory,
	resetBlinkHistory: _resetBlinkHistory
}