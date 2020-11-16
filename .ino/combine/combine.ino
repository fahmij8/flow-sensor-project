#include <AntaresESP32HTTP.h>
#include <WiFi.h>

#define ACCESSKEY ""
#define projectName "FlowSensorProject"
#define deviceName "motor"

const char* ssid = "";
const char* password = "";

AntaresESP32HTTP antares(ACCESSKEY);

// Flow sensor
#define LED_BUILTIN 2
#define SENSOR  28

long currentMillis = 0;
long previousMillis = 0;
int interval = 1000;
boolean ledState = LOW;
float calibrationFactor = 4.5;
volatile byte pulseCount;
byte pulse1Sec = 0;
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;

void IRAM_ATTR pulseCounter(){
  pulseCount++;
}

// Motor DC
int motor1Pin1 = 27; 
int motor1Pin2 = 26; 
int enable1Pin = 14;
int sequence = 0;
 
const int freq = 30000;
const int pwmChannel = 0;
const int resolution = 8;
int dutyCycle = 255;


void setup(){
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

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(SENSOR, INPUT_PULLUP);
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  
  // Motor DC Properties
  ledcSetup(pwmChannel, freq, resolution);
  ledcAttachPin(enable1Pin, pwmChannel);
   
  // Flow Properties 
  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;

  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);
  digitalWrite(LED_BUILTIN, HIGH);
}

void loop(){
  // Motor DC
  antares.get(projectName, deviceName);
  dutyCycle = antares.getInt("speed");
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  ledcWrite(pwmChannel, dutyCycle);

  // Flow sensor
  currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    
    pulse1Sec = pulseCount;
    pulseCount = 0;

    flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor;
    previousMillis = millis();

    flowMilliLitres = (flowRate / 60) * 1000;
    totalMilliLitres += flowMilliLitres;
  }
  Serial.println("Flow rate = ");
  Serial.println(int(flowRate));
}
