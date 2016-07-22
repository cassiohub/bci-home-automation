var socket = io();

socket.on('doubleBlink', function (data) {
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
var blinkDelays = [];

function stopData() {
  stop = true;
  return stop;
}

function addRow(data) {
  blinkDelays.push(data.blinkDelay);
  $("#table-body").append("<tr><td>#"+blinkDelays.length+"</td><td>"+data.blinkDelay+"</td></tr>");
}

var done = false;
function getAvarage() {
  var avg = blinkDelays.reduce(function(curr, next) {
    return curr+next;
  }, 0);
  avg = Math.floor(avg / blinkDelays.length);
  $("#table-body").append("<tr><td>Double Blink Delay Avg</td><td><strong>"+avg+"</strong></td></tr>");
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

