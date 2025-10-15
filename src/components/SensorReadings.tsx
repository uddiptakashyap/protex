
import { useEffect, useState } from "react";
import { SensorData, ESP32SensorData } from "@/types";
import { getCurrentSensorData, fetchESP32SensorData } from "@/utils/api";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Cloud, Waves, Sprout, Wifi, WifiOff } from "lucide-react";
import { SENSORS_MOCK_DATA } from "@/config/constants";

const SensorReadings = () => {
  const [data, setData] = useState<SensorData | null>(null);
  const [esp32Data, setEsp32Data] = useState<ESP32SensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch both regular sensor data and ESP32 data
        const [sensorData, esp32SensorData] = await Promise.all([
          getCurrentSensorData(),
          fetchESP32SensorData()
        ]);
        
        setData(sensorData);
        setEsp32Data(esp32SensorData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  const getSensorPercentage = (value: number, min: number, max: number) => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  };
  
  const renderSensorCard = (
    title: string, 
    value: number, 
    unit: string, 
    Icon: any, 
    min: number, 
    max: number,
    colorClass: string = "bg-blue-500"
  ) => {
    const percentage = getSensorPercentage(value, min, max);
    
    return (
      <Card className="border-border bg-gradient-to-br from-card to-card/90">
        <CardHeader className="pb-2 border-b border-border/30">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Icon className="h-4 w-4 mr-1" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold text-card-foreground">{value} <span className="text-sm text-muted-foreground">{unit}</span></div>
          </div>
          <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full ${colorClass} rounded-full`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-secondary rounded-lg h-32"></div>
        ))}
      </div>
    );
  }
  
  if (!data) {
    return <div className="text-card-foreground">Error loading sensor data</div>;
  }
  
  return (
    <div className="space-y-6">
      {/* ESP32 Connection Status */}
      {esp32Data && (
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="outline" className={`${esp32Data.status === 'connected' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {esp32Data.status === 'connected' ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
            ESP32 Device (10.127.132.7)
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last update: {new Date(esp32Data.timestamp).toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* ESP32 Real-time Sensor Data */}
      {esp32Data && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">ESP32 Real-time Sensor Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderSensorCard(
              "DHT11 Temperature", 
              esp32Data.dht11Temperature, 
              "°C", 
              Thermometer, 
              0, 
              50,
              "bg-orange-500"
            )}
            {renderSensorCard(
              "DHT11 Humidity", 
              esp32Data.dht11Humidity, 
              "%", 
              Droplets, 
              0, 
              100,
              "bg-blue-500"
            )}
            {renderSensorCard(
              "BMP180 Temperature", 
              esp32Data.bmp180Temperature, 
              "°C", 
              Thermometer, 
              0, 
              50,
              "bg-red-500"
            )}
            {renderSensorCard(
              "BMP180 Pressure", 
              esp32Data.bmp180Pressure, 
              "hPa", 
              Cloud, 
              900, 
              1100,
              "bg-purple-500"
            )}
          </div>
        </div>
      )}

      {/* Regular Sensor Data */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Environmental Sensor Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderSensorCard(
            "Water Level", 
            data.waterLevel, 
            SENSORS_MOCK_DATA.waterLevel.unit, 
            Waves, 
            SENSORS_MOCK_DATA.waterLevel.min, 
            SENSORS_MOCK_DATA.waterLevel.max,
            "bg-blue-500"
          )}
          {renderSensorCard(
            "Rainfall", 
            data.rainfall, 
            SENSORS_MOCK_DATA.rainfall.unit, 
            Cloud, 
            SENSORS_MOCK_DATA.rainfall.min, 
            SENSORS_MOCK_DATA.rainfall.max,
            "bg-indigo-500"
          )}
          {renderSensorCard(
            "Temperature", 
            data.temperature, 
            SENSORS_MOCK_DATA.temperature.unit, 
            Thermometer, 
            SENSORS_MOCK_DATA.temperature.min, 
            SENSORS_MOCK_DATA.temperature.max,
            "bg-orange-500"
          )}
          {renderSensorCard(
            "Humidity", 
            data.humidity, 
            SENSORS_MOCK_DATA.humidity.unit, 
            Droplets, 
            SENSORS_MOCK_DATA.humidity.min, 
            SENSORS_MOCK_DATA.humidity.max,
            "bg-teal-500"
          )}
          {renderSensorCard(
            "Soil Moisture", 
            data.soilMoisture, 
            SENSORS_MOCK_DATA.soilMoisture.unit, 
            Sprout, 
            SENSORS_MOCK_DATA.soilMoisture.min, 
            SENSORS_MOCK_DATA.soilMoisture.max,
            "bg-green-500"
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorReadings;
