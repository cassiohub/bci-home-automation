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

    if (info == 'A'){
      //Living Room Lights ON
      digitalWrite(12, HIGH);
    }
    else if (info == 'a'){
      //Living Room Lights OFF
      digitalWrite(12, LOW);
    }
    else if (info == 'B'){
      //Living Room AC ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'b'){
      //Living Room AC OFF
      digitalWrite(13, HIGH);
    }    
    
    /*else if (info == 'C'){
      //Living Room Fireplace ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'c'){
      //Living Room Fireplace OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'D'){
      //Living Room TV ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'd'){
      //Living Room TV OFF
      digitalWrite(13, HIGH);
    }    
    else if (info == 'E'){
      //Elevator ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'e'){
      //Elevator OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'F'){
      //Bedroom Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'f'){
      //Bedroom Lights OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'G'){
      //Bedroom AC ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'g'){
      //Bedroom AC OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'H'){
      //Balcony Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'h'){
      //Balcony Lights OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'I'){
      //Kitchen Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'i'){
      //Kitchen Lights OFF
      digitalWrite(13, HIGH);
    }    
    else if (info == 'J'){
      //Front Door ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'j'){
      //Front Door OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'K'){
      //Atrium Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'k'){
      //Atrium Lights OFF
      digitalWrite(13, HIGH);
    }    
    else if (info == 'L'){
      //Office Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'l'){
      //Office Lights OFF
      digitalWrite(13, HIGH);
    } 
    else if (info == 'M'){
      //Office AC ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'm'){
      //Office AC OFF
      digitalWrite(13, HIGH);
    }       
    else if (info == 'N'){
      //Office Balcony Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'n'){
      //Office Balcony Lights OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'O'){
      //Garage Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'o'){
      //Garage Lights OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'P'){
      //Garage AC ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'p'){
      //Garage AC OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'Q'){
      //House Alarm ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'q'){
      //House Alarm OFF
      digitalWrite(13, HIGH);
    }
    else if (info == 'R'){
      //House Lights ON
      digitalWrite(13, HIGH);
    }    
    else if (info == 'r'){
      //House Lights OFF
      digitalWrite(13, HIGH);
    }*/    
  }
}

