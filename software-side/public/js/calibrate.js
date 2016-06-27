var socket = io();

socket.on('blink', function (data) {
  console.log(data);

  if(calibrationState && blinkHistory['blink'].calibration.length != NUM_BLINKS) {
    if($("#blinks-feedback").is(":visible") == true) {
      saveBlink(blinkHistory, data, "blink");
    }
    else {
      $("#blinks-feedback").show();
      saveBlink(blinkHistory, data, "blink");
    }  
  }

  if(blinkHistory['blink'].calibration.length == NUM_BLINKS) {
    calibrationState = !calibrationState;

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



var calibrationState = false;
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

  $("#startButton").on("click", function() {
    $('#modal-intro').modal('show');
    calibrationState = !calibrationState;    
  });
}

initCalibration();