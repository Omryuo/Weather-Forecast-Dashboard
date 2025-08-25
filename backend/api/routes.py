# api/routes.py
import requests
import json
from flask import Blueprint, jsonify
import os

# Create a Blueprint for our API routes
api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/weather/<city>', methods=['GET'])
def get_weather(city):
    """
    Fetches current weather and an AI-generated forecast for a given city.
    
    This route acts as a proxy, fetching data from external APIs and
    combining it before sending it to the frontend.
    """
    # Get the API key from environment variables
    OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    if not OPENWEATHER_API_KEY or OPENWEATHER_API_KEY == 'YOUR_OPENWEATHERMAP_API_KEY':
        return jsonify({"error": "OpenWeatherMap API key not configured. Please set the OPENWEATHER_API_KEY environment variable."}), 500
    
    if not GEMINI_API_KEY:
        return jsonify({"error": "Gemini API key not configured. Please set the GEMINI_API_KEY environment variable."}), 500

    # OpenWeatherMap API call to get current weather
    openweather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    try:
        weather_response = requests.get(openweather_url)
        weather_response.raise_for_status()
        weather_data = weather_response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to get weather data for {city}. {str(e)}"}), 500

    # Gemini API call to get a structured forecast
    gemini_prompt = f"Given the current weather in {weather_data['name']} with a temperature of {weather_data['main']['temp']}°C and a humidity of {weather_data['main']['humidity']}%, provide a realistic 7-day temperature forecast in JSON format with an array of objects. Each object should have a 'day' (string) and a 'temp' (number)."

    gemini_payload = {
        "contents": [
            {
                "parts": [
                    {"text": gemini_prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "day": { "type": "STRING" },
                        "temp": { "type": "NUMBER" }
                    }
                }
            }
        }
    }
    
    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={GEMINI_API_KEY}"

    try:
        gemini_response = requests.post(gemini_url, json=gemini_payload)
        gemini_response.raise_for_status()
        gemini_data = gemini_response.json()
        
        forecast_text = gemini_data['candidates'][0]['content']['parts'][0]['text']
        forecast_json = json.loads(forecast_text)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to generate forecast. {str(e)}"}), 500
    except (KeyError, json.JSONDecodeError):
        return jsonify({"error": "Invalid response from Gemini API."}), 500

    # Combine data into a single response
    combined_data = {
        "weather": {
            "location": weather_data['name'],
            "temperature": weather_data['main']['temp'],
            "humidity": weather_data['main']['humidity'],
            "pressure": weather_data['main']['pressure'],
            "wind_speed": weather_data['wind']['speed'],
            "description": weather_data['weather'][0]['description'],
        },
        "forecast": forecast_json
    }

    return jsonify(combined_data)