var socket = io();

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


function walkThroughMenu(menu) {
  $menu = $(".menu-list.active");
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


function getMenuData(callback) {
  $.get("data.json", function(data) {
    localStorage.setItem("menuData", JSON.stringify(data));
    callback(data);
  });
}

function buildMenu(data) {
  var $menu = $("#rooms");

  data.forEach(function(room) {
    $menu.append(
        "<a href='#' class='list-group-item' data-slug='"+ room.roomSlug +"'>"+ room.roomName +
        "<span class='badge'><i class='glyphicon "+ room.badgeClass +"'></i></span></a>"
      );

    $menu.find("a").first().addClass("active");
  });
}

function buildDeviceMenu(data) {
  var $menuDevices = $("#devices");
  $menuDevices.html("");
  data.forEach(function(device) {
    $menuDevices.append(
        "<a href='#' class='list-group-item'>"+ device.deviceName +"<span class='badge'>"+ device.deviceIcon +"</span></a>"
      );

    $menuDevices.find("a").first().addClass("active");
  });
}

function selectRoom() {
  var $menu = $("#rooms");
  var $selected = $menu.find(".active").data("slug");
  var menuData = JSON.parse(localStorage.getItem("menuData"));

  $(".menu-list").removeClass("active");
  $("#devices").addClass("active");

  menuData.forEach(function(room) {
    if(room.roomSlug == $selected) {
      buildDeviceMenu(room.roomDevices);    
    }
  });
}


function init() {
  getMenuData(function(data) {
    buildMenu(data);
  });
}

init();