#include <SPI.h>
#include <Ethernet.h>
#include <SoftwareSerial.h>

//XBee
SoftwareSerial XBee(2, 3); // RX, TX
int info;
char sent;

//Ethernet
byte mac[] = { 0x90, 0xA2, 0xDA, 0x00, 0x9B, 0x36 }; //physical mac address
byte ip[] = { 192, 168, 0, 99 }; // ip in lan
byte gateway[] = { 192, 168, 0, 1 }; // internet access via router
byte subnet[] = { 255, 255, 255, 0 }; //subnet mask
EthernetServer server(80); //server port

String readString;

int pin = 9; 
boolean ligado = true;

int pin1 = 10; 

//////////////////////

void setup(){

  pinMode(pin, OUTPUT); //pin selected to control
  //start Ethernet
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
  
  //enable serial data print and XBee communication
  Serial.begin(9600);
  XBee.begin(9600);
  

}

void loop(){
  
  // Create a client connection
  EthernetClient client = server.available();
  if (client) {
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        //read char by char HTTP request
        if (readString.length() < 100) {

          //store characters to string
          readString += c;
          //Serial.print(c);
        }

        //if HTTP request has ended
        if (c == '\n') {

          ///////////////////// control arduino pin
          Serial.println(readString); //print to serial monitor for debuging

          //LIVING ROOM
          //Living Room Lights
          if(readString.indexOf("slug=living-room&deviceId=001&currState=ON") >0) //ON
          {
            digitalWrite(pin, HIGH);    // set pin 9 high
            
            XBee.write('A');
          }
          else if(readString.indexOf("slug=living-room&deviceId=001&currState=OFF") >0) //OFF
          {
            digitalWrite(pin, LOW);    // set pin 9 low
            
            XBee.write('a');
          }

          //Living Room AC
          else if(readString.indexOf("slug=living-room&deviceId=002&currState=ON") >0) //ON
          {
            digitalWrite(pin1, HIGH);    // set pin 10 high
            
            XBee.write('B');
          }          
          else if(readString.indexOf("slug=living-room&deviceId=002&currState=OFF") >0) //OFF
          {
            digitalWrite(pin1, LOW);    // set pin 10 low
            
            XBee.write('b');
          }
          
          //Living Room Fireplace
          else if(readString.indexOf("slug=living-room&deviceId=003&currState=ON") >0) //ON
          {
            XBee.write('C');
          }
          else if(readString.indexOf("slug=living-room&deviceId=003&currState=OFF") >0) //OFF
          {
            XBee.write('c');
          }
        
          //Living Room TV
          else if(readString.indexOf("slug=living-room&deviceId=004&currState=ON") >0) //ON
          {            
            XBee.write('D');
          }
          else if(readString.indexOf("slug=living-room&deviceId=004&currState=OFF") >0) //OFF
          {            
            XBee.write('d');
          }
          
          //Stairs Elevator
          else if(readString.indexOf("slug=living-room&deviceId=005&currState=ON") >0)//ON
          {
            XBee.write('E');
          }
          else if(readString.indexOf("slug=living-room&deviceId=005&currState=OFF") >0)//OFF
          {
            XBee.write('e');
          }
          
          //BEDROOM
          //Bedroom Lights
          else if(readString.indexOf("slug=bedroom&deviceId=006&currState=ON") >0)//ON
          {
            XBee.write('F');
          }
          else if(readString.indexOf("slug=bedroom&deviceId=006&currState=OFF") >0)//OFF
          {
            XBee.write('f');
          }

          //Bedroom AC
          else if(readString.indexOf("slug=bedroom&deviceId=007&currState=ON") >0)//ON
          {
            XBee.write('G');
          }
          else if(readString.indexOf("slug=bedroom&deviceId=007&currState=OFF") >0)//OFF
          {
            XBee.write('g');
          }


          //BALCONY
          //Balcony Lights
          else if(readString.indexOf("slug=bedroom-balcony&deviceId=008&currState=ON") >0)//ON
          {
            XBee.write('H');
          }
          else if(readString.indexOf("slug=bedroom-balcony&deviceId=008&currState=OFF") >0)//OFF
          {
            XBee.write('h');
          }

          //KITCHEN
          //Kitchen Lights
          else if(readString.indexOf("slug=kitchen&deviceId=009&currState=ON") >0)//ON
          {
            XBee.write('I');
          }
          else if(readString.indexOf("slug=kitchen&deviceId=009&currState=OFF") >0)//OFF
          {
            XBee.write('i');
          }
          
          //Front Door
          else if(readString.indexOf("slug=kitchen&deviceId=010&currState=ON") >0)//ON
          {
            XBee.write('J');
          }
          else if(readString.indexOf("slug=kitchen&deviceId=010&currState=OFF") >0)//OFF
          {
            XBee.write('j');
          }

          //ATRIUM
          //Atrium Lights
          else if(readString.indexOf("slug=office-balcony&deviceId=011&currState=ON") >0)//ON
          {
            XBee.write('K');
          }
          else if(readString.indexOf("slug=office-balcony&deviceId=011&currState=OFF") >0)//OFF
          {
            XBee.write('k');
          }
          
          //OFFICE
          //Office Lights
          else if(readString.indexOf("slug=office&deviceId=012&currState=ON") >0)//ON
          {
            XBee.write('L');
          }
          else if(readString.indexOf("slug=office&deviceId=012&currState=OFF") >0)//OFF
          {
            XBee.write('l');
          }

          //Office AC
          else if(readString.indexOf("slug=office&deviceId=013&currState=ON") >0)//ON
          {
            XBee.write('M');
          }
          else if(readString.indexOf("slug=office&deviceId=013&currState=OFF") >0)//OFF
          {
            XBee.write('m');
          }

          //OFFICE BALCONY
          //Office Balcony Lights
          else if(readString.indexOf("slug=office-balcony&deviceId=014&currState=ON") >0)//ON
          {
            XBee.write('N');
          }
          else if(readString.indexOf("slug=office-balcony&deviceId=014&currState=OFF") >0)//OFF
          {
            XBee.write('n');
          }

          //GARAGE
          //Garage Lights
          else if(readString.indexOf("slug=garage&deviceId=015&currState=ON") >0)//ON
          {
            XBee.write('O');
          }
          else if(readString.indexOf("slug=garage&deviceId=015&currState=OFF") >0)//OFF
          {
            XBee.write('o');
          }

          //Garage AC
          else if(readString.indexOf("slug=garage&deviceId=016&currState=ON") >0)//ON
          {
            XBee.write('P');
          }
          else if(readString.indexOf("slug=garage&deviceId=016&currState=OFF") >0)//OFF
          {
            XBee.write('p');
          }          

          //HOUSE
          //House Alarm
          else if(readString.indexOf("slug=house&deviceId=017&currState=ON") >0)//ON
          {
            XBee.write('Q');
          }
          else if(readString.indexOf("slug=house&deviceId=017&currState=OFF") >0)//OFF
          {
            XBee.write('q');
          }
          
          //House Lights
          else if(readString.indexOf("slug=house&deviceId=018&currState=ON") >0)//ON
          {
            XBee.write('S');
          }
          else if(readString.indexOf("slug=house&deviceId=018&currState=OFF") >0)//OFF
          {
            XBee.write('s');
          }
          
          //clearing string for next read
          readString="";

          client.println("HTTP/1.1 200 OK"); //send new page
          client.println("Content-Type: text/html");
          client.println();

          client.println("<html>");
          client.println("<head>");
          client.println("<title>BCI Home Automation</title>");
          client.println("<meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'>");
          client.println("<link rel='stylesheet' type='text/css' href='http://www.robocore.net/upload/projetos/RemoteAutomationV1.0.css' />");
          client.println("<script type='text/javascript' src='http://www.robocore.net/upload/projetos/RemoteAutomationV1.0.js'></script>");
          client.println("</head>");
          client.println("<body>");
          client.println("<div id='wrapper'>RoboCore Remote Automation V1.1");
          client.print("<div id='rele'></div><div id='estado' style='visibility: hidden;'>");
          client.print(ligado);
          client.println("</div>");
          client.println("<div id='botao'></div>");
          client.println("</div>");
          client.println("<script>AlteraEstadoRele()</script>");
          client.println("</body>");
          client.println("</head>");


          delay(1);
          //stopping client
          client.stop();



        }
      }
    }
  }
}

