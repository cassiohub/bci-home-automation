var socket = io();

socket.on('blink', function (data) {
  visualReturn("blink");
  console.log(data);
  //socket.emit("clicou", {url: '/sala/led/ON'});
});


socket.on('doubleBlink', function (data) {
  visualReturn("doubleBlink");
  console.log(data);
  walkThroughMenu();
});


socket.on('violentBlink', function (data) {
  visualReturn("violentBlink");
  console.log(data);
  
  if($("#backButton").hasClass("btn-primary")) {
    goBack();
  }
  else if($("#rooms").hasClass("active")) {
    selectRoom();
  }
  else if(!$("#backButton").hasClass("btn-primary") && $("#devices").hasClass("active")){
    toggleDeviceState();
  }
});

socket.on('error', function (data) {
  //console.log(data);
  var $error = $("#error-alert");

  if(!$error.hasClass("active")) $error.addClass("active");
  $error.find("#error-message").text(data.message);
});

socket.on('error-clear', function(data) {
  var $error = $("#error-alert");
  if($error.hasClass("active")) $error.removeClass("active");
});

function visualReturn(blinkType) {
  $("#visual-return .btn").removeClass("active");
  $("#visual-return").find("."+blinkType).toggleClass("active");
}


function persistLocalStorage(data) {
  if(localStorage.menuData) {
    localStorage.removeItem("menuData");
  }
  localStorage.setItem("menuData", JSON.stringify(data));
}


function getMenuData(callback) {
  $.get("data/rooms.json", function(data) {
    persistLocalStorage(data);
    if(callback){
      callback(data);  
    }
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
    
    if($active.length == 0) {
      $next = $menu.find("a").first();
      $backButton.removeClass("btn-primary active").addClass("btn-default");
    }
    else {
      $next = $active.next();
    }
  }
  else {
    if($("#devices").hasClass("active")) {
      if(!$backButton.hasClass("btn-primary")) {
        $next = $backButton;
        $backButton.removeClass("btn-default active").addClass("btn-primary");
      }
    }
    else {
      $next = $menu.find("a").first();
    }
  }

  $active.removeClass("active");
  if($next != $backButton) {
    $next.addClass("active");
  }
  
}


function selectRoom() {
  var $menu = $("#rooms");
  var $selected = $menu.find(".active").data("slug");
  var menuData = JSON.parse(localStorage.getItem("menuData"));

  if($menu.hasClass('active')) {
    $(".menu-list").removeClass("active");
    $("#devices").addClass("active");

    menuData.forEach(function(room) {
      if(room.roomSlug == $selected) {
        buildDeviceMenu(room.roomDevices);
      }
    });
  
    $("#devices").slideDown('fast');
    $("#backButton").show();
  
  }
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
    deviceId: $deviceId,
    currState: $stateLabel.text()
  }

  socket.emit("toggleDeviceState", deviceNewState);
  
  // Update localStorage info
  setTimeout(function () {
    getMenuData();
  }, 300);
}


function goBack() {
  $backButton = $("#backButton");
  $roomsMenu = $("#rooms");
  $deviceMenu = $("#devices");


  $backButton.removeClass("btn-primary").addClass("btn-default").hide();
  $("#devices").slideUp('fast');
  $deviceMenu.removeClass("active").empty();
  $roomsMenu.addClass("active");
}


function init() {
  getMenuData(function(data) {
    buildMenu(data);
  });
}

init();