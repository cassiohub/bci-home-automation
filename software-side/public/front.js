$( document ).ready(function() {
	
	setInterval(getColor, 100);

	function getColor() {
		$.ajax("public/cor.json").success(function(data) {
	    	console.log(data.cor);
	    	$("#bloco").css("background", data.cor);
	    })	
	}
    
});