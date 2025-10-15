# ESP32 Configuration Guide

## 📍 Where to Change ESP32 IP Address

To change the ESP32 IP address, edit the following file:

**File:** `src/config/constants.ts`

**Location:** Lines 33-39

```typescript
// ESP32 Device Configuration
export const ESP32_CONFIG = {
  IP_ADDRESS: "10.127.132.7",        // ← Change this IP address
  BASE_URL: "http://10.127.132.7",   // ← This will auto-update
  REFRESH_INTERVAL: 5000,            // ← Data refresh rate (milliseconds)
  TIMEOUT: 5000,                     // ← Request timeout (milliseconds)
  ENDPOINTS: ['/', '/sensors', '/data', '/api/sensors', '/api/data']
};
```

## 🔧 Configuration Options

### IP_ADDRESS
- **Current:** `10.127.132.7`
- **Change to:** Your ESP32's actual IP address
- **Example:** `192.168.1.100`

### REFRESH_INTERVAL
- **Current:** `5000` (5 seconds)
- **Options:** 
  - `1000` = 1 second (very fast)
  - `5000` = 5 seconds (recommended)
  - `10000` = 10 seconds (slower)

### TIMEOUT
- **Current:** `5000` (5 seconds)
- **Purpose:** How long to wait for ESP32 response
- **Recommendation:** Keep at 5000ms unless you have network issues

### ENDPOINTS
- **Purpose:** List of endpoints to try when connecting to ESP32
- **Default:** `['/', '/sensors', '/data', '/api/sensors', '/api/data']`
- **Note:** Usually don't need to change this

## 🚀 Quick Setup Steps

1. **Find your ESP32 IP address:**
   - Check your router's admin panel
   - Use `ping` command: `ping 10.127.132.7`
   - Check ESP32 serial monitor

2. **Edit the configuration:**
   ```bash
   # Open the file in your editor
   code src/config/constants.ts
   ```

3. **Update the IP address:**
   ```typescript
   IP_ADDRESS: "YOUR_ESP32_IP_HERE",
   BASE_URL: "http://YOUR_ESP32_IP_HERE",
   ```

4. **Save and restart the application:**
   ```bash
   npm run dev
   ```

## 🔍 Testing Connection

After changing the IP address, you can test the connection:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Navigate to the ESP32 page
4. Look for connection logs

## 📱 Alternative: Environment Variables

For advanced users, you can also use environment variables:

1. Create `.env` file in project root:
   ```
   VITE_ESP32_IP=10.127.132.7
   ```

2. Update `constants.ts`:
   ```typescript
   IP_ADDRESS: import.meta.env.VITE_ESP32_IP || "10.127.132.7",
   BASE_URL: `http://${import.meta.env.VITE_ESP32_IP || "10.127.132.7"}`,
   ```

## 🆘 Troubleshooting

### Connection Issues
- Verify ESP32 is on the same network
- Check firewall settings
- Ensure ESP32 web server is running
- Try different endpoints in the ENDPOINTS array

### IP Address Changes
- ESP32 IP might change if using DHCP
- Consider setting static IP on ESP32
- Update configuration whenever IP changes

### Performance Issues
- Increase REFRESH_INTERVAL for slower updates
- Increase TIMEOUT if network is slow
- Check ESP32 response time

