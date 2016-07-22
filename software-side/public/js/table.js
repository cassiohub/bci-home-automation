var socket = io();

socket.on('blink', function (data) {
  console.log(data);
  if(stop == false) {
    addRow(data);  
  }
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

var stop = false;
var blinkStrengths = [];

function stopData() {
  stop = true;
  return stop;
}

function addRow(data) {
  blinkStrengths.push(data.blinkStrength);
  $("#table-body").append("<tr><td>#"+blinkStrengths.length+"</td><td>"+data.blinkStrength+"</td></tr>");
}

var done = false;
function getAvarage() {
  var avg = blinkStrengths.reduce(function(curr, next) {
    return curr+next;
  }, 0);
  avg = Math.floor(avg / blinkStrengths.length);
  $("#table-body").append("<tr><td>Blink Strength Avg</td><td><strong>"+avg+"</strong></td></tr>");
  done = true;
}

$("#stopButton").on("click", function() {
  if(done == false) {
    stopData();
    getAvarage();  
  }
  else {
    done = true;
  }
});

