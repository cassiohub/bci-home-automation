var socket = io();

var cores = ["purple", "blue", "yellow", "green", "red"];
var counter = 0;

socket.on('blink', function (data) {

  console.log(data);

  $("#bloco").css('background', cores[counter % cores.length]);
  counter++;

  $("#blinkStrength").text(data.blinkStrength);
  
  if(data.blinkStrength > 80) {
    $("#bloco").addClass("gigante");
  }
  else {
    $("#bloco").removeClass("gigante");
  }

  // socket.emit("clicou", {url: '/sala/led/ON'});
  // console.log("clicou");

});


socket.on('doubleBlink', function (data) {
  $("#bloco").toggleClass('borda');
});
