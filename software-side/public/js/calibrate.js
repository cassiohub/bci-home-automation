var socket = io();

socket.on('rawBlink', function(data) {
  if(calibrationState == "blink") {
    if(blinkHistory['blink'].calibration.length < NUM_BLINKS) {
      if($("#blinks-feedback").is(":visible") == true) {
        blinkHistory = saveBlink(blinkHistory, data, "blink");
      }
      else {
        $("#blinks-feedback").show();
        blinkHistory = saveBlink(blinkHistory, data, "blink");
      }
    }
    else {
      blinkHistory = blinkAvarageStrength(blinkHistory, "blink");

      $('#modal-strong').modal("show");
      $('#startStrongButton').focus()
      $('#blinks-feedback').empty().hide();
      $('.page-header small').text("Blink strongly while we collect the data");
    }
  }
  else if(calibrationState == "strongBlink") {
    if(blinkHistory['strongBlink'].calibration.length < NUM_BLINKS) {
      if($("#blinks-feedback").is(":visible") == true) {
        blinkHistory = saveBlink(blinkHistory, data, "strongBlink");
      }
      else {
        $("#blinks-feedback").show();
        blinkHistory = saveBlink(blinkHistory, data, "strongBlink");
      }
    }
    else {
      blinkHistory = blinkAvarageStrength(blinkHistory, "strongBlink");

      $('#modal-double').modal("show");
      $('#startDoubleButton').focus()
      $('#blinks-feedback').empty().hide();
      $('.page-header small').text("After the countdown, perform a double blink.");
    }
  }
  else if(calibrationState == "doubleBlink") {
    var detectionReturn = doubleBlinkDetection(blinkHistory, data);
    GLOBAL_LAST_BLINK = detectionReturn.lastBlink;
    blinkHistory = detectionReturn.blinkHistory;

    $(".attempts-list li").addClass("valid");
    setTimeout(function() {
      $("#modal-done").modal("show");
      calibrationState = "done";
    }, 500);
  }
});



socket.on('blink', function (data) {
  console.log(data);

  if(calibrationState && blinkHistory['blink'].calibration.length != NUM_BLINKS) {
    if($("#blinks-feedback").is(":visible") == true) {
      blinkHistory = saveBlink(blinkHistory, data, "blink");
    }
    else {
      $("#blinks-feedback").show();
      blinkHistory = saveBlink(blinkHistory, data, "blink");
    }  
  }

  if(blinkHistory['blink'].calibration.length == NUM_BLINKS) {
    calibrationState = !calibrationState;
    $("#nextButton").show();
  }  
});

socket.on('doubleBlink', function (data) {
  console.log(data);
});

socket.on('violentBlink', function (data) {
  console.log(data);
});



socket.on('error', function (data) {
  var $error = $("#error-alert");

  if(!$error.hasClass("active")) $error.addClass("active");
  $error.find("#error-message").text(data.message);
});

socket.on('error-clear', function(data) {
  var $error = $("#error-alert");

  if($error.hasClass("active")) $error.removeClass("active");
});



var calibrationState = "idle";
var NUM_BLINKS = 15;
var blinkHistory = {
  "blink": {
    "calibration": [],
    "avarageStrength": 0,
  },
  "doubleBlink": {
    "calibration": [],
    "averageDelay": 0,
  },
  "strongBlink": {
    "calibration": [],
    "avarageStrength": 0
  }
};

function saveBlink(blinkHistory, data, blinkType) {
  var $feedback = $("#blinks-feedback");
  $feedback.append("<span class='blink-node "+blinkType+"'>"+data.blinkStrength+"</span>");

  if(blinkType != "doubleBlink") {
    blinkHistory[blinkType].calibration.push(data.blinkStrength);
  }

  return blinkHistory;
}

function blinkAvarageStrength(blinkHistory, blinkType) {
  var blinks = blinkHistory[blinkType].calibration;

  var sum = blinks.reduce(function(prev, curr) {
    return prev + curr;
  });
  var avg = Math.floor(sum/blinks.length);

  blinkHistory[blinkType].avarageStrength = avg;

  return blinkHistory;
}


function initCalibration() {
  $('#modal-intro').modal('show');
  $('#startButton').focus();


  $('#startButton').on('click', function(){
    calibrationState = "blink";
  });

  $("#startStrongButton").on('click', function() {
    calibrationState = "strongBlink";
  });

  $("#startDoubleButton").on('click', function() {
    $("#double-blink-feedback").show();
    calibrationState = "doubleBlink";
  });
}


GLOBAL_LAST_BLINK = false;
function doubleBlinkDetection(blinkHistory, blinkData) {

  if(GLOBAL_LAST_BLINK == false) {
    GLOBAL_LAST_BLINK = new Date().getTime();
  }
  else {
    var currBlink = new Date().getTime();
    var diff = currBlink - GLOBAL_LAST_BLINK;

    if(diff >= 0 && (diff >= 250 || diff <= 400)) {
      if(blinkData.blinkStrength < blinkHistory.strongBlink.avarageStrength) {
        blinkHistory.doubleBlink.averageDelay = diff;
        var doubleBlinkReturn = {
          lastBlink:lastBlink, 
          blinkHistory: blinkHistory
        };
        console.log("doubleBlinkReturn", doubleBlinkReturn);
        return ;
      }
    }
    else {
      blinkHistory.doubleBlink.averageDelay = 300;
      return {lastBlink:lastBlink, blinkHistory: blinkHistory};
    }
  }
}

initCalibration();