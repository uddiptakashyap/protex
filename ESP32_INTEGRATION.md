# ESP32 Real-time Sensor Integration

This document explains how the ESP32 sensor integration works in the Protex application.

## Overview

The application now supports real-time sensor data from ESP32 devices. The ESP32 device at IP address `10.127.132.7` provides the following sensor readings:

- **DHT11 Temperature**: Digital temperature sensor readings in °C
- **DHT11 Humidity**: Digital humidity sensor readings in %
- **BMP180 Temperature**: Barometric temperature sensor readings in °C
- **BMP180 Pressure**: Barometric pressure sensor readings in hPa

## Features

### Real-time Data Fetching
- Automatic polling every 5 seconds for live updates
- Connection status monitoring (connected/disconnected/error)
- Fallback to mock data when ESP32 is unavailable
- Manual refresh button for immediate updates

### Data Visualization
- Real-time line charts showing sensor trends
- Individual sensor cards with current readings
- Historical data display (last 24 hours)
- Connection status indicators

### ESP32 Response Format
The ESP32 device should respond with data in the following format:
```
ESP32 Sensor Readings
DHT11 Temperature: 25.00 °C
DHT11 Humidity: 63.00 %
BMP180 Temperature: 25.80 °C
BMP180 Pressure: 1003.79 hPa
```

## Usage

### Accessing ESP32 Data
1. Navigate to the main dashboard - ESP32 data is integrated into the sensor readings
2. Go to `/esp32` for a dedicated ESP32 sensor page with detailed charts
3. Use the navigation menu to access "ESP32 Sensors"

### API Endpoints
- `GET http://10.127.132.7/sensors` - Fetches current sensor data from ESP32
- The application automatically handles parsing and error handling

### Configuration
- ESP32 IP address: `10.127.132.7` (configurable in `src/config/constants.ts`)
- Refresh interval: 5 seconds (configurable in `ESP32_CONFIG.REFRESH_INTERVAL`)
- Timeout: 5 seconds for API requests (configurable in `ESP32_CONFIG.TIMEOUT`)

**To change ESP32 IP address:** Edit `src/config/constants.ts` and update the `ESP32_CONFIG.IP_ADDRESS` value.

## Technical Implementation

### Files Modified/Created
- `src/types.ts` - Added ESP32SensorData interface
- `src/utils/api.ts` - Added ESP32 API functions
- `src/components/ESP32SensorReadings.tsx` - New dedicated ESP32 component
- `src/components/SensorReadings.tsx` - Updated to include ESP32 data
- `src/pages/ESP32.tsx` - New ESP32 page
- `src/App.tsx` - Added ESP32 route
- `src/components/Navbar.tsx` - Added ESP32 navigation link

### Key Functions
- `fetchESP32SensorData()` - Fetches data from ESP32 device
- `parseESP32Response()` - Parses ESP32 response format
- `getESP32HistoricalData()` - Generates historical data for charts

## Error Handling

The application includes robust error handling:
- Network timeouts (5 seconds)
- Connection failures
- Invalid response formats
- Fallback to mock data when ESP32 is unavailable

## Testing

To test the integration:
1. Ensure ESP32 device is running and accessible at `10.127.132.7`
2. Start the Protex application
3. Navigate to the ESP32 sensors page
4. Verify real-time data updates every 5 seconds
5. Check connection status indicators

## Troubleshooting

### Common Issues
1. **Connection Failed**: Check ESP32 IP address and network connectivity
2. **No Data Updates**: Verify ESP32 is running and responding to HTTP requests
3. **Parse Errors**: Ensure ESP32 response format matches expected format

### Debug Information
- Check browser console for detailed error messages
- Network tab shows HTTP requests to ESP32 device
- Connection status badge shows current device state
