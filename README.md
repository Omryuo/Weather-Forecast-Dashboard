# 🌤️ Weather Forecast Dashboard

[![Made with React](https://img.shields.io/badge/Frontend-React.js-61DBFB?logo=react&logoColor=white)](https://react.dev/)   [![Made with Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)   [![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

A **Full-stack**, responsive web application that provides **real-time weather data** and an **AI-powered 7-day forecast**.

---

## 🚀 Live Demo
👉 [Weather Forecast Dashboard](https://weather-forecast-dashboard-1.onrender.com/)  

---

## 📖 Project Overview
This dashboard combines a modern **React frontend** with a **Python Flask backend**.  
The backend acts as an **API proxy**, fetching live weather data and generating forecasts using an **AI model**.  

✨ The UI is designed to be clean and intuitive, featuring a dark/light mode toggle and a visually appealing chart for temperature predictions. 

---

## ✨ Features
✅ Real-time Weather Data: Get current weather conditions for any city.  
✅ AI-Powered Forecast: 7-day forecast powered by a large language model.  
✅ Responsive UI: Works seamlessly on desktop and mobile.  
✅ Dark/Light Mode: Toggle themes with one click.  
✅ Dockerized: Consistent deployment across environments.  

---

## 🛠️ Technology Stack

### 🔹 Frontend
- [React.js](https://react.dev/) – UI library  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework  
- [Recharts](https://recharts.org/) – Data visualization  
- [Lucide React](https://lucide.dev/) – Icon set  

### 🔹 Backend
- [Python 3.8+](https://www.python.org/)  
- [Flask](https://flask.palletsprojects.com/) – API framework  
- [Gunicorn](https://gunicorn.org/) – WSGI server  
- [Requests](https://docs.python-requests.org/) – HTTP client  
- [python-dotenv](https://pypi.org/project/python-dotenv/) – Env variables  

### 🔹 APIs
- [OpenWeatherMap API](https://openweathermap.org/api) – Real-time weather data  
- [Google Gemini API](https://ai.google/) – AI-powered forecasting  

---

## 🚀 Deployment
- **Docker & Docker Compose** → Containerized setup  
- **Render** → Hosting for frontend + backend  

---

## ⚡ Getting Started

### 📌 Prerequisites
- Install **Docker** and **Docker Compose**

### 📌 Environment Variables
Copy `.env.example` → `.env` and add your API keys:

```env
OPENWEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### ▶️ Running Locally
```
# Clone the repo
git clone https://github.com/Omryuo/Weather-Forecast-Dashboard.git
cd weather-forecast-dashboard

# Build and run containers
docker-compose up --build
```

👉 Open in your browser: http://localhost:3000

---

## 🖼️ Project Structure
```
weather-forecast-dashboard/
│── frontend/         # React + Tailwind UI
│── backend/          # Flask API
│── docker-compose.yml
│── .env.example
│── README.md
```
---
## 📜 License

This project is licensed under the MIT License.

---
# Thank you!!!

**Suggestion and Contributions are always welcome!** <br> Please fork the repository and create a pull request with your changes.
