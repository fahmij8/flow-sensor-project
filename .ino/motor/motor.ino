#include <AntaresESP32HTTP.h>

#define ACCESSKEY "9634da50ff7abd7a:3bdb608765b907a4"       // Ganti dengan access key akun Antares anda
#define WIFISSID "Redmi"         // Ganti dengan SSID WiFi anda
#define PASSWORD "123456789"     // Ganti dengan password WiFi anda

#define projectName "FlowSensorProject"   // Ganti dengan application name Antares yang telah dibuat
#define deviceName "motor"     // Ganti dengan device Antares yang telah dibuat

AntaresESP32HTTP antares(ACCESSKEY);

// Motor A
int motor1Pin1 = 27; 
int motor1Pin2 = 26; 
int enable1Pin = 14; 
 
// Setting PWM properties
const int freq = 30000;
const int pwmChannel = 0;
const int resolution = 8;
int dutyCycle = 200;

void setup() {
  Serial.begin(115200);
  antares.setDebug(true);
  antares.wifiConnection(WIFISSID,PASSWORD);
  
  // sets the pins as outputs:
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  
  // configure LED PWM functionalitites
  ledcSetup(pwmChannel, freq, resolution);
  
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(enable1Pin, pwmChannel);
  
  // testing
  Serial.print("Starting control Motor...");
  Serial.println("========================================");
}
 
void loop() {
  antares.get(projectName, deviceName);
  dutyCycle = antares.getInt("speed");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  ledcWrite(pwmChannel, dutyCycle);
}
