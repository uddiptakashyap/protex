
import { FloodAlert, RiskLevel, ForecastData, WeatherData, SensorData, MeteoblueData, MeteoblueForecast, ESP32SensorData } from "@/types";
import { API_KEYS, ESP32_CONFIG } from "@/config/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const METEOBLUE_API_URL = "https://my.meteoblue.com/packages/basic-day";

export const getFloodAlerts = async (): Promise<FloodAlert[]> => {
  try {
    // Replace with a real API call in production
    console.log("Fetching flood alerts...");
    
    // Mock data for now
    const mockAlerts: FloodAlert[] = [
      {
        id: "1",
        title: "Moderate Flood Warning",
        message: "Moderate flood risk in downtown area",
        riskLevel: "medium",
        severity: "warning",
        timestamp: new Date().toISOString(),
        isRead: false,
        location: "Downtown"
      },
      {
        id: "2",
        title: "High Flood Alert",
        message: "High flood risk in coastal regions due to storm surge",
        riskLevel: "high",
        severity: "alert",
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        isRead: true,
        location: "Coastal Region"
      },
      {
        id: "3",
        title: "Critical Evacuation Notice",
        message: "Critical flood risk in low-lying areas near the river",
        riskLevel: "critical",
        severity: "emergency",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        isRead: false,
        location: "Riverside"
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockAlerts;
  } catch (error) {
    console.error("Error fetching flood alerts:", error);
    return [];
  }
};

// Alias for getFloodAlerts for compatibility
export const getAlerts = getFloodAlerts;

export const getFloodPrediction = async (): Promise<{ riskLevel: RiskLevel; description: string }> => {
  try {
    console.log("Fetching flood prediction...");
    
    // Mock data for now
    const riskLevels: RiskLevel[] = ["low", "medium", "high", "critical"];
    const randomIndex = Math.floor(Math.random() * riskLevels.length);
    const riskLevel = riskLevels[randomIndex];
    
    let description = "";
    switch (riskLevel) {
      case "low":
        description = "No significant flood risk in your area at this time.";
        break;
      case "medium":
        description = "Moderate flood risk due to recent rainfall. Stay informed.";
        break;
      case "high":
        description = "High flood risk in your area. Consider preparation measures.";
        break;
      case "critical":
        description = "Critical flood risk! Immediate action may be required.";
        break;
    }
    
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return { riskLevel, description };
  } catch (error) {
    console.error("Error fetching flood prediction:", error);
    return { riskLevel: "low", description: "Unable to fetch prediction data." };
  }
};

export const getCurrentSensorData = async (): Promise<SensorData[]> => {
  try {
    console.log("Fetching current sensor data...");
    
    // Mock sensor data
    const mockSensorData: SensorData[] = [
      {
        id: "sensor-1",
        timestamp: new Date().toISOString(),
        waterLevel: 2.3 + Math.random(),
        rainfall: 15 + Math.random() * 5,
        temperature: 22 + Math.random() * 3,
        humidity: 65 + Math.random() * 10,
        soilMoisture: 45 + Math.random() * 15,
        predictionRisk: "low"
      },
      {
        id: "sensor-2",
        timestamp: new Date().toISOString(),
        waterLevel: 4.7 + Math.random(),
        rainfall: 25 + Math.random() * 5,
        temperature: 23 + Math.random() * 3,
        humidity: 70 + Math.random() * 10,
        soilMoisture: 60 + Math.random() * 15,
        predictionRisk: "medium"
      },
      {
        id: "sensor-3",
        timestamp: new Date().toISOString(),
        waterLevel: 7.2 + Math.random(),
        rainfall: 45 + Math.random() * 5,
        temperature: 21 + Math.random() * 3,
        humidity: 85 + Math.random() * 10,
        soilMoisture: 75 + Math.random() * 15,
        predictionRisk: "high"
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockSensorData;
  } catch (error) {
    console.error("Error fetching current sensor data:", error);
    return [];
  }
};

export const getCurrentWeather = async (): Promise<WeatherData> => {
  try {
    console.log("Fetching current weather from Meteoblue...");
    
    // Try to get data from Meteoblue first
    try {
      const meteoblueData = await getMeteoblueData();
      if (meteoblueData && meteoblueData.length > 0) {
        const current = meteoblueData[0];
        return {
          location: "Current Location",
          temperature: current.temperature,
          description: current.description,
          humidity: current.humidity,
          windSpeed: current.windspeed,
          icon: current.icon,
          rainfall: current.precipitation
        };
      }
    } catch (meteoblueError) {
      console.error("Failed to fetch from Meteoblue, using mock data:", meteoblueError);
    }
    
    // Fallback to mock data
    const mockWeatherData: WeatherData = {
      location: "San Francisco, CA",
      temperature: 18 + Math.random() * 8,
      description: "Partly Cloudy",
      humidity: 60 + Math.random() * 20,
      windSpeed: 8 + Math.random() * 7,
      icon: "clouds",
      rainfall: 5 + Math.random() * 20
    };
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockWeatherData;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getForecastData = async (): Promise<ForecastData[]> => {
  try {
    console.log("Fetching forecast data from Meteoblue...");
    
    // Try to get data from Meteoblue first
    try {
      const meteoblueData = await getMeteoblueData();
      if (meteoblueData && meteoblueData.length > 0) {
        return meteoblueData.map(item => {
          const date = new Date(item.time);
          return {
            date: date.toISOString(),
            condition: item.description,
            tempHigh: item.temperature,
            tempLow: item.temperature - Math.random() * 8,
            precipitation: item.precipitation,
            humidity: item.humidity
          };
        });
      }
    } catch (meteoblueError) {
      console.error("Failed to fetch from Meteoblue, using mock data:", meteoblueError);
    }
    
    // Mock forecast data for the next 5 days
    const mockForecastData: ForecastData[] = Array.from({ length: 5 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      return {
        date: date.toISOString(),
        condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain"][Math.floor(Math.random() * 5)],
        tempHigh: 20 + Math.floor(Math.random() * 10),
        tempLow: 12 + Math.floor(Math.random() * 8),
        precipitation: Math.floor(Math.random() * 100),
        humidity: 50 + Math.floor(Math.random() * 50)
      };
    });
    
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return mockForecastData;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return [];
  }
};

/**
 * Fetches weather data from Meteoblue API
 */
export const getMeteoblueData = async (): Promise<MeteoblueForecast[]> => {
  try {
    const apiKey = API_KEYS.METEOBLUE;
    
    // Default coordinates for New York
    const latitude = 40.730610;
    const longitude = -73.935242;
    
    const url = `${METEOBLUE_API_URL}?apikey=${apiKey}&lat=${latitude}&lon=${longitude}&asl=200&format=json`;
    
    // For testing purposes, we'll return mock data since the real API calls require proper credentials
    console.log(`Fetching Meteoblue data with key ${apiKey} (would call: ${url})`);
    
    // In a real implementation, we'd make the actual API call:
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch from Meteoblue: ${response.status}`);
    // }
    // const data = await response.json();
    
    // For now, simulate a successful response with mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create mock meteoblue-like data
    const now = new Date();
    const forecast: MeteoblueForecast[] = [];
    
    for (let i = 0; i < 7; i++) {
      const forecastDate = new Date(now);
      forecastDate.setDate(forecastDate.getDate() + i);
      
      const isRainy = Math.random() > 0.7;
      
      forecast.push({
        time: forecastDate,
        temperature: 15 + Math.random() * 15,
        precipitation: isRainy ? 5 + Math.random() * 20 : Math.random() * 5,
        humidity: 50 + Math.random() * 40,
        windspeed: 5 + Math.random() * 15,
        description: isRainy ? 
          ["Light Rain", "Showers", "Heavy Rain"][Math.floor(Math.random() * 3)] : 
          ["Sunny", "Partly Cloudy", "Cloudy"][Math.floor(Math.random() * 3)],
        icon: isRainy ? "cloud-rain" : ["sun", "cloud-sun", "cloud"][Math.floor(Math.random() * 3)]
      });
    }
    
    return forecast;
  } catch (error) {
    console.error("Error fetching from Meteoblue API:", error);
    throw error;
  }
};

export const getHistoricalSensorData = async (days: number = 30): Promise<SensorData[]> => {
  try {
    console.log(`Fetching historical sensor data for the past ${days} days...`);
    
    // Mock historical data
    const mockHistoricalData: SensorData[] = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Ensure we're creating a valid date string
      const validDate = date.toISOString();
      
      return {
        id: `sensor-hist-${i}`,
        timestamp: validDate,
        waterLevel: Math.random() * 10,
        rainfall: Math.random() * 50,
        temperature: 15 + Math.random() * 15,
        humidity: 40 + Math.random() * 60,
        soilMoisture: 30 + Math.random() * 70,
        predictionRisk: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as RiskLevel
      };
    });
    
    await new Promise(resolve => setTimeout(resolve, 900));
    
    return mockHistoricalData;
  } catch (error) {
    console.error("Error fetching historical sensor data:", error);
    return [];
  }
};

export const markAlertAsRead = async (alertId: string): Promise<boolean> => {
  try {
    // Replace with a real API call in production
    console.log(`Marking alert ${alertId} as read...`);
    
    // Mock success for now
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return true;
  } catch (error) {
    console.error(`Error marking alert ${alertId} as read:`, error);
    return false;
  }
};

export const registerForNotifications = async (email: string, preferences: any): Promise<boolean> => {
  try {
    // Replace with a real API call in production
    console.log(`Registering ${email} for notifications with preferences:`, preferences);
    
    // Mock success for now
    await new Promise(resolve => setTimeout(resolve, 750));
    
    return true;
  } catch (error) {
    console.error(`Error registering ${email} for notifications:`, error);
    return false;
  }
};

export const fetchSensorReadings = async () => {
  try {
    // Replace with a real API call in production
    console.log("Fetching sensor readings...");
    
    // Mock sensor data for now
    const mockSensorData = {
      waterLevel: Math.random() * 10,
      temperature: 25 + Math.random() * 5,
      humidity: 60 + Math.random() * 15,
      batteryLevel: 80 + Math.random() * 20
    };
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockSensorData;
  } catch (error) {
    console.error("Error fetching sensor readings:", error);
    throw error;
  }
};

export const fetchHistoricalData = async () => {
  try {
    // Replace with a real API call in production
    console.log("Fetching historical data...");
    
    // Mock historical data for now
    const mockHistoricalData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString(),
      waterLevel: Math.random() * 10,
      temperature: 20 + Math.random() * 10,
      humidity: 50 + Math.random() * 30
    }));
    
    await new Promise(resolve => setTimeout(resolve, 900));
    
    return mockHistoricalData;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};

export const fetchGeminiAiResponse = async (prompt: string) => {
  try {
    // Replace with a real API call in production
    console.log(`Sending to Gemini AI: ${prompt}`);
    
    // Mock a response for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      response: "Based on the current sensor data and weather forecasts, there is a moderate risk of flooding in the next 24 hours. Consider monitoring water levels closely and prepare for possible evacuation if levels continue to rise.",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};

export const connectToHardware = async (deviceId: string, port: string) => {
  try {
    console.log(`Connecting to hardware device ${deviceId} on port ${port}`);
    // Mock connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: "Device connected successfully" };
  } catch (error) {
    console.error("Failed to connect to hardware:", error);
    return { success: false, message: "Connection failed" };
  }
};

export const fetchWeatherForecast = async (location: string) => {
  try {
    console.log(`Fetching weather forecast for ${location}`);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    return {
      location: location,
      forecast: [
        {
          date: new Date().toISOString(),
          temperature: 22,
          precipitation: 15,
          humidity: 65,
          windSpeed: 12
        },
        {
          date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
          temperature: 24,
          precipitation: 20,
          humidity: 70,
          windSpeed: 10
        },
        {
          date: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
          temperature: 26,
          precipitation: 5,
          humidity: 55,
          windSpeed: 8
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw error;
  }
};

export const processMeteoBlueData = (data: any) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data format');
  }
  
  const validatedData = data as Record<string, any>;
  
  try {
    const forecast = [];
    
    // Safely access properties with type checks
    const timestamps = validatedData.time_stamps;
    const rainfall = validatedData.rainfall;
    const temperature = validatedData.temperature;
    
    if (Array.isArray(timestamps) && Array.isArray(rainfall) && Array.isArray(temperature)) {
      for (let i = 0; i < timestamps.length; i++) {
        forecast.push({
          time: new Date(timestamps[i] as string),
          rain: rainfall[i],
          temp: temperature[i]
        });
      }
    }
    
    return forecast;
  } catch (error) {
    console.error("Error processing MeteoBlue data:", error);
    return [];
  }
};

export const sendContactForm = async (data: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
};

// ESP32 Sensor Data API Functions
const ESP32_BASE_URL = ESP32_CONFIG.BASE_URL;

export const fetchESP32SensorData = async (): Promise<ESP32SensorData> => {
  try {
    console.log("Fetching ESP32 sensor data from:", ESP32_BASE_URL);
    
    // Try multiple possible endpoints
    const endpoints = ESP32_CONFIG.ENDPOINTS;
    let response;
    let rawData;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${ESP32_BASE_URL}${endpoint}`);
        response = await fetch(`${ESP32_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(ESP32_CONFIG.TIMEOUT)
        });

        if (response.ok) {
          rawData = await response.text();
          console.log(`✅ Success with endpoint: ${endpoint}`);
          console.log("Raw ESP32 response:", rawData);
          break;
        } else {
          console.log(`❌ Endpoint ${endpoint} failed: ${response.status}`);
        }
      } catch (endpointError) {
        console.log(`❌ Endpoint ${endpoint} error:`, endpointError.message);
        continue;
      }
    }

    if (!response || !response.ok) {
      throw new Error(`All ESP32 endpoints failed. Last status: ${response?.status || 'No response'}`);
    }

    // Parse the ESP32 response format
    const sensorData = parseESP32Response(rawData);
    
    return {
      id: `esp32-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dht11Temperature: sensorData.dht11Temperature,
      dht11Humidity: sensorData.dht11Humidity,
      bmp180Temperature: sensorData.bmp180Temperature,
      bmp180Pressure: sensorData.bmp180Pressure,
      deviceId: "ESP32-001",
      status: 'connected'
    };
  } catch (error) {
    console.error("Error fetching ESP32 sensor data:", error);
    
    // Return mock data if ESP32 is not available
    return {
      id: `esp32-mock-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dht11Temperature: 25.00,
      dht11Humidity: 63.00,
      bmp180Temperature: 25.80,
      bmp180Pressure: 1003.79,
      deviceId: "ESP32-001",
      status: 'disconnected'
    };
  }
};

export const parseESP32Response = (rawData: string): { dht11Temperature: number; dht11Humidity: number; bmp180Temperature: number; bmp180Pressure: number } => {
  try {
    // Parse the ESP32 response format
    // Expected format: HTML with sensor data or plain text
    // HTML format: <p><b>DHT11 Temperature:</b> 27.80 °C</p>
    // Plain text format: "DHT11 Temperature: 25.00 °C"
    
    const data: any = {};
    
    // Try HTML format first
    if (rawData.includes('<html>') || rawData.includes('<p>')) {
      // HTML format parsing - remove HTML tags and parse
      const cleanText = rawData.replace(/<[^>]*>/g, ' ');
      const lines = cleanText.split(/\s+/);
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === 'DHT11' && lines[i+1] === 'Temperature:') {
          data.dht11Temperature = parseFloat(lines[i+2]);
        } else if (lines[i] === 'DHT11' && lines[i+1] === 'Humidity:') {
          data.dht11Humidity = parseFloat(lines[i+2]);
        } else if (lines[i] === 'BMP180' && lines[i+1] === 'Temperature:') {
          data.bmp180Temperature = parseFloat(lines[i+2]);
        } else if (lines[i] === 'BMP180' && lines[i+1] === 'Pressure:') {
          data.bmp180Pressure = parseFloat(lines[i+2]);
        }
      }
    } else {
      // Plain text format parsing
      const lines = rawData.split('\n');
      
      lines.forEach(line => {
        if (line.includes('DHT11 Temperature:')) {
          const match = line.match(/DHT11 Temperature:\s*([\d.]+)/);
          if (match) data.dht11Temperature = parseFloat(match[1]);
        } else if (line.includes('DHT11 Humidity:')) {
          const match = line.match(/DHT11 Humidity:\s*([\d.]+)/);
          if (match) data.dht11Humidity = parseFloat(match[1]);
        } else if (line.includes('BMP180 Temperature:')) {
          const match = line.match(/BMP180 Temperature:\s*([\d.]+)/);
          if (match) data.bmp180Temperature = parseFloat(match[1]);
        } else if (line.includes('BMP180 Pressure:')) {
          const match = line.match(/BMP180 Pressure:\s*([\d.]+)/);
          if (match) data.bmp180Pressure = parseFloat(match[1]);
        }
      });
    }
    
    // Return with defaults if parsing fails
    return {
      dht11Temperature: data.dht11Temperature || 25.00,
      dht11Humidity: data.dht11Humidity || 63.00,
      bmp180Temperature: data.bmp180Temperature || 25.80,
      bmp180Pressure: data.bmp180Pressure || 1003.79
    };
  } catch (error) {
    console.error("Error parsing ESP32 response:", error);
    return {
      dht11Temperature: 25.00,
      dht11Humidity: 63.00,
      bmp180Temperature: 25.80,
      bmp180Pressure: 1003.79
    };
  }
};

export const getESP32HistoricalData = async (hours: number = 24): Promise<ESP32SensorData[]> => {
  try {
    console.log(`Fetching ESP32 historical data for the past ${hours} hours...`);
    
    // For now, generate mock historical data
    // In a real implementation, you would store this data in a database
    const historicalData: ESP32SensorData[] = [];
    const now = new Date();
    
    for (let i = 0; i < hours; i++) {
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // Every hour
      
      historicalData.push({
        id: `esp32-hist-${timestamp.getTime()}`,
        timestamp: timestamp.toISOString(),
        dht11Temperature: 25.00 + (Math.random() - 0.5) * 4,
        dht11Humidity: 63.00 + (Math.random() - 0.5) * 10,
        bmp180Temperature: 25.80 + (Math.random() - 0.5) * 4,
        bmp180Pressure: 1003.79 + (Math.random() - 0.5) * 20,
        deviceId: "ESP32-001",
        status: 'connected'
      });
    }
    
    return historicalData.reverse(); // Return in chronological order
  } catch (error) {
    console.error("Error fetching ESP32 historical data:", error);
    return [];
  }
};
