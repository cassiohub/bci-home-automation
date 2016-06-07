var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/public", express.static("public"));


//body-parser middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res, next) {
	res.end("teste");
});

app.get("/cores", function(req, res, next) {
	res.render('cores', {mensagem: "coco"});
});

var cores = ["purple", "blue", "yellow", "green", "red"];
var counter = 0;
var lastBlinkTime = 0;
var doubleBlink = false;

app.get("/changeCor", function(req, res, next) {

	console.log(req.url);

	var blinkStrength = req.query.blinkStrength;

	var cor = fs.readFileSync("public/cor.json", "utf8");
	var corObj = JSON.parse(cor);

	if(blinkStrength > 0 && blinkStrength <= 100) {
		if (lastBlinkTime === 0) lastBlinkTime = new Date();
		else {
			var currBlinkTime = new Date();
			var blinkTimeDiff = currBlinkTime - lastBlinkTime;
			console.log("blinkTimeDiff", blinkTimeDiff);
			if(blinkTimeDiff <= 200) {
				doubleBlink = true;
				currBlinkTime = 0;
				lastBlinkTime = 0;
			}
		}

		corObj.cor = cores[counter % cores.length];
		counter++;	
		console.log("doubleBlink", doubleBlink);
	}
	else {
		corObj.cor = "black";
	}
 	
	
	cor = JSON.stringify(corObj);
	var writ = fs.writeFileSync("public/cor.json", cor, "utf8");
	res.end(cor);
});

app.listen("3000", function() {
	console.log("Server listen on http://localhost:3000");
});
