// Import Library
#include <AntaresESP32HTTP.h>
#include <WiFi.h>

// Define variable for WiFi Setup
#define ACCESSKEY "9634da50ff7abd7a:3bdb608765b907a4"
#define projectName "FlowSensorProject" 
#define deviceName "motor"

const char* ssid = "";
const char* password = "";

// Define variable for DC Motor Setup
int motor1Pin1 = 27; 
int motor1Pin2 = 26; 
int enable1Pin = 14; 
 
const int freq = 30000;
const int pwmChannel = 0;
const int resolution = 8;
int dutyCycle = 200;

AntaresESP32HTTP antares(ACCESSKEY);

void setup() {
  // Wifi Setup
  Serial.begin(115200);
  antares.setDebug(true);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("========================================");
  
  // DC Motor Setup
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  
  ledcSetup(pwmChannel, freq, resolution);
  ledcAttachPin(enable1Pin, pwmChannel);
  Serial.println("Starting control Motor...");
  Serial.println("========================================");
}
 
void loop() {
  antares.get(projectName, deviceName);
  dutyCycle = antares.getInt("speed");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  ledcWrite(pwmChannel, dutyCycle);
}
