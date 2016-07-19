/*****************************************************************
XBee_Serial_Passthrough.ino

Set up a software serial port to pass data between an XBee Shield
and the serial monitor.

Hardware Hookup:
  The XBee Shield makes all of the connections you'll need
  between Arduino and XBee. If you have the shield make
  sure the SWITCH IS IN THE "DLINE" POSITION. That will connect
  the XBee's DOUT and DIN pins to Arduino pins 2 and 3.

*****************************************************************/

// We'll use SoftwareSerial to communicate with the XBee:
#include <SoftwareSerial.h>
// XBee's DOUT (TX) is connected to pin 2 (Arduino's Software RX)
// XBee's DIN (RX) is connected to pin 3 (Arduino's Software TX)
SoftwareSerial XBee(2, 3); // RX, TX
char info;
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

  
  if (XBee.available())
  { // If data comes in from XBee, send it out to serial monitor
    info = XBee.read();
    Serial.write(info);
    if (info == 'H'){
      togglePin(12);
    }
    else if (info == '2'){
      togglePin(13);
    }
    else{
       digitalWrite(12, LOW);
      digitalWrite(13, LOW);
    }
    
  }
}

void togglePin (int pin){
  int current;
  
  current = digitalRead(pin);
  digitalWrite(pin, !current);

}
