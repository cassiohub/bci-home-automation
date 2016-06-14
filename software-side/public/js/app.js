var socket = io();

socket.on('blink', function (data) {

  console.log(data);

  // socket.emit("clicou", {url: '/sala/led/ON'});

});


socket.on('doubleBlink', function (data) {
  console.log(data);
});


socket.on('violentBlink', function (data) {
  console.log(data);
});
