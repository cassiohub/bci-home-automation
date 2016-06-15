var socket = io();

//walkThroughMenu();

function walkThroughMenu() {
  $menu = $("#rooms");
  $active = $menu.find(".active");
  $last = $menu.find("a").last();

  if(!$last.hasClass("active")) {
      $next = $active.next();
  }
  else {
      $next = $menu.find("a").first();
  }

  $active.removeClass("active");
  $next.addClass("active");
}

socket.on('blink', function (data) {

  console.log(data);
  walkThroughMenu();
  // socket.emit("clicou", {url: '/sala/led/ON'});

});


socket.on('doubleBlink', function (data) {
  console.log(data);
});


socket.on('violentBlink', function (data) {
  console.log(data);
});
