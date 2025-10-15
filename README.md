# WARNEX - Cloudburst Early Warning and Alarm System

![WARNEX Logo](https://img.shields.io/badge/WARNEX-Early%20Warning%20System-blue)
![Smart India Hackathon](https://img.shields.io/badge/SIH-2025-green)
![Theme](https://img.shields.io/badge/Theme-Disaster%20Management-orange)

## 🎯 Smart India Hackathon 2025 Submission

- **Problem Statement ID**: SIH25227
- **Problem Statement Title**: Cloudburst Early Warning and Alarm System
- **Theme**: Disaster Management
- **PS Category**: Hardware
- **Team ID**: 64878
- **Team Name**: The_Alchemists_014

## 🌟 Introduction

Cloudbursts in hilly regions trigger sudden flash floods, risking lives and property. WARNEX is a real-time Cloudburst & related Disaster Early Warning System that links citizens, authorities, and rescue teams. It monitors local weather, detects anomalies, and sends instant siren alerts, using AI to predict cloudbursts for timely evacuation.

**Motto**: { Predict | Prepare | Prevent }

## 🚀 How WARNEX Addresses the Problem

- **IoT Sensors**: Track rainfall, temperature, humidity, and other environmental factors
- **AI Alerts**: Predict and warn in multiple languages
- **Safe Routes**: Guide citizens to shelters and aid centers
- **Rescue Link**: Connect rescue teams efficiently
- **Citizen Reports**: Share verified updates from the ground
- **Cloudburst Prediction**: Analyze data to forecast floods early

## 🏗️ System Architecture

### Data Collection Layer
- User reports and IoT sensors
- Official alerts and satellite data
- Weather data for early flood detection

### Verification Layer
- Crowd confirmation and moderator review
- Trust-based scoring ensures reliability
- Multi-user confirmation system

### Mapping & Routing Layer
- Safe route generation avoiding flooded zones
- Dynamic dashboard for rescue teams & shelters
- Offline support for low-connectivity areas

### Relief Coordination Layer
- Connects victims to shelters & rescue teams
- Real-time coordination dashboard
- Resource allocation and tracking

## ✨ Key Features

- 🌧️ **Cloudburst, flood, landslide alerts & predictions**
- 🗺️ **Safe routes & AI assistance**
- ✅ **Trackable verified reports**
- 🏠 **Nearby shelters & rescue via live maps**
- 📱 **Offline access & runs on low connectivity**
- 👥 **Community reporting & secured charity funds**
- 🌍 **Localized notifications with multilingual support**

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Next.js** - Full-stack React framework
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN** - High-quality UI components

### Backend
- **Node.js** - JavaScript runtime
- **Django** - Python web framework
- **Flask** - Lightweight Python framework
- **Supabase** - Backend-as-a-Service

### AI & ML
- **Python** - Primary ML language
- **Sci-Kit Learn** - Machine learning library
- **TensorFlow** - Deep learning framework
- **Qwen** - AI model integration
- **Google Gemini API** - Advanced AI capabilities

### Hardware & IoT
- **Arduino** - Microcontroller platform
- **ESP32** - IoT sensor integration

## 📊 Competitive Advantage

| Feature | Local Govt Apps | Weather Apps | NGO Platforms | Social Media Groups | Global Disaster Apps | **WARNEX** |
|---------|----------------|--------------|---------------|-------------------|-------------------|------------|
| Real-time + predictive alerts | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safe routes + verified reports | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Unified platform + crowd verification | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Moderator-reviewed, trusted info | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Localized + offline-ready + multi-layer system | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

## 🎯 USP (Unique Selling Proposition)

- **Hybrid Data Model**: Combines multiple data sources for accuracy
- **Open & Scalable Design**: Easy to integrate and expand
- **Community Empowerment**: Citizen-driven reporting and verification
- **Predictive Analytics**: AI-powered early warning system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python (v3.8 or higher)
- Arduino IDE (for hardware components)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/uddiptakashyap/protex.git
   cd protex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Local: http://localhost:8080
   - Network: http://172.20.10.6:8080

### Hardware Setup

1. Follow the [ESP32 Integration Guide](ESP32_INTEGRATION.md)
2. Configure sensors as per [ESP32 Configuration](ESP32_CONFIG.md)

## 📈 Deployment Plan

### Phase 1: Data Layer Setup
- Integrate official alerts, IoT sensors, and satellite/weather data

### Phase 2: MVP Build
- Map display, reporting system, shelter directory, basic verification

### Phase 3: Verification Module
- Crowd validation + moderator dashboard

### Phase 4: Routing & Coordination
- Safe route generation & rescue assignment with charity module

### Phase 5: Offline & Low-Data Support
- PWA caching, SMS fallback & prototype testing

### Phase 6: Iteration & Scale
- Refine based on feedback, add advanced features like predictive alerts, drones & IoT integration

## 🛡️ Threat Assessment & Countermeasures

| Threat | Countermeasure |
|--------|---------------|
| **False Reports** | Multi-user confirmation, Moderator approval, Trust-based scoring |
| **Poor Connectivity** | Offline mode support, SMS fallback for alerts |
| **System Overload** | Cloud auto-scaling, handles peak traffic |
| **Weak Coordination** | Verified authority accounts, Volunteer account integration |
| **Delayed Alerts** | Predictive analytics, Early flood warnings |

## 💰 Market Analysis & Revenue Streams

| Revenue Stream | Market Opportunity | Market Size |
|---------------|-------------------|-------------|
| Government Contracts / Grants | Disaster management & early warning systems | $200M+ in India |
| API Licensing / Data Access | Integrate flood/disaster alerts into third-party apps | $50M+ potential |
| SaaS for NGOs & Relief Agencies | Real-time rescue coordination & reporting tools | $30M+ annually |
| Corporate CSR Partnerships | Fund community awareness & citizen engagement programs | $10M+ from CSR |
| Sponsorship / Ads in Free Version | Promote safety products, local services, awareness | $5–10M+ |

## 🌍 Impact & Benefits

### Social Impact
- Saves lives and improves public awareness
- Fosters community participation in disaster management

### Economic Impact
- Reduces loss of property and infrastructure
- Optimizes resource allocation during emergencies

### Environmental Impact
- Encourages data-driven flood management
- Supports climate resilience initiatives

### Technological Impact
- Promotes innovation through IoT, AI, and open data integration

## 🔬 Research & References

### Research Papers
1. K. Chen et al., "AI-Powered Flood Mapathon," in 2024 IEEE International Geoscience and Remote Sensing Symposium (IGARSS), Athens, Greece, 2024, pp. 3841–3844, doi: 10.1109/IGARSS53475.2024.10641743.

2. I. Ahmed, M. Ahmad, G. Jeon, and A. Chehri, "An Internet of Things and AI-Powered Framework for Long-Term Flood Risk Evaluation," IEEE Internet of Things Journal, vol. 11, no. 3, pp. 3812–3819, 1 Feb. 2024, doi: 10.1109/JIOT.2023.3308564.

3. J. Bhanye, "Flood-tech frontiers: smart but just? A systematic review of AI-driven urban flood adaptation and associated governance challenges," Discover Global Social, vol. 3, p. 59, 2025, doi: 10.1007/s44282-025-00190-9.

### Technical References
- [ESP32 & IoT Sensor Datasheets](https://www.winsen-sensor.com/) [Accessed On: 18.09.2025]
- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs) [Accessed On: 20.09.2025]

## 🎯 Future Vision

To build resilient communities through AI-driven early warnings, IoT monitoring, and predictive analytics. The platform will enable proactive evacuation, efficient resource allocation, and coordinated response to cloudbursts and floods, aiming to reduce loss of life and property while integrating citizen reporting and climate-adaptive planning.

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is developed for Smart India Hackathon 2025. Please refer to the license file for more details.

## 👥 Team

**The_Alchemists_014**
- A dedicated team working towards disaster management and community safety

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please contact our team through the repository issues section.

---

**WARNEX** - Empowering communities through intelligent disaster management and early warning systems.

*Built with ❤️ for Smart India Hackathon 2025*