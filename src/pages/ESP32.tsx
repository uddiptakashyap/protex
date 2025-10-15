import { useEffect } from "react";
import Layout from "@/components/Layout";
import ESP32SensorReadings from "@/components/ESP32SensorReadings";
import { ESP32_CONFIG } from "@/config/constants";

const ESP32 = () => {
  useEffect(() => {
    document.title = "Warnex - ESP32 Real-time Sensors";
  }, []);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">ESP32 Real-time Sensors</h1>
            <p className="text-muted-foreground mt-2">
              Live sensor data from ESP32 device at {ESP32_CONFIG.IP_ADDRESS}
            </p>
          </div>
        </div>
        
        <ESP32SensorReadings />
      </div>
    </Layout>
  );
};

export default ESP32;
