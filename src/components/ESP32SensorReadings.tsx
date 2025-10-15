import React, { useEffect, useState, useCallback } from "react";
import { ESP32SensorData } from "@/types";
import { fetchESP32SensorData, getESP32HistoricalData } from "@/utils/api";
import { ESP32_CONFIG } from "@/config/constants";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Activity
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ESP32SensorReadingsProps {
  refreshInterval?: number; // in milliseconds
}

const ESP32SensorReadings = ({ refreshInterval = ESP32_CONFIG.REFRESH_INTERVAL }: ESP32SensorReadingsProps) => {
  const [currentData, setCurrentData] = useState<ESP32SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<ESP32SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');

  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchESP32SensorData();
      setCurrentData(data);
      setConnectionStatus(data.status);
      setLastUpdate(new Date());
      
      // Add to historical data (keep last 50 readings)
      setHistoricalData(prev => {
        const newData = [...prev, data];
        return newData.slice(-50); // Keep only last 50 readings
      });
    } catch (error) {
      console.error('Error fetching ESP32 data:', error);
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const loadHistoricalData = useCallback(async () => {
    try {
      const data = await getESP32HistoricalData(24);
      setHistoricalData(data);
    } catch (error) {
      console.error('Error loading historical data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    loadHistoricalData();
    
    // Set up real-time polling
    const interval = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, loadHistoricalData, refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Wifi className="h-4 w-4" />;
      case 'disconnected': return <WifiOff className="h-4 w-4" />;
      case 'error': return <WifiOff className="h-4 w-4" />;
      default: return <WifiOff className="h-4 w-4" />;
    }
  };

  const renderSensorCard = (
    title: string, 
    value: number, 
    unit: string, 
    Icon: React.ComponentType<{ className?: string }>, 
    colorClass: string = "bg-blue-500",
    description?: string
  ) => {
    return (
      <Card className="border-border bg-gradient-to-br from-card to-card/90">
        <CardHeader className="pb-2 border-b border-border/30">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Icon className="h-4 w-4 mr-1" /> {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold text-card-foreground">
              {value.toFixed(2)} <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          {description && (
            <div className="mt-2 text-xs text-muted-foreground">{description}</div>
          )}
        </CardContent>
      </Card>
    );
  };

  const prepareChartData = () => {
    return historicalData.map((data, index) => ({
      time: new Date(data.timestamp).toLocaleTimeString(),
      dht11Temp: data.dht11Temperature,
      bmp180Temp: data.bmp180Temperature,
      humidity: data.dht11Humidity,
      pressure: data.bmp180Pressure,
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary rounded-lg h-32"></div>
          ))}
        </div>
        <div className="bg-secondary rounded-lg h-64 animate-pulse"></div>
      </div>
    );
  }

  if (!currentData) {
    return <div className="text-card-foreground">Error loading ESP32 sensor data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Connection Status and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={`${getStatusColor(connectionStatus)} text-white`}>
            {getStatusIcon(connectionStatus)}
            <span className="ml-1 capitalize">{connectionStatus}</span>
          </Badge>
          {lastUpdate && (
            <>
              <span className="text-sm text-muted-foreground">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
              <span className="text-sm text-muted-foreground">
                IP: {ESP32_CONFIG.IP_ADDRESS}
              </span>
            </>
          )}
        </div>
        <Button 
          onClick={fetchData} 
          disabled={isRefreshing}
          size="sm"
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Current Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderSensorCard(
            "DHT11 Temperature", 
            currentData.dht11Temperature, 
            "°C", 
            Thermometer, 
            "bg-orange-500",
            "Digital temperature sensor"
          )}
          {renderSensorCard(
            "DHT11 Humidity", 
            currentData.dht11Humidity, 
            "%", 
            Droplets, 
            "bg-blue-500",
            "Digital humidity sensor"
          )}
          {renderSensorCard(
            "BMP180 Temperature", 
            currentData.bmp180Temperature, 
            "°C", 
            Thermometer, 
            "bg-red-500",
            "Barometric temperature sensor"
          )}
          {renderSensorCard(
            "BMP180 Pressure", 
            currentData.bmp180Pressure, 
            "hPa", 
            Gauge, 
            "bg-purple-500",
            "Barometric pressure sensor"
          )}
        </div>

      {/* Real-time Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Real-time Sensor Data Trends
          </CardTitle>
          <CardDescription>
            Live sensor readings from ESP32 device ({ESP32_CONFIG.IP_ADDRESS})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => `Time: ${value}`}
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)}${name.includes('Temp') ? '°C' : name.includes('Humidity') ? '%' : 'hPa'}`,
                    name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="dht11Temp" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={false}
                  name="DHT11 Temperature"
                />
                <Line 
                  type="monotone" 
                  dataKey="bmp180Temp" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={false}
                  name="BMP180 Temperature"
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  name="Humidity"
                />
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={false}
                  name="Pressure"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Device Information */}
      <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Device ID:</span> {currentData.deviceId}
              </div>
              <div>
                <span className="font-medium">IP Address:</span> {ESP32_CONFIG.IP_ADDRESS}
              </div>
              <div>
                <span className="font-medium">Last Reading:</span> {new Date(currentData.timestamp).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Data Points:</span> {historicalData.length}
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default ESP32SensorReadings;
