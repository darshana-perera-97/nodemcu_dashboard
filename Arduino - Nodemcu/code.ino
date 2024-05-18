#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Xiomi"
#define WIFI_PASSWORD "dddddddd"

// Insert Firebase project API Key
#define API_KEY "AIzaSyC_rL-wArz6fNHyHsg8uUKmyw4qpU5IG4s"

// Insert RTDB URL
#define DATABASE_URL "https://nodemcu-744b4-default-rtdb.asia-southeast1.firebasedatabase.app/"

#include "DHT.h"

#define DPIN 4      // Pin to connect DHT sensor (GPIO number) D2
#define DTYPE DHT11 // Define DHT 11 or DHT22 sensor type

DHT dht(DPIN, DTYPE);

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

void setup()
{
    Serial.begin(115200);
    dht.begin();

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    config.api_key = API_KEY;
    config.database_url = DATABASE_URL;

    if (Firebase.signUp(&config, &auth, "", ""))
    {
        Serial.println("ok");
        signupOK = true;
    }
    else
    {
        Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }

    // Assign the callback function for the long running token generation task
    config.token_status_callback = tokenStatusCallback; // See addons/TokenHelper.h

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

void loop()
{
    if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0))
    {
        sendDataPrevMillis = millis();

        float tc = dht.readTemperature(false); // Read temperature in C
        float hu = dht.readHumidity();         // Read Humidity

        if (Firebase.RTDB.setFloat(&fbdo, "sensor/temperature", tc))
        {
            Serial.println("Temperature Data Sent");
            Serial.println("PATH: " + fbdo.dataPath());
            Serial.println("TYPE: " + fbdo.dataType());
        }
        else
        {
            Serial.println("FAILED");
            Serial.println("REASON: " + fbdo.errorReason());
        }

        if (Firebase.RTDB.setFloat(&fbdo, "sensor/humidity", hu))
        {
            Serial.println("Humidity Data Sent");
            Serial.println("PATH: " + fbdo.dataPath());
            Serial.println("TYPE: " + fbdo.dataType());
        }
        else
        {
            Serial.println("FAILED");
            Serial.println("REASON: " + fbdo.errorReason());
        }

        count++;
    }
}

// ds.perera.1997@gmail.com