#include <AntaresESP32HTTP.h>
#include <WiFi.h>

#define ACCESSKEY "9634da50ff7abd7a:3bdb608765b907a4"
#define projectName "FlowSensorProject"
#define deviceName "motor"

const char* ssid = "";
const char* password = "";

AntaresESP32HTTP antares(ACCESSKEY);

// Motor A
int motor1Pin1 = 27; 
int motor1Pin2 = 26; 
int enable1Pin = 14;
int LED = 2;
int sequence = 0;
 
// Setting PWM properties
const int freq = 30000;
const int pwmChannel = 0;
const int resolution = 8;
int dutyCycle = 200;

void setup() {
  Serial.begin(115200);
  antares.setDebug(true);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  // sets the pins as outputs:
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  pinMode (LED, OUTPUT);
  
  // configure LED PWM functionalitites
  ledcSetup(pwmChannel, freq, resolution);
  
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(enable1Pin, pwmChannel);
  
  // testing
  Serial.println("Starting control Motor...");
  Serial.println("========================================");
  digitalWrite(LED, HIGH);
}
 
void loop() {
  antares.get(projectName, deviceName);
  dutyCycle = antares.getInt("speed");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  ledcWrite(pwmChannel, dutyCycle);
  sequence += 1;
  antares.add("speed", dutyCycle);
  antares.add("sequences", sequence);
  antares.send(projectName, deviceName);
}
