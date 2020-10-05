#include <AntaresESP32HTTP.h>
#include <WiFi.h>

#define ACCESSKEY "9634da50ff7abd7a:3bdb608765b907a4"
#define projectName "FlowSensorProject"
#define deviceName "flow"

const char* ssid = "BigYellow";
const char* password = "thethepooh71";

#define LED_BUILTIN 2
#define SENSOR  27

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
int sequence = 0;

void IRAM_ATTR pulseCounter()
{
  pulseCount++;
}

AntaresESP32HTTP antares(ACCESSKEY);

void setup()
{
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

  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;

  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);
  digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{
  currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    
    pulse1Sec = pulseCount;
    pulseCount = 0;

    flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor;
    previousMillis = millis();

    flowMilliLitres = (flowRate / 60) * 1000;
    totalMilliLitres += flowMilliLitres;
  }
  antares.add("speed", int(flowRate));
  antares.add("total", int(totalMilliLitres));
  antares.add("sequences", sequence);
  antares.send(projectName, deviceName);
  sequence += 1;
}
