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
  $menuDevices.append("<h3 class='page-header'>Devices on this Room</h3>");
  data.forEach(function(device) {
    $menuDevices.append(
        "<a href='#' class='list-group-item' data-state='"+ device.deviceState +"' data-altState='"
        + device.deviceAltState +"' data-deviceId='"+device.deviceId+"' data-deviceCurrState='"+ device.deviceCurrState +"'>"
        + device.deviceName +"<span class='badge'>"+ device.deviceCurrState +"</span></a>"
      );

    $menuDevices.find("a").first().addClass("active");
  });
}

function walkThroughMenu(menu) {
  $menu = $(".menu-list.active");
  $active = $menu.find(".active");
  $last = $menu.find("a").last();
  $backButton = $("#backButton");

  if(!$last.hasClass("active")) {
    $next = $active.next();
  }
  else {
    if($backButton.is(":visible")) {
      if($backButton.hasClass("btn-primary")) {
        $backButton.removeClass("btn-primary").addClass("btn-default");
        $next = $menu.find("a").first();  
      }
      else {
        $(".menu-list.active a.active").removeClass(".active");
        $backButton.removeClass("btn-default").addClass("btn-primary");  
      }
    }
    else {
      $next = $menu.find("a").first();  
    }
  }

  $active.removeClass("active");
  $next.addClass("active");
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
      $("#backButton").show();
    }
  });
}


function toggleDeviceState(state) {
  var $selectedDevice = $("#devices").find("a.active");
  var $stateLabel = $selectedDevice.find("span.badge");
  var $deviceCurrState = $stateLabel.text();
  var $deviceState = $selectedDevice.data("state");
  var $deviceAltState = $selectedDevice.data("altstate");

  var $room = $("#rooms").find("a.active").data("slug");
  var $deviceId = $selectedDevice.data("deviceid");

  if($deviceCurrState == $deviceState) {
    $stateLabel.text($deviceAltState);
  }
  else {
    $stateLabel.text($deviceState);
  }

  var deviceNewState = {
    room: $room,
    device: $deviceId,
    currState: $stateLabel.text()
  }
  console.log(deviceNewState)
  socket.emit("toggleDeviceState", deviceNewState);
  
}


function goBack() {
  $backButton = $("#backButton");
  $roomsMenu = $("#rooms");
  $deviceMenu = $("#devices");


  $backButton.removeClass("btn-primary").addClass("btn-default").hide();
  $deviceMenu.removeClass("active").empty();
  $roomsMenu.addClass("active");
}



function init() {
  getMenuData(function(data) {
    buildMenu(data);
  });
}

init();