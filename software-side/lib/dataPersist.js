var fs = require("fs");


function _readJSONFile(fileName, callback) {
	fs.readFile(fileName, "utf8", function(err, data) {
		if(err) throw err;
		setTimeout(function(){
			callback(JSON.parse(data.toString()));
		}, 200);
	});
}

function _writeJSONFile(fileName, fileContent, callback) {
	_readJSONFile(fileName, function(data) {
		fs.writeFile(fileName, JSON.stringify(fileContent), 'utf8', callback);
	});
}



module.exports = dataPersist = {
	readJSONFile: _readJSONFile,
	writeJSONFile: _writeJSONFile
}