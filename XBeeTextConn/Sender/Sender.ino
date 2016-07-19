// We'll use SoftwareSerial to communicate with the XBee:
#include <SoftwareSerial.h>
// XBee's DOUT (TX) is connected to pin 2 (Arduino's Software RX)
// XBee's DIN (RX) is connected to pin 3 (Arduino's Software TX)
SoftwareSerial XBee(2, 3); // RX, TX
char sent;

void setup()
{
  // Set up both ports at 9600 baud. This value is most important
  // for the XBee. Make sure the baud rate matches the config
  // setting of your XBee.
  XBee.begin(9600);
  Serial.begin(9600);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);

  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
}

void loop()
{
  if (Serial.available())
  { // If data comes in from serial monitor, send it out to XBee
    sent = Serial.read();
    XBee.write(sent);
    Serial.write(sent);
    if (sent == 'H'){
      digitalWrite(10, HIGH);
      digitalWrite(11, LOW);
    }
    else if (sent == '2'){
      digitalWrite(11, HIGH);
      digitalWrite(10, LOW);
    }
    else{
      digitalWrite(10, LOW);
      digitalWrite(11, LOW);
    }
  }
}
